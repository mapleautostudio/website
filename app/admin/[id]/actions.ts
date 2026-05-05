"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { requireAdmin } from "@/lib/admin/guard";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { EMAIL_CONFIG, getResend } from "@/lib/email/resend";
import { bookingConfirmationEmail } from "@/lib/email/templates/booking-confirmation";
import { bookingDeclineEmail } from "@/lib/email/templates/booking-decline";
import type { BookingRow, BookingStatus } from "@/lib/supabase/types";

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

async function getBaseUrl() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto =
    h.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

async function notifyCustomer(
  booking: BookingRow,
  newStatus: "confirmed" | "declined",
) {
  try {
    const baseUrl = await getBaseUrl();
    const resend = getResend();
    const tmpl =
      newStatus === "confirmed"
        ? bookingConfirmationEmail({ booking })
        : bookingDeclineEmail({ booking, baseUrl });

    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: booking.contact_email,
      replyTo: EMAIL_CONFIG.notifyTo,
      subject: tmpl.subject,
      text: tmpl.text,
      html: tmpl.html,
    });

    if (result.error) {
      console.error("[admin] customer email send error", {
        reference: booking.reference,
        newStatus,
        error: result.error,
      });
      return;
    }
    console.log("[admin] customer email sent", {
      reference: booking.reference,
      newStatus,
      id: result.data?.id,
    });
  } catch (err) {
    console.error("[admin] customer email threw", {
      reference: booking.reference,
      newStatus,
      err,
    });
  }
}

export async function updateBookingStatus(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id) throw new Error("Missing booking id");
  if (!isValidStatus(status)) throw new Error("Invalid status");

  const supabase = getSupabaseAdmin();

  // Read current booking — we need both the previous status (so we don't
  // re-send a customer email on a no-op transition) and the booking fields
  // (for the email template payload).
  const { data: before, error: readError } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single<BookingRow>();

  if (readError || !before) {
    console.error("[admin] failed to read booking before update", {
      id,
      error: readError,
    });
    throw new Error("Failed to update status");
  }

  const previousStatus = before.status;

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

  // Customer-facing notification on real transitions only.
  // The disabled "Already X" UI prevents same-status double-clicks via the
  // form, but a direct POST could still bypass that — guard server-side.
  if (
    previousStatus !== status &&
    (status === "confirmed" || status === "declined")
  ) {
    // Send with the updated status reflected in the booking object so
    // recipient email shows the right state if they read the raw payload.
    await notifyCustomer({ ...before, status }, status);
  }
}
