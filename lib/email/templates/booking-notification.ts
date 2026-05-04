import { SERVICES_BY_SLUG } from "@/lib/content/services";
import { type BookingInput } from "@/lib/booking/schema";

const TIME_WINDOW_LABEL: Record<BookingInput["preferredTimeWindow"], string> = {
  morning: "Morning (8 – 12)",
  afternoon: "Afternoon (12 – 16)",
  evening: "Evening (16 – 18)",
  flexible: "Flexible",
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

export function bookingNotificationEmail({
  reference,
  data,
}: {
  reference: string;
  data: BookingInput;
}) {
  const serviceLabel =
    SERVICES_BY_SLUG[data.service]?.shortTitle ?? data.service;
  const vehicle = `${data.vehicleYear} ${data.vehicleMake} ${data.vehicleModel}`;
  const trim = data.vehicleNotes?.trim();
  const notes = data.notes?.trim();

  const subject = `[Booking ${reference}] ${serviceLabel} · ${data.contactName} · ${vehicle}`;

  const text = [
    `New booking request — ${reference}`,
    ``,
    `Service:        ${serviceLabel}`,
    `Preferred date: ${formatDate(data.preferredDate)}`,
    `Time window:    ${TIME_WINDOW_LABEL[data.preferredTimeWindow]}`,
    ``,
    `Vehicle:        ${vehicle}`,
    trim ? `Trim / notes:   ${trim}` : null,
    ``,
    `Customer:       ${data.contactName}`,
    `Phone:          ${data.contactPhone}`,
    `Email:          ${data.contactEmail}`,
    ``,
    notes ? `Notes:` : null,
    notes ? notes : null,
    ``,
    `Reply directly to this email to respond to the customer.`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:8px 16px 8px 0;color:#6e7780;font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;vertical-align:top;white-space:nowrap;">${escape(label)}</td>
      <td style="padding:8px 0;color:#1a2027;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;line-height:1.5;vertical-align:top;">${escape(value)}</td>
    </tr>`;

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:32px 16px;background:#f4f2ee;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1a2027;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e3dfd6;border-radius:8px;overflow:hidden;">
      <div style="padding:24px 28px;border-bottom:1px solid #e3dfd6;background:#0f1418;color:#e8edf1;">
        <div style="font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#b8332e;margin-bottom:8px;">New booking request</div>
        <div style="font-size:22px;font-weight:300;letter-spacing:-0.015em;line-height:1.2;">${escape(serviceLabel)}<span style="color:#a8b0b9;"> · ${escape(data.contactName)}</span></div>
        <div style="margin-top:12px;font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#a8b0b9;letter-spacing:0.02em;">REF ${escape(reference)}</div>
      </div>

      <div style="padding:24px 28px;">
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;">
          ${row("Service", serviceLabel)}
          ${row("Date", formatDate(data.preferredDate))}
          ${row("Window", TIME_WINDOW_LABEL[data.preferredTimeWindow])}
          ${row("Vehicle", vehicle)}
          ${trim ? row("Trim", trim) : ""}
          ${row("Customer", data.contactName)}
          ${row("Phone", data.contactPhone)}
          ${row("Email", data.contactEmail)}
        </table>

        ${
          notes
            ? `<div style="margin-top:20px;padding-top:20px;border-top:1px solid #e3dfd6;">
              <div style="font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#6e7780;margin-bottom:8px;">Notes</div>
              <div style="font-size:14px;line-height:1.55;color:#1a2027;white-space:pre-wrap;">${escape(notes)}</div>
            </div>`
            : ""
        }

        <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e3dfd6;font-size:12px;color:#6e7780;line-height:1.55;">
          Reply directly to this email to respond to the customer — their address is set as reply-to.
        </div>
      </div>
    </div>
  </body>
</html>`;

  return { subject, text, html };
}
