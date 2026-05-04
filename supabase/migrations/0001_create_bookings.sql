-- Maple Auto Studio · bookings
-- Run this once in the Supabase SQL Editor for a new project.

create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),

  reference text not null unique,
  idempotency_key uuid not null unique,
  status text not null default 'new'
    check (status in ('new', 'confirmed', 'declined', 'completed', 'no_show')),

  -- Vehicle
  vehicle_year int not null check (vehicle_year between 1950 and extract(year from now())::int + 2),
  vehicle_make text not null,
  vehicle_model text not null,
  vehicle_notes text,

  -- Service & timing
  service text not null,
  preferred_date date not null,
  preferred_time_window text not null
    check (preferred_time_window in ('morning', 'afternoon', 'evening', 'flexible')),

  -- Contact
  contact_name text not null,
  contact_phone text not null,
  contact_email text not null,

  notes text,

  -- Notification tracking. Null = email never went out, surface in admin view.
  email_sent_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bookings_created_at_idx
  on public.bookings (created_at desc);

create index if not exists bookings_status_idx
  on public.bookings (status);

create index if not exists bookings_contact_email_idx
  on public.bookings (contact_email);

create index if not exists bookings_contact_phone_idx
  on public.bookings (contact_phone);

-- Auto-bump updated_at on row updates.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

-- Lock down. Service-role key bypasses RLS, so the API route can still
-- insert. Anon and authenticated clients have no policies yet, so they
-- can't read or write. We'll add an admin read policy when the admin
-- view ships with auth.
alter table public.bookings enable row level security;

revoke all on public.bookings from anon, authenticated;
