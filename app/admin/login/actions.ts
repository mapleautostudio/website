"use server";

import { redirect } from "next/navigation";
import { getSupabaseSessionClient } from "@/lib/supabase/auth";
import { isAdminEmail } from "@/lib/admin/guard";

export type LoginState = { error: string | null };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter both email and password." };
  }

  if (!isAdminEmail(email)) {
    return { error: "This account isn't authorized for admin access." };
  }

  const supabase = await getSupabaseSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("[admin login] supabase auth error", {
      email,
      code: error.code,
      message: error.message,
    });
    if (error.code === "email_not_confirmed") {
      return {
        error:
          "This account exists but its email isn't confirmed yet. Confirm it in the Supabase dashboard and retry.",
      };
    }
    // Any other auth failure after the allowlist check has passed is a
    // credential mismatch (wrong password, or user not yet provisioned in
    // Supabase Auth). Don't reuse the "not authorized" copy — that one is
    // reserved for accounts that aren't on the admin allowlist.
    return { error: "Email or password is incorrect." };
  }

  redirect("/admin");
}
