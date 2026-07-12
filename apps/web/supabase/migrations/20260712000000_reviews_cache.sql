-- Maple Auto Studio · cached Google reviews
--
-- A single-row store for reviews scraped from the shop's Google Maps listing.
-- A monthly GitHub Action (.github/scripts/refresh-reviews.mjs) upserts row 1;
-- the homepage reads it via the service-role key and renders from the cache, so
-- the site never depends on the scraper being reachable at request time.
-- Same shape/pattern as public.pricing_content.

create table if not exists public.reviews_cache (
  id smallint primary key default 1,
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  constraint reviews_cache_singleton check (id = 1)
);

alter table public.reviews_cache enable row level security;
revoke all on public.reviews_cache from anon, authenticated;

-- Seed an empty-but-valid payload so the row always exists (the web reader also
-- falls back to an empty default if it's ever missing). Idempotent.
insert into public.reviews_cache (id, payload)
values (
  1,
  '{"reviews":[],"totalCount":0,"textCount":0,"averageRating":0,"fetchedAt":null}'::jsonb
)
on conflict (id) do nothing;
