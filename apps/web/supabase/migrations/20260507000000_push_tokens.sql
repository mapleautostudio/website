create table if not exists push_tokens (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  created_at timestamptz not null default now()
);

-- Only authenticated admins can insert/select their own tokens.
alter table push_tokens enable row level security;

create policy "Authenticated users can manage tokens"
  on push_tokens
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
