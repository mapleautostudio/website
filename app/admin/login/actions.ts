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
    return { error: "Invalid email or password." };
  }

  redirect("/admin");
}
