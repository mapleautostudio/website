import { SERVICES_BY_SLUG } from "@/lib/content/services";
import { SHOP } from "@/lib/content/contact";
import type { BookingRow } from "@/lib/supabase/types";

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

export function bookingDeclineEmail({
  booking,
  baseUrl,
}: {
  booking: BookingRow;
  baseUrl: string;
}) {
  const serviceLabel =
    SERVICES_BY_SLUG[booking.service]?.shortTitle ?? booking.service;
  const vehicle = `${booking.vehicle_year} ${booking.vehicle_make} ${booking.vehicle_model}`;
  const dateLabel = formatDate(booking.preferred_date);
  const fname = firstName(booking.contact_name);
  const rebookUrl = `${baseUrl.replace(/\/$/, "")}/book?service=${encodeURIComponent(booking.service)}`;

  const subject = `About your booking — Maple Auto Studio · ${booking.reference}`;

  const text = [
    `About your booking.`,
    ``,
    `Hi ${fname},`,
    ``,
    `We're not able to take your ${serviceLabel} appointment on ${dateLabel} as requested. A representative from the studio will contact you shortly to find an alternative time that works.`,
    ``,
    `If you'd rather pick a new slot yourself, you can submit a fresh request here:`,
    rebookUrl,
    ``,
    `Vehicle:  ${vehicle}`,
    `Phone:    ${SHOP.phone}`,
    ``,
    `Apologies for the back-and-forth.`,
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
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#b8332e;margin-bottom:10px;">About your booking</div>
        <div style="font-size:22px;font-weight:300;letter-spacing:-0.015em;line-height:1.2;">A representative will contact you shortly.</div>
        <div style="margin-top:14px;font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#b3aea4;letter-spacing:0.02em;">REF ${escape(booking.reference)}</div>
      </div>

      <div style="padding:28px 28px;">
        <p style="margin:0 0 16px;font-size:16px;line-height:1.55;color:#1a2027;">Hi ${escape(fname)},</p>
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#1a2027;">
          We&rsquo;re not able to take your <strong>${escape(serviceLabel)}</strong> appointment on <strong>${escape(dateLabel)}</strong> as requested. A representative from the studio will reach out shortly by phone or email to find an alternative time that works.
        </p>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#1a2027;">
          If you&rsquo;d rather pick a new slot yourself:
        </p>

        <div style="text-align:center;margin:0 0 24px;">
          <a href="${escape(rebookUrl)}" style="display:inline-block;padding:12px 28px;background:#b8332e;color:#ffffff;text-decoration:none;border-radius:4px;font-size:14px;font-weight:500;letter-spacing:-0.005em;">
            Submit a new request →
          </a>
        </div>

        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;border-top:1px solid #e3dfd6;border-bottom:1px solid #e3dfd6;">
          ${row("Vehicle", vehicle)}
          ${row("Phone", SHOP.phone)}
        </table>

        <p style="margin:24px 0 0;font-size:13px;line-height:1.55;color:#6e7780;">
          Apologies for the back-and-forth. If you need to reach the studio directly, just reply to this email or call.
        </p>
      </div>
    </div>
  </body>
</html>`;

  return { subject, text, html };
}
