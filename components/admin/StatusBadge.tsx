import type { BookingStatus } from "@/lib/supabase/types";

const STYLES: Record<
  BookingStatus,
  { bg: string; fg: string; label: string }
> = {
  new: {
    bg: "var(--color-accent-soft)",
    fg: "var(--color-accent)",
    label: "NEW",
  },
  confirmed: {
    bg: "rgba(111, 184, 154, 0.14)",
    fg: "var(--color-success)",
    label: "CONFIRMED",
  },
  declined: {
    bg: "rgba(201, 127, 127, 0.14)",
    fg: "var(--color-danger)",
    label: "DECLINED",
  },
  completed: {
    bg: "rgba(168, 176, 185, 0.14)",
    fg: "var(--color-fg-2)",
    label: "COMPLETED",
  },
  no_show: {
    bg: "rgba(212, 179, 106, 0.14)",
    fg: "var(--color-warning)",
    label: "NO-SHOW",
  },
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const s = STYLES[status];
  return (
    <span
      className="inline-flex items-center"
      style={{
        padding: "4px 10px",
        borderRadius: 2,
        background: s.bg,
        color: s.fg,
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "0.16em",
        whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </span>
  );
}
