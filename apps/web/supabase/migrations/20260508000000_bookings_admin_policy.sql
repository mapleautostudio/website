-- Grant authenticated users (staff) read and update access to bookings.
-- The app-level admin gate (auth.ts allowlist) ensures only known admins
-- can obtain a session; RLS provides the DB-level enforcement.
create policy "Admin read bookings"
  on public.bookings for select
  using (auth.role() = 'authenticated');

create policy "Admin update bookings"
  on public.bookings for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
