import Link from "next/link";
import { ArrowRight, AlertCircle } from "lucide-react";
import { requireAdmin } from "@/lib/admin/guard";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SERVICES_BY_SLUG } from "@/lib/content/services";
import type { BookingRow, BookingStatus } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

const STATUS_FILTERS: Array<{ value: "all" | BookingStatus; label: string }> = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "confirmed", label: "Confirmed" },
  { value: "declined", label: "Declined" },
  { value: "completed", label: "Completed" },
  { value: "no_show", label: "No-show" },
];

const TIME_WINDOW_LABEL: Record<BookingRow["preferred_time_window"], string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  flexible: "Flexible",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTimestamp(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-CA", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { user } = await requireAdmin();
  const { status } = await searchParams;
  const activeFilter: "all" | BookingStatus =
    status === "new" ||
    status === "confirmed" ||
    status === "declined" ||
    status === "completed" ||
    status === "no_show"
      ? status
      : "all";

  const supabase = getSupabaseAdmin();

  let query = supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (activeFilter !== "all") {
    query = query.eq("status", activeFilter);
  }

  const { data: bookings, error } = await query;

  return (
    <>
      <AdminHeader email={user.email ?? undefined} />

      <main className="flex-1">
        <div className="container-x" style={{ paddingBlock: 48 }}>
          <div className="flex flex-col gap-2 mb-10">
            <span className="eyebrow">BOOKINGS</span>
            <h1
              className="m-0 font-display"
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 300,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
              }}
            >
              <span className="text-fg-1">All requests,</span>{" "}
              <span className="text-fg-2">latest first.</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {STATUS_FILTERS.map((f) => {
              const isActive = f.value === activeFilter;
              const href = f.value === "all" ? "/admin" : `/admin?status=${f.value}`;
              return (
                <Link
                  key={f.value}
                  href={href}
                  className="inline-flex items-center transition-colors"
                  style={{
                    padding: "8px 14px",
                    borderRadius: 4,
                    border: "1px solid",
                    borderColor: isActive
                      ? "var(--color-accent)"
                      : "var(--color-hairline)",
                    background: isActive
                      ? "var(--color-accent-soft)"
                      : "transparent",
                    color: isActive
                      ? "var(--color-accent)"
                      : "var(--color-fg-2)",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {f.label}
                </Link>
              );
            })}
          </div>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 mb-8"
              style={{
                padding: 16,
                border: "1px solid var(--color-danger)",
                borderRadius: 6,
                background: "rgba(201, 127, 127, 0.08)",
              }}
            >
              <AlertCircle
                size={18}
                strokeWidth={1.5}
                style={{ color: "var(--color-danger)", marginTop: 2 }}
              />
              <span style={{ fontSize: 14, color: "var(--color-fg-1)" }}>
                Couldn&apos;t load bookings: {error.message}
              </span>
            </div>
          )}

          {!error && (!bookings || bookings.length === 0) && (
            <div
              className="text-center"
              style={{
                padding: "64px 24px",
                border: "1px dashed var(--color-hairline)",
                borderRadius: 6,
              }}
            >
              <p className="m-0 text-fg-2" style={{ fontSize: 15 }}>
                No bookings{activeFilter === "all" ? " yet" : " in this filter"}.
              </p>
            </div>
          )}

          {bookings && bookings.length > 0 && (
            <div
              className="flex flex-col"
              style={{
                border: "1px solid var(--color-hairline)",
                borderRadius: 6,
                overflow: "hidden",
                background: "var(--color-elevated)",
              }}
            >
              {bookings.map((b: BookingRow, i: number) => {
                const serviceLabel =
                  SERVICES_BY_SLUG[b.service]?.shortTitle ?? b.service;
                const emailMissing = b.email_sent_at === null;
                return (
                  <Link
                    key={b.id}
                    href={`/admin/${b.id}`}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 transition-colors hover:bg-elevated-2"
                    style={{
                      padding: "20px 24px",
                      borderTop:
                        i === 0
                          ? "none"
                          : "1px solid var(--color-hairline)",
                      alignItems: "center",
                    }}
                  >
                    <div className="md:col-span-2 flex flex-col gap-1">
                      <span
                        className="font-mono text-fg-1"
                        style={{ fontSize: 12, letterSpacing: "0.02em" }}
                      >
                        {b.reference}
                      </span>
                      <span className="meta" style={{ fontSize: 11 }}>
                        {formatTimestamp(b.created_at)}
                      </span>
                    </div>
                    <div className="md:col-span-3 flex flex-col gap-1">
                      <span
                        className="text-fg-1"
                        style={{ fontSize: 14, fontWeight: 500 }}
                      >
                        {b.contact_name}
                      </span>
                      <span className="meta" style={{ fontSize: 11 }}>
                        {b.contact_phone}
                      </span>
                    </div>
                    <div className="md:col-span-3 flex flex-col gap-1">
                      <span
                        className="text-fg-1"
                        style={{ fontSize: 14 }}
                      >
                        {b.vehicle_year} {b.vehicle_make} {b.vehicle_model}
                      </span>
                      <span className="meta" style={{ fontSize: 11 }}>
                        {serviceLabel.toUpperCase()}
                      </span>
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-1">
                      <span
                        className="text-fg-1"
                        style={{ fontSize: 14 }}
                      >
                        {formatDate(b.preferred_date)}
                      </span>
                      <span className="meta" style={{ fontSize: 11 }}>
                        {TIME_WINDOW_LABEL[b.preferred_time_window].toUpperCase()}
                      </span>
                    </div>
                    <div className="md:col-span-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={b.status} />
                        {emailMissing && (
                          <span
                            title="Email notification didn't go through"
                            aria-label="Email notification didn't go through"
                            style={{ color: "var(--color-warning)", display: "inline-flex" }}
                          >
                            <AlertCircle size={14} strokeWidth={1.5} />
                          </span>
                        )}
                      </div>
                      <ArrowRight
                        size={14}
                        strokeWidth={1.5}
                        className="text-fg-3"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
