import { supabase } from "./supabase";

const ADMIN_EMAILS = [
  "mapleautostudio@gmail.com",
  "khushdeep899@gmail.com",
];

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  if (!data.user || !isAdminEmail(data.user.email ?? "")) {
    await supabase.auth.signOut();
    throw new Error("Not authorised.");
  }
  return data.user;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}
