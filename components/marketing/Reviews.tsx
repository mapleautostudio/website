import { Star } from "lucide-react";
import {
  HERO_REVIEW,
  SUPPORTING_REVIEWS,
  REVIEWS_META,
  type Review,
} from "@/lib/content/reviews";

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${n} out of 5 stars`}
      style={{ color: "var(--color-accent)" }}
    >
      {Array.from({ length: n }).map((_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={1.5}
          fill="currentColor"
        />
      ))}
    </div>
  );
}

function ReviewMeta({ r }: { r: Review }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-fg-1" style={{ fontSize: 14, fontWeight: 500 }}>
        {r.author}
      </span>
      <span className="meta">
        {r.vehicle} · {r.service.toUpperCase()}
        {r.date ? ` · ${r.date}` : ""}
      </span>
    </div>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="section">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 sm:gap-8 mb-12 sm:mb-16">
          <div className="max-w-190">
            <span className="eyebrow block mb-5">WHAT CUSTOMERS SAID</span>
            <h2
              className="m-0 font-display"
              style={{
                fontSize: "clamp(32px, 5.5vw, 56px)",
                fontWeight: 300,
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
              }}
            >
              <span className="text-fg-1">From the</span>{" "}
              <em
                className="not-italic"
                style={{ color: "var(--color-accent)", opacity: 0.9 }}
              >
                service log.
              </em>
            </h2>
          </div>
          <span className="meta">
            {REVIEWS_META.count.toUpperCase()} ·{" "}
            {REVIEWS_META.source.toUpperCase()} · VERIFIED
          </span>
        </div>

        <div
          className="card mb-4"
          style={{
            padding: "clamp(24px, 5vw, 48px)",
            background: "var(--color-elevated)",
          }}
        >
          <Stars />
          <blockquote
            className="m-0 mt-6 font-display text-fg-1"
            style={{
              fontSize: "clamp(20px, 3vw, 30px)",
              fontWeight: 400,
              lineHeight: 1.35,
              letterSpacing: "-0.015em",
              maxWidth: 920,
            }}
          >
            <span className="text-fg-3">&quot;</span>
            {HERO_REVIEW.body}
          </blockquote>
          <hr
            className="my-6"
            style={{
              border: 0,
              borderTop: "1px solid var(--color-hairline)",
            }}
          />
          <ReviewMeta r={HERO_REVIEW} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SUPPORTING_REVIEWS.map((r, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: "clamp(20px, 4vw, 28px)",
                background: "var(--color-elevated)",
              }}
            >
              <Stars />
              <p
                className="m-0 mt-4 text-fg-1"
                style={{ fontSize: 14, lineHeight: 1.55 }}
              >
                {r.body}
              </p>
              <hr
                className="my-5"
                style={{
                  border: 0,
                  borderTop: "1px solid var(--color-hairline)",
                }}
              />
              <ReviewMeta r={r} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
