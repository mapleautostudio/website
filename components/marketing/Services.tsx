import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { HOMEPAGE_SERVICE_CARDS, type Service } from "@/lib/content/services";

function ServiceCard({ s, isFeatured }: { s: Service; isFeatured: boolean }) {
  const Icon = s.icon;
  const colSpanClass =
    s.span === 12
      ? "md:col-span-12"
      : s.span === 6
      ? "md:col-span-6"
      : "md:col-span-4";

  return (
    <Link
      href={`/services/${s.slug}`}
      className={`card card--hover group relative flex flex-col gap-4 col-span-12 overflow-hidden ${colSpanClass}`}
      style={{
        background: isFeatured
          ? "var(--color-elevated)"
          : "var(--color-surface-deep)",
        minHeight: 240,
        padding: "clamp(20px, 4vw, 28px)",
      }}
    >
      {s.heroImage && (
        <>
          <Image
            src={s.heroImage.src}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{
              objectFit: "cover",
              objectPosition: s.heroImage.objectPosition ?? "center",
            }}
            className="opacity-[0.10] md:opacity-0 md:group-hover:opacity-[0.22] transition-opacity duration-500 ease-out pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,20,24,0.35) 0%, rgba(15,20,24,0.0) 45%, rgba(15,20,24,0.65) 100%)",
              opacity: 0,
              transition: "opacity 0.5s ease-out",
            }}
          />
        </>
      )}

      <div className="relative flex items-start justify-between">
        <Icon size={26} strokeWidth={1.5} className="text-chrome" />
        <span className="meta text-fg-3">
          {s.num}
          {isFeatured && (
            <span className="ml-2" style={{ color: "var(--color-fg-2)" }}>
              · FEATURED
            </span>
          )}
        </span>
      </div>

      <div className="relative flex-1 flex flex-col gap-3">
        <h3
          className="m-0 font-display"
          style={{
            fontSize: "clamp(22px, 4vw, 28px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
          }}
        >
          {s.title}
        </h3>
        <p
          className="m-0 text-fg-2"
          style={{
            fontSize: 15,
            lineHeight: 1.55,
            maxWidth: s.span === 12 ? 600 : "none",
          }}
        >
          {s.cardDescription}
        </p>
      </div>

      <div
        className="relative flex items-center justify-between pt-4 mt-auto gap-2"
        style={{ borderTop: "1px solid var(--color-hairline)" }}
      >
        <span className="meta text-fg-2 truncate">{s.cardFooter.from}</span>
        <span className="meta inline-flex items-center gap-2 text-fg-2 shrink-0">
          {s.cardFooter.duration}
          <ArrowRight size={12} strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
}

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container-x">
        <div
          className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 sm:gap-12"
          style={{ marginBottom: 48 }}
        >
          <div className="max-w-150">
            <span className="eyebrow block mb-5">WHAT WE DO</span>
            <h2
              className="m-0 font-display"
              style={{
                fontSize: "clamp(36px, 6.5vw, 72px)",
                fontWeight: 300,
                letterSpacing: "-0.025em",
                lineHeight: 1,
              }}
            >
              <span className="text-fg-1">Six services.</span>
              <br />
              <em
                className="not-italic"
                style={{ color: "var(--color-accent)", opacity: 0.9 }}
              >
                Done well.
              </em>
            </h2>
          </div>
          <Link
            href="/services/detailing-packages"
            className="inline-flex items-center gap-2 text-fg-2 hover:text-chrome transition-colors self-start sm:self-auto"
            style={{ fontSize: 14 }}
          >
            All services <ArrowUpRight size={14} strokeWidth={1.5} />
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {HOMEPAGE_SERVICE_CARDS.map((s, i) => (
            <ServiceCard key={s.slug} s={s} isFeatured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
