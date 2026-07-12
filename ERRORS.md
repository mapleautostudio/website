# Errors Backlog

Running log of production/runtime errors, their diagnosis, and resolution status.
Newest first. Add an entry whenever a recurring or noteworthy error shows up.

Status legend: 🔴 open · 🟡 mitigated (code shipped, monitoring) · 🟢 resolved

---

## 2026-07-02 · `AuthRetryableFetchError` status 521 on `/admin/*` — 🟡 mitigated

**Symptom**
Server logs repeatedly show:
```
Error [AuthRetryableFetchError]: {}
  __isAuthError: true,
  status: 521,
  code: undefined
```
Only happens for some visitors. **Works fine in incognito or after clearing browser history.**

**Diagnosis**
- `status: 521` is a **Cloudflare "web server is down"** code — Supabase's auth origin was transiently unreachable (there was an active "investigating a technical issue" banner in the Supabase dashboard at the time).
- `apps/web/proxy.ts` calls `await supabase.auth.getUser()` on every `/admin/*` request. A browser holding a **stale/expired auth cookie** triggers a token-refresh fetch to Supabase's auth endpoint. When that fetch fails at the transport level, supabase-js retries and then throws `AuthRetryableFetchError`.
- Incognito / cleared history carry **no auth cookie** → no refresh attempted → no error. That's why those cases are clean.
- Root cause is an **upstream Supabase blip**, not a logic bug — but our code crashed/logged loudly instead of degrading gracefully.

**Fix (code side)**
Wrapped the server-side `getUser()` calls so a transient auth-endpoint failure no longer throws:
- `apps/web/proxy.ts` — `getUser()` in try/catch; proxy continues (route guard is authoritative).
- `apps/web/lib/admin/guard.ts` — `requireAdmin()` catches the throw and redirects to `/admin/login` instead of 500-ing the page render.

**Follow-ups if it recurs**
- If the noise continues even without an active Supabase outage, check the Supabase project's **auth rate limits** and **connection pooler** health.
- Consider clearing stale `sb-*` auth cookies client-side on a caught refresh failure so repeat visits stop re-triggering it.
- Watch the Supabase status page; persistent 521s across many projects = provider-side, nothing more to do our end.
