import { Star, ArrowUpRight } from "lucide-react";
import { getReviews } from "@/lib/content/reviews-data";
import type { Review } from "@/lib/content/reviews-schema";
import {
  REVIEWS_LISTING_URL,
  MIN_TEXT_FOR_CARDS,
  MIN_TOTAL_FOR_RATING,
} from "@/lib/content/reviews-config";

// Four-colour Google "G" — signals the reviews are real and sourced from Google.
function GoogleG({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

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
    .filter(Boolean)
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
      {initials || "G"}
    </div>
  );
}

function relativeTime(iso: string | null): string | null {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;
  const diff = Date.now() - then;
  const day = 86_400_000;
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const years = Math.floor(diff / (day * 365));
  if (years >= 1) return rtf.format(-years, "year");
  const months = Math.floor(diff / (day * 30));
  if (months >= 1) return rtf.format(-months, "month");
  const weeks = Math.floor(diff / (day * 7));
  if (weeks >= 1) return rtf.format(-weeks, "week");
  const days = Math.max(0, Math.floor(diff / day));
  return rtf.format(-days, "day");
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
  const when = relativeTime(r.publishedAt);
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
      <div className="flex items-center justify-between">
        <Stars n={r.rating} size={featured ? 16 : 13} />
        <GoogleG size={featured ? 18 : 15} />
      </div>
      <p
        className={featured ? "m-0 text-fg-1 font-display" : "m-0 text-fg-1"}
        style={{
          fontSize: featured ? "clamp(20px, 2.4vw, 26px)" : 15,
          lineHeight: featured ? 1.35 : 1.6,
          letterSpacing: featured ? "-0.015em" : "-0.005em",
          fontWeight: 400,
          flex: 1,
        }}
      >
        {r.text}
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
          <span className="text-fg-3" style={{ fontSize: 12, lineHeight: 1.4 }}>
            {when ? `${when} · via Google` : "via Google"}
          </span>
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  averageRating,
  totalCount,
  showRating,
}: {
  averageRating: number;
  totalCount: number;
  showRating: boolean;
}) {
  return (
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
          <em className="not-italic" style={{ color: "var(--color-accent)", opacity: 0.95 }}>
            say.
          </em>
        </h2>
      </div>

      {showRating && (
        <div className="flex flex-col gap-2 items-start lg:items-end">
          <div className="flex items-center gap-3">
            <span
              className="font-display text-fg-1"
              style={{ fontSize: 44, fontWeight: 300, letterSpacing: "-0.025em", lineHeight: 1 }}
            >
              {averageRating.toFixed(1)}
            </span>
            <Stars n={Math.round(averageRating)} size={18} />
          </div>
          <a
            href={REVIEWS_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-2 hover:text-chrome transition-colors inline-flex items-center gap-1.5"
            style={{ fontSize: 15, lineHeight: 1.5 }}
          >
            <GoogleG size={15} />
            Based on {totalCount} review{totalCount === 1 ? "" : "s"} on Google
            <ArrowUpRight size={13} strokeWidth={1.5} />
          </a>
        </div>
      )}
    </div>
  );
}

// Newly-opened / not-enough-reviews state: honest invite instead of fake cards.
function EarlyDays() {
  return (
    <div
      className="card flex flex-col items-start"
      style={{
        background: "var(--color-elevated)",
        padding: "clamp(28px, 4vw, 48px)",
        gap: 18,
        maxWidth: 720,
      }}
    >
      <div className="flex items-center gap-2">
        <GoogleG size={20} />
        <span className="eyebrow" style={{ margin: 0 }}>
          Reviews on Google
        </span>
      </div>
      <p
        className="m-0 font-display text-fg-1"
        style={{
          fontSize: "clamp(20px, 2.6vw, 28px)",
          fontWeight: 400,
          letterSpacing: "-0.015em",
          lineHeight: 1.3,
        }}
      >
        We&apos;re a new studio, and our first reviews are coming in.
      </p>
      <p className="m-0 text-fg-2" style={{ fontSize: 15, lineHeight: 1.6 }}>
        Every review on our page is a real customer on Google — unedited, never
        paid for. If we&apos;ve detailed your car, a few words would mean a lot.
      </p>
      <div className="flex flex-wrap gap-3" style={{ marginTop: 4 }}>
        <a
          href={REVIEWS_LISTING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
        >
          Review us on Google
          <ArrowUpRight size={16} strokeWidth={1.5} />
        </a>
        <a
          href={REVIEWS_LISTING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--ghost"
        >
          See our Google listing
        </a>
      </div>
    </div>
  );
}

export async function Reviews() {
  const { reviews, totalCount, textCount, averageRating } = await getReviews();

  const textReviews = reviews
    .filter((r): r is Review & { text: string } => Boolean(r.text))
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, 4);

  const showCards = textReviews.length >= MIN_TEXT_FOR_CARDS;
  const showRating = totalCount >= MIN_TOTAL_FOR_RATING;

  // Featured + supporting spans, adapting to however many real reviews exist.
  const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-6", "md:col-span-6"];

  return (
    <section id="reviews" className="section">
      <div className="container-x">
        <SectionHeading
          averageRating={averageRating}
          totalCount={totalCount}
          showRating={showRating}
        />

        {showCards ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {textReviews.map((r, i) => (
                <ReviewCard
                  key={r.id}
                  r={r}
                  className={spans[i] ?? "md:col-span-6"}
                  featured={i === 0}
                />
              ))}
            </div>
            {totalCount > textReviews.length && (
              <a
                href={REVIEWS_LISTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-fg-2 hover:text-chrome transition-colors"
                style={{ marginTop: 20, fontSize: 14 }}
              >
                Read all {totalCount} reviews on Google
                <ArrowUpRight size={14} strokeWidth={1.5} />
              </a>
            )}
          </>
        ) : (
          <EarlyDays />
        )}
      </div>
    </section>
  );
}
