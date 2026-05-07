import { Star } from "lucide-react";
import {
  HERO_REVIEW,
  SUPPORTING_REVIEWS,
  REVIEWS_META,
  type Review,
} from "@/lib/content/reviews";

function Stars({ n = 5, size = 14 }: { n?: number; size?: number }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${n} out of 5 stars`}
      style={{ color: "var(--color-accent)" }}
    >
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={size} strokeWidth={1.5} fill="currentColor" />
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className="flex items-center justify-center font-display shrink-0"
      style={{
        width: 38,
        height: 38,
        borderRadius: "50%",
        background: "var(--color-accent-soft)",
        color: "var(--color-accent)",
        fontSize: 14,
        fontWeight: 500,
        letterSpacing: "0.02em",
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}

function ReviewCard({
  r,
  className,
  featured,
}: {
  r: Review;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`card flex flex-col ${className ?? ""}`}
      style={{
        padding: featured ? "clamp(28px, 3.5vw, 40px)" : "clamp(22px, 3vw, 28px)",
        background: "var(--color-elevated)",
        gap: featured ? 20 : 16,
        minHeight: featured ? 280 : 220,
      }}
    >
      <Stars n={r.stars} size={featured ? 16 : 13} />
      <p
        className={featured ? "m-0 text-fg-1 font-display" : "m-0 text-fg-1"}
        style={{
          fontSize: featured ? "clamp(20px, 2.4vw, 26px)" : 15,
          lineHeight: featured ? 1.35 : 1.6,
          letterSpacing: featured ? "-0.015em" : "-0.005em",
          fontWeight: featured ? 400 : 400,
          flex: 1,
        }}
      >
        {r.body}
      </p>
      <div
        className="flex items-center gap-3 pt-4 mt-auto"
        style={{ borderTop: "1px solid var(--color-hairline)" }}
      >
        <Avatar name={r.author} />
        <div className="flex flex-col">
          <span
            className="text-fg-1"
            style={{ fontSize: 14, fontWeight: 500, letterSpacing: "-0.005em" }}
          >
            {r.author}
          </span>
          <span
            className="text-fg-3"
            style={{ fontSize: 12, lineHeight: 1.4 }}
          >
            {r.service}
            {r.date ? ` · ${r.date}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="section">
      <div className="container-x">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-10 lg:gap-12 mb-12 sm:mb-14">
          <div className="max-w-150">
            <span className="eyebrow block mb-5">GOOGLE REVIEWS</span>
            <h2
              className="m-0 font-display"
              style={{
                fontSize: "clamp(36px, 6.5vw, 64px)",
                fontWeight: 300,
                letterSpacing: "-0.025em",
                lineHeight: 1.02,
              }}
            >
              <span className="text-fg-2">What customers</span>{" "}
              <em
                className="not-italic"
                style={{ color: "var(--color-accent)", opacity: 0.95 }}
              >
                say.
              </em>
            </h2>
          </div>

          <div className="flex flex-col gap-2 items-start lg:items-end">
            <div className="flex items-center gap-3">
              <span
                className="font-display text-fg-1"
                style={{
                  fontSize: 44,
                  fontWeight: 300,
                  letterSpacing: "-0.025em",
                  lineHeight: 1,
                }}
              >
                {REVIEWS_META.averageStar}
              </span>
              <Stars n={5} size={18} />
            </div>
            <span
              className="text-fg-2"
              style={{ fontSize: 15, lineHeight: 1.5 }}
            >
              Based on {REVIEWS_META.count} on Google
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <ReviewCard r={HERO_REVIEW} className="md:col-span-7" featured />
          <ReviewCard r={SUPPORTING_REVIEWS[1]} className="md:col-span-5" />
          <ReviewCard r={SUPPORTING_REVIEWS[0]} className="md:col-span-6" />
          <ReviewCard r={SUPPORTING_REVIEWS[2]} className="md:col-span-6" />
        </div>
      </div>
    </section>
  );
}
