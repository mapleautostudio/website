import "server-only";
import { redirect } from "next/navigation";
import { getSupabaseSessionClient } from "@/lib/supabase/auth";

function adminAllowlist() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  return adminAllowlist().includes(email.toLowerCase());
}

export async function requireAdmin() {
  const supabase = await getSupabaseSessionClient();

  let user = null;
  try {
    const {
      data: { user: fetchedUser },
    } = await supabase.auth.getUser();
    user = fetchedUser;
  } catch {
    // Transient Supabase auth outage (e.g. Cloudflare 521 refreshing a stale
    // token). Treat as unauthenticated and bounce to login rather than
    // throwing a 500 out of the admin page render.
    redirect("/admin/login");
  }

  if (!user) {
    redirect("/admin/login");
  }
  if (!isAdminEmail(user.email)) {
    // Signed in to Supabase but not on the allowlist — sign them out and
    // bounce. Otherwise an attacker who got into a non-admin account could
    // try to cookie-stuff their way around the guard.
    await supabase.auth.signOut();
    redirect("/admin/login?error=not_authorized");
  }

  return { user, supabase };
}
