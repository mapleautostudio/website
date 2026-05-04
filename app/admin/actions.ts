"use server";

import { redirect } from "next/navigation";
import { getSupabaseSessionClient } from "@/lib/supabase/auth";

export async function logout() {
  const supabase = await getSupabaseSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
