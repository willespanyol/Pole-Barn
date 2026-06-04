-- Supabase setup for the Pole Barn / Barndominium website.
-- Run this in Supabase SQL Editor before connecting the app.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.app_records (
  id uuid primary key default gen_random_uuid(),
  entity text not null,
  data jsonb not null default '{}'::jsonb,
  created_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists app_records_entity_created_at_idx
  on public.app_records (entity, created_at desc);

create index if not exists app_records_data_gin_idx
  on public.app_records using gin (data);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create or replace function public.owns_record(row_data jsonb, row_created_by text)
returns boolean
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) in (
    lower(coalesce(row_created_by, '')),
    lower(coalesce(row_data ->> 'email', '')),
    lower(coalesce(row_data ->> 'clientEmail', ''))
  );
$$;

alter table public.admin_users enable row level security;
alter table public.app_records enable row level security;

drop policy if exists "Admin users can read admin list" on public.admin_users;
create policy "Admin users can read admin list"
  on public.admin_users for select
  using (public.is_admin());

drop policy if exists "Anyone can submit website records" on public.app_records;
create policy "Anyone can submit website records"
  on public.app_records for insert
  with check (entity in ('ContactInquiry', 'ProjectOrder', 'InquiryMessage', 'FileAnnotation'));

drop policy if exists "Admins can insert all records" on public.app_records;
create policy "Admins can insert all records"
  on public.app_records for insert
  with check (public.is_admin());

drop policy if exists "Public can read published portfolio" on public.app_records;
create policy "Public can read published portfolio"
  on public.app_records for select
  using (
    entity = 'PortfolioProject'
    or (entity = 'PortfolioPost' and coalesce((data ->> 'published')::boolean, false) = true)
  );

drop policy if exists "Owners can read their records" on public.app_records;
create policy "Owners can read their records"
  on public.app_records for select
  using (auth.role() = 'authenticated' and public.owns_record(data, created_by));

drop policy if exists "Admins can read all records" on public.app_records;
create policy "Admins can read all records"
  on public.app_records for select
  using (public.is_admin());

drop policy if exists "Owners can update their own records" on public.app_records;
create policy "Owners can update their own records"
  on public.app_records for update
  using (auth.role() = 'authenticated' and public.owns_record(data, created_by))
  with check (auth.role() = 'authenticated' and public.owns_record(data, created_by));

drop policy if exists "Admins can update all records" on public.app_records;
create policy "Admins can update all records"
  on public.app_records for update
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete records" on public.app_records;
create policy "Admins can delete records"
  on public.app_records for delete
  using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('project-files', 'project-files', true)
on conflict (id) do update set public = true;

drop policy if exists "Anyone can upload project files" on storage.objects;
create policy "Anyone can upload project files"
  on storage.objects for insert
  with check (bucket_id = 'project-files');

drop policy if exists "Anyone can read project files" on storage.objects;
create policy "Anyone can read project files"
  on storage.objects for select
  using (bucket_id = 'project-files');

-- Replace this email with your own admin email, then run it.
insert into public.admin_users (email)
values ('willymwangi997@gmail.com')
on conflict (email) do nothing;
