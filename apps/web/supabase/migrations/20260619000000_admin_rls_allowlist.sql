-- Maple Auto Studio · admin-only RLS (fixes #4)
--
-- Before this migration, the bookings and push_tokens policies allowed ANY
-- authenticated Supabase user (`auth.role() = 'authenticated'`) to read and
-- update rows. Admin identity was only enforced in app code
-- (apps/web/lib/admin/guard.ts). Because the anon key is public (bundled in the
-- web client, and present in apps/mobile), a self-signed-up user could call
-- PostgREST directly and read every customer's PII. This moves the admin check
-- into the database via an allowlist table + an is_admin() helper, so RLS — not
-- just the app — enforces it.
--
-- IMPORTANT companion step (Supabase dashboard, not SQL): turn off open
-- sign-ups at Authentication → Providers → Email → "Allow new users to sign
-- up". That stops attackers from minting an authenticated session at all; this
-- migration is the defense-in-depth layer behind it.

-- 1. Allowlist of admin emails — the single DB-level source of truth.
create table if not exists public.admins (
  email text primary key,
  created_at timestamptz not null default now()
);

-- Lock it down. The service role bypasses RLS and the SECURITY DEFINER helper
-- below reads it directly, so anon/authenticated need no access — which also
-- means the admin list can't be enumerated through PostgREST.
alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;

-- Seed known admins. Keep in sync with apps/web ADMIN_EMAILS and
-- apps/mobile/src/lib/auth.ts.
insert into public.admins (email) values
  ('khushdeep899@gmail.com'),
  ('mapleautostudio@gmail.com')
on conflict (email) do nothing;

-- 2. Helper: is the current request's JWT email on the allowlist?
-- SECURITY DEFINER so it can read public.admins regardless of the caller's
-- grants. STABLE — evaluated once per statement. Empty search_path pins object
-- resolution (pg_catalog is still implicitly searched) and avoids search-path
-- hijacking. A null/absent email claim yields false → default-deny.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admins a
    where lower(a.email) = lower(auth.jwt() ->> 'email')
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- 3. Replace the over-permissive bookings policies with admin-scoped ones.
-- (Web admin reads via the service-role key and bypasses RLS, so it is
-- unaffected; the mobile app reads as the signed-in admin, which still passes.)
drop policy if exists "Admin read bookings" on public.bookings;
drop policy if exists "Admin update bookings" on public.bookings;

create policy "Admin read bookings"
  on public.bookings for select
  using (public.is_admin());

create policy "Admin update bookings"
  on public.bookings for update
  using (public.is_admin())
  with check (public.is_admin());

-- 4. Replace the over-permissive push_tokens policy. Mobile registers its token
-- only after an admin sign-in, so admins can still upsert; non-admins can't.
--
-- Create the table if this project never ran 20260507000000_push_tokens.sql
-- (e.g. the mobile push feature was never set up here). Doing it here — with
-- the admin-only policy attached straight away — means push_tokens can never
-- exist in the old "any authenticated user" state. Definition matches
-- 20260507000000_push_tokens.sql.
create extension if not exists pgcrypto;

create table if not exists public.push_tokens (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  created_at timestamptz not null default now()
);
alter table public.push_tokens enable row level security;

drop policy if exists "Authenticated users can manage tokens" on public.push_tokens;
drop policy if exists "Admins can manage push tokens" on public.push_tokens;

create policy "Admins can manage push tokens"
  on public.push_tokens for all
  using (public.is_admin())
  with check (public.is_admin());
