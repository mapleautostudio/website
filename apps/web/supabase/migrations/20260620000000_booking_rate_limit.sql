-- Maple Auto Studio · rate limiting for the public booking endpoint (#6)
--
-- The booking API (apps/web/app/api/book/route.ts) is unauthenticated and its
-- only abuse control was a honeypot. This adds an atomic, fixed-window counter
-- in Postgres so the route can cap submissions per client IP without standing
-- up any new external service. It is called from the route through the
-- service-role client via rpc('register_rate_hit', ...).

create table if not exists public.rate_limit_hits (
  key text not null,
  window_start timestamptz not null,
  hits integer not null default 0,
  primary key (key, window_start)
);

-- Helps the periodic cleanup delete below stay cheap.
create index if not exists rate_limit_hits_window_start_idx
  on public.rate_limit_hits (window_start);

-- Never exposed through PostgREST — only the SECURITY DEFINER function below
-- touches it, and that function runs as its owner regardless of these grants.
alter table public.rate_limit_hits enable row level security;
revoke all on public.rate_limit_hits from anon, authenticated;

-- Register one hit against a fixed time window and report whether the caller is
-- still within the limit. Atomic: concurrent calls serialize on the upserted
-- row, so the count can't race. Returns true when allowed, false when the limit
-- for this window has been exceeded.
create or replace function public.register_rate_hit(
  p_key text,
  p_limit integer,
  p_window_seconds integer
) returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_window_start timestamptz;
  v_hits integer;
begin
  -- Bucket the current time into a fixed window of p_window_seconds.
  v_window_start := to_timestamp(
    floor(extract(epoch from clock_timestamp()) / p_window_seconds) * p_window_seconds
  );

  insert into public.rate_limit_hits as r (key, window_start, hits)
  values (p_key, v_window_start, 1)
  on conflict (key, window_start)
    do update set hits = r.hits + 1
  returning r.hits into v_hits;

  -- Opportunistically drop this key's older windows so the table stays small.
  delete from public.rate_limit_hits
  where key = p_key and window_start < v_window_start;

  return v_hits <= p_limit;
end;
$$;

revoke all on function public.register_rate_hit(text, integer, integer) from public;
grant execute on function public.register_rate_hit(text, integer, integer) to service_role;
