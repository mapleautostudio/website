import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { SHOP } from "@/lib/content/contact";

export function BookingSuccess({ reference }: { reference: string }) {
  return (
    <div className="flex flex-col gap-8" style={{ maxWidth: 640 }}>
      <div
        className="inline-flex items-center justify-center"
        style={{
          width: 56,
          height: 56,
          borderRadius: 999,
          background: "var(--color-accent-soft)",
          color: "var(--color-accent)",
        }}
      >
        <Check size={26} strokeWidth={1.5} />
      </div>

      <div className="flex flex-col gap-4">
        <span className="eyebrow">REQUEST RECEIVED</span>
        <h1
          className="m-0 font-display"
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 300,
            letterSpacing: "-0.025em",
            lineHeight: 1.04,
          }}
        >
          <span className="text-fg-1">Thanks. We&apos;ll confirm</span>{" "}
          <em
            className="not-italic"
            style={{ color: "var(--color-accent)", opacity: 0.9 }}
          >
            within the hour.
          </em>
        </h1>
        <p
          className="m-0 text-fg-2"
          style={{ fontSize: 16, lineHeight: 1.6 }}
        >
          A request has been logged with the studio. Khus will review and
          reach out by phone or email to confirm the slot — or propose a
          new time if the requested window is full.
        </p>
      </div>

      <div
        className="flex flex-col gap-3"
        style={{
          padding: 20,
          border: "1px solid var(--color-hairline)",
          borderRadius: 6,
          background: "var(--color-elevated)",
        }}
      >
        <div className="flex items-baseline justify-between gap-4">
          <span className="meta">REFERENCE</span>
          <span
            className="font-mono text-fg-1"
            style={{ fontSize: 14, letterSpacing: "0.02em" }}
          >
            {reference}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="meta">QUESTIONS?</span>
          <a
            href={`tel:${SHOP.phoneTel}`}
            className="text-fg-1 hover:text-chrome transition-colors"
            style={{ fontSize: 14 }}
          >
            {SHOP.phone}
          </a>
        </div>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-fg-2 hover:text-chrome transition-colors self-start"
        style={{ fontSize: 14 }}
      >
        <ArrowLeft size={14} strokeWidth={1.5} /> Back to home
      </Link>
    </div>
  );
}
