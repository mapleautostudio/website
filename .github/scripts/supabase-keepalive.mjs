// Supabase free-tier keep-alive ping.
//
// Free-tier Supabase projects are paused after ~7 days with no activity.
// A paused project means the booking API and admin view stop working until
// someone manually un-pauses it in the dashboard. The old workaround was to
// insert a throwaway booking row by hand every week; this script replaces
// that by issuing one lightweight read against the database on a schedule
// (see .github/workflows/supabase-keepalive.yml).
//
// The service-role key bypasses RLS, so a `select id limit 1` against the
// bookings table is enough to register real database activity without
// writing any data.

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
      "Set them as repository secrets (Settings → Secrets and variables → Actions)."
  );
  process.exit(1);
}

const endpoint = `${url.replace(/\/$/, "")}/rest/v1/bookings?select=id&limit=1`;

try {
  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`Keep-alive ping failed: ${res.status} ${res.statusText}\n${body}`);
    process.exit(1);
  }

  console.log(`Keep-alive ping OK (${res.status}). Supabase project is awake.`);
} catch (err) {
  console.error(`Keep-alive ping threw: ${err?.message ?? err}`);
  process.exit(1);
}
