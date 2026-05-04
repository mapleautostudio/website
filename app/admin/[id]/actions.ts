"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/guard";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { BookingStatus } from "@/lib/supabase/types";

const VALID_STATUS: BookingStatus[] = [
  "new",
  "confirmed",
  "declined",
  "completed",
  "no_show",
];

function isValidStatus(s: string): s is BookingStatus {
  return (VALID_STATUS as string[]).includes(s);
}

export async function updateBookingStatus(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id) throw new Error("Missing booking id");
  if (!isValidStatus(status)) throw new Error("Invalid status");

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("[admin] failed to update status", { id, status, error });
    throw new Error("Failed to update status");
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/${id}`);
}
