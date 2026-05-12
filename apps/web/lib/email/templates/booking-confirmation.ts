import { SERVICES_BY_SLUG } from "@/lib/content/services";
import { SHOP } from "@/lib/content/contact";
import type { BookingRow, BookingTimeWindow } from "@/lib/supabase/types";

const TIME_WINDOW_LABEL: Record<BookingTimeWindow, string> = {
  morning: "Morning (8 – 12)",
  afternoon: "Afternoon (12 – 16)",
  evening: "Evening (16 – 18)",
  flexible: "Flexible — we'll confirm the exact time",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function escape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function firstName(full: string) {
  const t = full.trim().split(/\s+/)[0];
  return t || full.trim();
}

export function bookingConfirmationEmail({ booking }: { booking: BookingRow }) {
  const serviceLabel =
    SERVICES_BY_SLUG[booking.service]?.shortTitle ?? booking.service;
  const vehicle = `${booking.vehicle_year} ${booking.vehicle_make} ${booking.vehicle_model}`;
  const dateLabel = formatDate(booking.preferred_date);
  const windowLabel = TIME_WINDOW_LABEL[booking.preferred_time_window];
  const fname = firstName(booking.contact_name);

  const subject = `Booking confirmed — Maple Auto Studio · ${booking.reference}`;

  const text = [
    `Booking confirmed.`,
    ``,
    `Hi ${fname},`,
    ``,
    `We've confirmed your appointment for ${serviceLabel} on ${dateLabel}, ${windowLabel}.`,
    ``,
    `Vehicle:  ${vehicle}`,
    `Where:    ${SHOP.location.line1}, ${SHOP.location.city}`,
    `Phone:    ${SHOP.phone}`,
    ``,
    `If anything changes on your end, just reply to this email or call the studio.`,
    ``,
    `Reference: ${booking.reference}`,
  ].join("\n");

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 16px 8px 0;color:#6e7780;font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;vertical-align:top;white-space:nowrap;">${escape(label)}</td>
      <td style="padding:8px 0;color:#1a2027;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;line-height:1.5;vertical-align:top;">${escape(value)}</td>
    </tr>`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:32px 16px;background:#f4f2ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1a2027;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e3dfd6;border-radius:8px;overflow:hidden;">
      <div style="padding:28px 28px;border-bottom:1px solid #e3dfd6;background:#0f1418;color:#f4ece2;">
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#b8332e;margin-bottom:10px;">Booking confirmed</div>
        <div style="font-size:24px;font-weight:300;letter-spacing:-0.015em;line-height:1.15;">${escape(serviceLabel)}<span style="color:#b3aea4;"> · ${escape(dateLabel)}</span></div>
        <div style="margin-top:14px;font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#b3aea4;letter-spacing:0.02em;">REF ${escape(booking.reference)}</div>
      </div>

      <div style="padding:28px 28px;">
        <p style="margin:0 0 16px;font-size:16px;line-height:1.55;color:#1a2027;">Hi ${escape(fname)},</p>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#1a2027;">
          We&rsquo;ve confirmed your appointment for <strong>${escape(serviceLabel)}</strong> on <strong>${escape(dateLabel)}</strong>, ${escape(windowLabel)}.
        </p>

        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;border-top:1px solid #e3dfd6;border-bottom:1px solid #e3dfd6;">
          ${row("Vehicle", vehicle)}
          ${row("Where", `${SHOP.location.line1}, ${SHOP.location.city}`)}
          ${row("Phone", SHOP.phone)}
        </table>

        <p style="margin:24px 0 0;font-size:13px;line-height:1.55;color:#6e7780;">
          If anything changes on your end, just reply to this email or call the studio.
        </p>
      </div>
    </div>
  </body>
</html>`;

  return { subject, text, html };
}
