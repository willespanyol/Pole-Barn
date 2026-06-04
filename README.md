# Pole Barndominium Designs Website

This is the clean Vite + React version of the pole barn / barndominium design services website. It has been separated from the original hosted builder and is prepared for local development in Visual Studio Code, Supabase, and Vercel.

## Current setup

- Brand name: Pole Barndominium Designs
- Admin email: willymwangi997@gmail.com
- Current contact email: willymwangi997@gmail.com
- Live domain to connect: https://polebarndominiumsite.site
- Phone / WhatsApp: +1 (480) 338-3000
- Service area: worldwide remote design service
- Portal login: Google login and email magic-link login

## What is included

- Public marketing pages for pole barn, post-frame, barndominium, structural, foundation, framing, MEP, portfolio, resources, FAQ, and contact pages.
- Multi-step project order/request form.
- Contact inquiry form.
- Client portal and admin dashboard foundation.
- Supabase-ready database wrapper.
- Supabase-ready file upload wrapper.
- Google login and email magic-link login support.
- Local demo fallback, so the site can run before Supabase is connected.
- Local SVG project images, so the site does not depend on the old hosted image links.
- Homepage package/pricing preview section.

## 1. Install locally

Open the project folder in Visual Studio Code, then run:

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

Without Supabase keys, forms and portal records are stored in browser local storage for testing only.

## 2. Connect Supabase

Create a Supabase project, then open **SQL Editor** and run:

```text
supabase/schema.sql
```

The SQL file already inserts this admin email:

```sql
insert into public.admin_users (email)
values ('willymwangi997@gmail.com')
on conflict (email) do nothing;
```

## 3. Add environment variables locally

Copy `.env.local.example` to `.env.local`, then fill in your Supabase details:

```bash
cp .env.local.example .env.local
```

Your `.env.local` should look like this:

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
VITE_ADMIN_EMAILS=willymwangi997@gmail.com
```

Restart the local server after editing environment variables:

```bash
npm run dev
```

## 4. Supabase auth settings

In Supabase:

1. Go to **Authentication > URL Configuration**.
2. Set **Site URL** to:

```text
https://polebarndominiumsite.site
```

3. Add these redirect URLs:

```text
http://localhost:5173/portal
https://polebarndominiumsite.site/portal
```

4. Go to **Authentication > Providers**.
5. Enable **Email** for email magic-link login.
6. Enable **Google** for Google login.

Google login also requires a Google OAuth client ID and secret from Google Cloud Console before it works on the live domain.

## 5. Deploy to Vercel

Push this folder to GitHub, then import it into Vercel.

Set these Vercel environment variables:

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
VITE_ADMIN_EMAILS=willymwangi997@gmail.com
```

Build settings:

```text
Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

The `vercel.json` file is included so direct links such as `/order`, `/portal`, and `/services` work correctly.

## 6. Notes before going live

- Replace the Gmail contact with a business email later when ready.
- Replace placeholder SVG images with real project renderings or portfolio images.
- Review all service claims, especially wording around permit approval and engineering stamping.
- Keep the professional disclaimer in the footer unless licensed professional coverage is available for every jurisdiction.
- The included Supabase storage bucket is public for simple file access. For confidential drawings, upgrade this later to signed private file URLs.
