import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BOOKING_HREF } from "@/lib/content/contact";

export function CtaBand() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "clamp(380px, 48vh, 520px)" }}
    >
      <Image
        src="/photos/paint-correction/hero.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(95deg, rgba(15,20,24,0.94) 0%, rgba(15,20,24,0.82) 38%, rgba(15,20,24,0.42) 78%, rgba(15,20,24,0.18) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,20,24,0.35) 0%, rgba(15,20,24,0) 30%, rgba(15,20,24,0.35) 100%)",
        }}
      />

      <div
        className="container-x relative flex flex-col gap-10"
        style={{
          paddingTop: "clamp(80px, 10vw, 120px)",
          paddingBottom: "clamp(80px, 10vw, 120px)",
        }}
      >
        <span className="eyebrow" style={{ color: "var(--color-accent)" }}>
          READY WHEN YOU ARE
        </span>
        <h2
          className="m-0 font-display"
          style={{
            fontSize: "clamp(36px, 7vw, 80px)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 0.96,
            maxWidth: 800,
          }}
        >
          <span className="text-fg-1">Book service.</span>
          <br />
          <em style={{ color: "var(--color-accent)", opacity: 0.95 }}>
            We confirm within the hour.
          </em>
        </h2>
        <Link
          href={BOOKING_HREF}
          className="btn btn--primary btn--lg self-start"
        >
          Book service
          <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
      </div>
    </section>
  );
}
