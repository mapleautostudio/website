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
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
