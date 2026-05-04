import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BOOKING_HREF } from "@/lib/content/contact";

export function CtaBand() {
  return (
    <section
      className="section"
      style={{ paddingTop: 80, paddingBottom: 96 }}
    >
      <div className="container-x">
        <div
          className="flex flex-col gap-10 lg:grid lg:gap-12 lg:items-end"
          style={{
            gridTemplateColumns: "1fr auto",
            paddingTop: 48,
            borderTop: "1px solid var(--color-hairline)",
          }}
        >
          <div>
            <span className="eyebrow block mb-6">READY WHEN YOU ARE</span>
            <h2
              className="m-0 font-display"
              style={{
                fontSize: "clamp(36px, 7vw, 80px)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 0.96,
              }}
            >
              <span className="text-fg-1">Book service.</span>
              <br />
              <em
                className="not-italic"
                style={{ color: "var(--color-accent)", opacity: 0.9 }}
              >
                We confirm within the hour.
              </em>
            </h2>
          </div>
          <Link
            href={BOOKING_HREF}
            className="btn btn--primary btn--lg self-start lg:self-auto"
          >
            Book service
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
