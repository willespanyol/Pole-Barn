import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean)

const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

export const supabase = hasSupabase
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null

const ENTITY_TABLE = 'app_records'
const STORAGE_BUCKET = 'project-files'

const localKey = (entityName) => `polebarndo_${entityName}`

const nowIso = () => new Date().toISOString()

const getNestedValue = (record, key) => {
  if (!record) return undefined
  if (key === 'created_date') return record.created_date || record.created_at
  if (key === 'updated_date') return record.updated_date || record.updated_at
  return record[key]
}

const normalizeRecord = (record) => {
  if (!record) return record
  const data = record.data || {}
  return {
    id: record.id,
    created_by: record.created_by,
    created_date: record.created_date || record.created_at,
    updated_date: record.updated_date || record.updated_at,
    ...data,
  }
}

const sortRecords = (records, orderBy = '-created_date') => {
  if (!orderBy) return records
  const desc = orderBy.startsWith('-')
  const key = desc ? orderBy.slice(1) : orderBy
  return [...records].sort((a, b) => {
    const av = getNestedValue(a, key)
    const bv = getNestedValue(b, key)
    if (av === bv) return 0
    if (av === undefined || av === null) return desc ? 1 : -1
    if (bv === undefined || bv === null) return desc ? -1 : 1
    return desc ? String(bv).localeCompare(String(av)) : String(av).localeCompare(String(bv))
  })
}

const matchesCriteria = (record, criteria = {}) => {
  return Object.entries(criteria).every(([key, value]) => record[key] === value)
}

const readLocal = (entityName) => {
  try {
    return JSON.parse(localStorage.getItem(localKey(entityName)) || '[]')
  } catch {
    return []
  }
}

const writeLocal = (entityName, rows) => {
  localStorage.setItem(localKey(entityName), JSON.stringify(rows))
}

async function getCurrentUserEmail() {
  if (!supabase) {
    const raw = localStorage.getItem('polebarndo_user')
    if (!raw) return null
    try {
      return JSON.parse(raw)?.email || null
    } catch {
      return null
    }
  }

  const { data } = await supabase.auth.getUser()
  return data?.user?.email || null
}

function createEntityClient(entityName) {
  return {
    async list(orderBy = '-created_date', limit) {
      if (!supabase) {
        const rows = sortRecords(readLocal(entityName), orderBy)
        return typeof limit === 'number' ? rows.slice(0, limit) : rows
      }

      let query = supabase
        .from(ENTITY_TABLE)
        .select('*')
        .eq('entity', entityName)

      const { data, error } = await query
      if (error) throw error

      const rows = sortRecords((data || []).map(normalizeRecord), orderBy)
      return typeof limit === 'number' ? rows.slice(0, limit) : rows
    },

    async filter(criteria = {}, orderBy = '-created_date') {
      const rows = await this.list(orderBy)
      return rows.filter((row) => matchesCriteria(row, criteria))
    },

    async create(payload = {}) {
      const timestamp = nowIso()
      const id = crypto.randomUUID()
      const created_by = payload.email || payload.clientEmail || payload.created_by || (await getCurrentUserEmail()) || null

      // Generate a client-side ID and do not SELECT the inserted row. Public
      // contact/order INSERT policies do not grant anonymous users SELECT access.
      const created = {
        id,
        ...payload,
        created_by,
        created_date: timestamp,
        updated_date: timestamp,
      }

      if (!supabase) {
        // Demo mode only: does NOT save to the production website.
        const rows = readLocal(entityName)
        rows.unshift(created)
        writeLocal(entityName, rows)
        window.dispatchEvent(new CustomEvent(`record:${entityName}`, { detail: { type: 'INSERT', data: created } }))
        return created
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 20000)
      try {
        const { error } = await supabase
          .from(ENTITY_TABLE)
          .insert({ id, entity: entityName, data: payload, created_by })
          .abortSignal(controller.signal)

        if (error) throw error
        return created
      } catch (error) {
        if (controller.signal.aborted) {
          throw new Error('Submission timed out; we could not confirm whether the database received it. Please contact our team before submitting again.')
        }
        throw error
      } finally {
        clearTimeout(timeoutId)
      }
    },

    async update(id, patch = {}) {
      if (!id) throw new Error(`Missing ${entityName} id for update.`)

      if (!supabase) {
        const rows = readLocal(entityName)
        const index = rows.findIndex((row) => row.id === id)
        if (index === -1) throw new Error(`${entityName} not found.`)
        const updated = { ...rows[index], ...patch, updated_date: nowIso() }
        rows[index] = updated
        writeLocal(entityName, rows)
        window.dispatchEvent(new CustomEvent(`record:${entityName}`, { detail: { type: 'UPDATE', data: updated } }))
        return updated
      }

      const { data: existing, error: readError } = await supabase
        .from(ENTITY_TABLE)
        .select('*')
        .eq('id', id)
        .single()

      if (readError) throw readError

      const nextData = { ...(existing.data || {}), ...patch }
      const { data, error } = await supabase
        .from(ENTITY_TABLE)
        .update({ data: nextData, updated_at: nowIso() })
        .eq('id', id)
        .select('*')
        .single()

      if (error) throw error
      return normalizeRecord(data)
    },

    async delete(id) {
      if (!id) throw new Error(`Missing ${entityName} id for delete.`)

      if (!supabase) {
        const rows = readLocal(entityName).filter((row) => row.id !== id)
        writeLocal(entityName, rows)
        window.dispatchEvent(new CustomEvent(`record:${entityName}`, { detail: { type: 'DELETE', id } }))
        return { id }
      }

      const { error } = await supabase.from(ENTITY_TABLE).delete().eq('id', id)
      if (error) throw error
      return { id }
    },

    subscribe(callback) {
      if (!supabase) {
        const handler = (event) => callback(event.detail)
        window.addEventListener(`record:${entityName}`, handler)
        return () => window.removeEventListener(`record:${entityName}`, handler)
      }

      const channel = supabase
        .channel(`records:${entityName}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: ENTITY_TABLE, filter: `entity=eq.${entityName}` },
          (payload) => {
            callback({
              type: payload.eventType,
              data: normalizeRecord(payload.new || payload.old),
            })
          }
        )
        .subscribe()

      return () => supabase.removeChannel(channel)
    },
  }
}

const entityNames = [
  'ContactInquiry',
  'ProjectOrder',
  'PortfolioPost',
  'PortfolioProject',
  'FileAnnotation',
  'InquiryMessage',
]

const entities = Object.fromEntries(entityNames.map((name) => [name, createEntityClient(name)]))

export const appClient = {
  entities,

  integrations: {
    Core: {
      async UploadFile({ file }) {
        if (!file) throw new Error('No file selected.')

        if (!supabase) {
          return {
            file_url: URL.createObjectURL(file),
            file_name: file.name,
          }
        }

        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
        const path = `${Date.now()}-${crypto.randomUUID()}-${safeName}`
        const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, {
          cacheControl: '3600',
          upsert: false,
        })
        if (error) throw error

        const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path)
        return {
          file_url: data.publicUrl,
          file_name: file.name,
          path,
        }
      },
    },
  },

  functions: {
    async invoke(name, payload = {}) {
      if (!supabase) {
        return { data: { ok: true, functionName: name, payload } }
      }

      const { data, error } = await supabase.functions.invoke(name, { body: payload })
      if (error) {
        console.warn(`Supabase function "${name}" failed or is not deployed yet.`, error)
        return { data: { ok: false, skipped: true, reason: error.message } }
      }
      return { data }
    },
  },

  analytics: {
    track(event) {
      if (import.meta.env.DEV) console.info('Analytics event:', event)
    },
  },

  auth: {
    async isAuthenticated() {
      if (!supabase) return Boolean(localStorage.getItem('polebarndo_user'))
      const { data } = await supabase.auth.getSession()
      return Boolean(data?.session)
    },

    async me() {
      if (!supabase) {
        const raw = localStorage.getItem('polebarndo_user')
        if (!raw) throw new Error('Not signed in.')
        return JSON.parse(raw)
      }

      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) throw error || new Error('Not signed in.')

      const email = data.user.email || ''
      return {
        id: data.user.id,
        email,
        full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || email.split('@')[0],
        role: ADMIN_EMAILS.includes(email.toLowerCase()) ? 'admin' : 'user',
      }
    },

    async redirectToLogin(redirectPath = '/portal') {
      return this.loginWithGoogle(redirectPath)
    },

    async loginWithGoogle(redirectPath = '/portal') {
      if (!supabase) {
        const demoUser = {
          id: 'local-demo-user',
          email: ADMIN_EMAILS[0] || 'demo@local.test',
          full_name: 'Demo Admin',
          role: 'admin',
        }
        localStorage.setItem('polebarndo_user', JSON.stringify(demoUser))
        window.location.href = redirectPath || '/portal'
        return { ok: true, localDemo: true }
      }

      const redirectTo = `${window.location.origin}${redirectPath || '/portal'}`
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo },
      })
      if (error) throw error
      return { ok: true }
    },

    async loginWithEmail(email, redirectPath = '/portal') {
      const cleanEmail = String(email || '').trim().toLowerCase()
      if (!cleanEmail) throw new Error('Enter your email address first.')

      if (!supabase) {
        const demoUser = {
          id: 'local-demo-user',
          email: cleanEmail,
          full_name: cleanEmail.split('@')[0],
          role: ADMIN_EMAILS.includes(cleanEmail) ? 'admin' : 'user',
        }
        localStorage.setItem('polebarndo_user', JSON.stringify(demoUser))
        window.location.href = redirectPath || '/portal'
        return { ok: true, localDemo: true }
      }

      const emailRedirectTo = `${window.location.origin}${redirectPath || '/portal'}`
      const { error } = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: { emailRedirectTo },
      })
      if (error) throw error
      return { ok: true }
    },

    async logout(redirectPath = '/') {
      if (!supabase) {
        localStorage.removeItem('polebarndo_user')
        if (redirectPath) window.location.href = redirectPath
        return
      }
      await supabase.auth.signOut()
      if (redirectPath) window.location.href = redirectPath
    },
  },
}
