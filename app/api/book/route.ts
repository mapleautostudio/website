import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/booking/schema";
import { EMAIL_CONFIG, getResend } from "@/lib/email/resend";
import { bookingNotificationEmail } from "@/lib/email/templates/booking-notification";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { BookingInsert } from "@/lib/supabase/types";

export const runtime = "nodejs";

function referenceCode() {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MAS-${yy}${mm}${dd}-${rand}`;
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true, reference: referenceCode() });
  }

  const reference = referenceCode();
  const supabase = getSupabaseAdmin();

  const insert: BookingInsert = {
    reference,
    idempotency_key: data.idempotencyKey,
    vehicle_year: data.vehicleYear,
    vehicle_make: data.vehicleMake,
    vehicle_model: data.vehicleModel,
    vehicle_notes: data.vehicleNotes?.trim() || null,
    service: data.service,
    preferred_date: data.preferredDate,
    preferred_time_window: data.preferredTimeWindow,
    contact_name: data.contactName,
    contact_phone: data.contactPhone,
    contact_email: data.contactEmail,
    notes: data.notes?.trim() || null,
  };

  const { data: inserted, error: insertError } = await supabase
    .from("bookings")
    .insert(insert)
    .select("id, reference")
    .single();

  if (insertError) {
    // Postgres unique_violation = duplicate idempotency key (form re-submit).
    if (insertError.code === "23505") {
      return NextResponse.json(
        { ok: false, error: "Duplicate submission" },
        { status: 409 },
      );
    }
    console.error("[booking] supabase insert failed", {
      reference,
      error: insertError,
    });
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't save your request. Please try again, or call us directly — we'll book you on the spot.",
      },
      { status: 503 },
    );
  }

  // Booking is persisted. Email is now best-effort: a failure here doesn't
  // lose the booking, it just means Khus has to refresh the admin view
  // instead of seeing it land in the inbox.
  const { subject, text, html } = bookingNotificationEmail({ reference, data });

  try {
    const resend = getResend();
    const result = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.notifyTo,
      replyTo: data.contactEmail,
      subject,
      text,
      html,
    });

    if (result.error) {
      console.error("[booking] resend error", {
        reference,
        error: result.error,
      });
    } else {
      await supabase
        .from("bookings")
        .update({ email_sent_at: new Date().toISOString() })
        .eq("id", inserted.id);
    }
  } catch (err) {
    console.error("[booking] send threw", { reference, err });
  }

  return NextResponse.json({ ok: true, reference });
}
