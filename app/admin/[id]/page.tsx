import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, Mail, AlertCircle } from "lucide-react";
import { requireAdmin } from "@/lib/admin/guard";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SERVICES_BY_SLUG } from "@/lib/content/services";
import type { BookingRow, BookingStatus } from "@/lib/supabase/types";
import { updateBookingStatus } from "./actions";

export const dynamic = "force-dynamic";

const TIME_WINDOW_LABEL: Record<BookingRow["preferred_time_window"], string> = {
  morning: "Morning (8 – 12)",
  afternoon: "Afternoon (12 – 16)",
  evening: "Evening (16 – 18)",
  flexible: "Flexible",
};

const STATUS_ACTIONS: Array<{
  status: BookingStatus;
  label: string;
  variant: "primary" | "ghost" | "danger";
}> = [
  { status: "confirmed", label: "Confirm", variant: "primary" },
  { status: "declined", label: "Decline", variant: "danger" },
  { status: "completed", label: "Mark complete", variant: "ghost" },
  { status: "no_show", label: "Mark no-show", variant: "ghost" },
  { status: "new", label: "Reset to new", variant: "ghost" },
];

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

function formatTimestamp(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 py-4"
      style={{ borderBottom: "1px solid var(--color-hairline)" }}
    >
      <span
        className="meta"
        style={{ fontSize: 11, alignSelf: "start" }}
      >
        {label.toUpperCase()}
      </span>
      <div
        className="sm:col-span-2 text-fg-1"
        style={{ fontSize: 15, lineHeight: 1.5 }}
      >
        {children}
      </div>
    </div>
  );
}

export default async function AdminBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user } = await requireAdmin();
  const { id } = await params;

  const supabase = getSupabaseAdmin();
  const { data: booking, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !booking) notFound();

  const b = booking as BookingRow;
  const serviceLabel = SERVICES_BY_SLUG[b.service]?.shortTitle ?? b.service;
  const vehicle = `${b.vehicle_year} ${b.vehicle_make} ${b.vehicle_model}`;
  const replyToSubject = `Re: Maple Auto Studio booking ${b.reference}`;
  const mailtoHref = `mailto:${b.contact_email}?subject=${encodeURIComponent(replyToSubject)}`;

  return (
    <>
      <AdminHeader email={user.email ?? undefined} />

      <main className="flex-1">
        <div className="container-x" style={{ paddingBlock: 48 }}>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-fg-2 hover:text-chrome transition-colors mb-8"
            style={{ fontSize: 13 }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} /> All bookings
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span
                  className="font-mono text-fg-2"
                  style={{ fontSize: 13, letterSpacing: "0.02em" }}
                >
                  {b.reference}
                </span>
                <StatusBadge status={b.status} />
                {b.email_sent_at === null && (
                  <span
                    className="inline-flex items-center gap-1.5"
                    style={{
                      padding: "4px 10px",
                      borderRadius: 2,
                      background: "rgba(212, 179, 106, 0.14)",
                      color: "var(--color-warning)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.16em",
                    }}
                  >
                    <AlertCircle size={11} strokeWidth={1.5} />
                    NO EMAIL SENT
                  </span>
                )}
              </div>
              <h1
                className="m-0 font-display"
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 300,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                }}
              >
                <span className="text-fg-1">{b.contact_name}</span>
                {" — "}
                <span className="text-fg-2">{serviceLabel.toLowerCase()}</span>
              </h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={`tel:${b.contact_phone.replace(/[^0-9+]/g, "")}`}
                className="btn btn--ghost btn--sm"
              >
                <Phone size={14} strokeWidth={1.5} />
                Call
              </a>
              <a href={mailtoHref} className="btn btn--ghost btn--sm">
                <Mail size={14} strokeWidth={1.5} />
                Email
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div
                style={{
                  padding: "8px 24px",
                  background: "var(--color-elevated)",
                  border: "1px solid var(--color-hairline)",
                  borderRadius: 6,
                }}
              >
                <Field label="Service">{serviceLabel}</Field>
                <Field label="Preferred date">
                  {formatDate(b.preferred_date)}
                </Field>
                <Field label="Time window">
                  {TIME_WINDOW_LABEL[b.preferred_time_window]}
                </Field>
                <Field label="Vehicle">{vehicle}</Field>
                {b.vehicle_notes && (
                  <Field label="Trim / notes">{b.vehicle_notes}</Field>
                )}
                <Field label="Customer">{b.contact_name}</Field>
                <Field label="Phone">
                  <a
                    href={`tel:${b.contact_phone.replace(/[^0-9+]/g, "")}`}
                    className="text-fg-1 hover:text-chrome transition-colors"
                  >
                    {b.contact_phone}
                  </a>
                </Field>
                <Field label="Email">
                  <a
                    href={mailtoHref}
                    className="text-fg-1 hover:text-chrome transition-colors break-all"
                  >
                    {b.contact_email}
                  </a>
                </Field>
                {b.notes && (
                  <Field label="Notes">
                    <span style={{ whiteSpace: "pre-wrap" }}>{b.notes}</span>
                  </Field>
                )}
                <div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-6 py-4"
                  style={{ borderBottom: "none" }}
                >
                  <span className="meta" style={{ fontSize: 11 }}>
                    SUBMITTED
                  </span>
                  <div
                    className="sm:col-span-2 text-fg-2"
                    style={{ fontSize: 14 }}
                  >
                    {formatTimestamp(b.created_at)}
                    {b.email_sent_at && (
                      <> · email delivered {formatTimestamp(b.email_sent_at)}</>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <aside>
              <div
                style={{
                  padding: 24,
                  background: "var(--color-elevated)",
                  border: "1px solid var(--color-hairline)",
                  borderRadius: 6,
                }}
              >
                <span className="eyebrow block mb-4">UPDATE STATUS</span>
                <div className="flex flex-col gap-2">
                  {STATUS_ACTIONS.map((a) => {
                    const isCurrent = b.status === a.status;
                    return (
                      <form
                        key={a.status}
                        action={updateBookingStatus}
                      >
                        <input type="hidden" name="id" value={b.id} />
                        <input
                          type="hidden"
                          name="status"
                          value={a.status}
                        />
                        <button
                          type="submit"
                          disabled={isCurrent}
                          className={
                            a.variant === "primary"
                              ? "btn btn--primary"
                              : "btn btn--ghost"
                          }
                          style={{
                            width: "100%",
                            justifyContent: "center",
                            opacity: isCurrent ? 0.4 : 1,
                            cursor: isCurrent ? "default" : "pointer",
                            ...(a.variant === "danger"
                              ? {
                                  borderColor: "var(--color-danger)",
                                  color: "var(--color-danger)",
                                  background: "transparent",
                                }
                              : {}),
                          }}
                        >
                          {isCurrent ? `Already ${a.label.toLowerCase()}` : a.label}
                        </button>
                      </form>
                    );
                  })}
                </div>
                <p
                  className="m-0 mt-4 text-fg-3"
                  style={{ fontSize: 12, lineHeight: 1.5 }}
                >
                  Status updates apply immediately. The customer is not
                  emailed yet — call or email them directly until that flow
                  is built.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
