import Link from "next/link";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { type Service } from "@/lib/content/services";
import { BOOKING_HREF } from "@/lib/content/contact";

export function ServiceDetailPage({ service }: { service: Service }) {
  const Icon = service.icon;
  const headline = service.hero.headline;
  const commaIdx = headline.indexOf(",");
  const headlineFirst = commaIdx >= 0 ? headline.slice(0, commaIdx + 1) : headline;
  const headlineSecond = commaIdx >= 0 ? headline.slice(commaIdx + 1).trim() : null;

  return (
    <main>
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: 144, paddingBottom: 96 }}
      >
        <div className="container-x">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-fg-2 hover:text-chrome transition-colors mb-12"
            style={{ fontSize: 13 }}
          >
            <ArrowLeft size={14} strokeWidth={1.5} /> All services
          </Link>

          <div className="max-w-230 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <Icon size={28} strokeWidth={1.5} className="text-chrome" />
              <span className="eyebrow">{service.hero.eyebrow}</span>
            </div>
            <h1
              className="m-0 font-display"
              style={{
                fontSize: "clamp(48px, 7vw, 88px)",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                lineHeight: 0.98,
              }}
            >
              {headlineSecond ? (
                <>
                  <span className="text-fg-1">{headlineFirst}</span>{" "}
                  <em style={{ color: "var(--color-accent)", opacity: 0.9 }}>
                    {headlineSecond}
                  </em>
                </>
              ) : (
                <span className="text-fg-1">{headlineFirst}</span>
              )}
            </h1>
            <p className="m-0 body-lg" style={{ maxWidth: 640 }}>
              {service.hero.sub}
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link
                href={`${BOOKING_HREF}?service=${service.slug}`}
                className="btn btn--primary"
              >
                Book {service.shortTitle.toLowerCase()}
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
              <Link href="/#services" className="btn btn--ghost">
                Other services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {service.packages && service.packages.length > 0 && (
        <section
          className="section"
          style={{ paddingTop: 64, paddingBottom: 96 }}
        >
          <div className="container-x">
            <span className="eyebrow block mb-5">PACKAGES</span>
            <h2
              className="m-0 font-display mb-12"
              style={{
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 300,
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
              }}
            >
              <span className="text-fg-2">Pick your level.</span>{" "}
              <span className="text-fg-1">All quoted by vehicle.</span>
            </h2>

            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              style={{
                gap: 1,
                background: "var(--color-hairline)",
                border: "1px solid var(--color-hairline)",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              {service.packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="flex flex-col gap-4"
                  style={{
                    background: "var(--color-elevated)",
                    padding: 28,
                    minHeight: 280,
                  }}
                >
                  <div className="flex items-baseline justify-between">
                    <h3
                      className="m-0 font-display"
                      style={{
                        fontSize: 22,
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {pkg.name}.
                    </h3>
                    <span className="meta">{pkg.duration.toUpperCase()}</span>
                  </div>
                  <span
                    className="font-display text-fg-1"
                    style={{
                      fontSize: 36,
                      fontWeight: 300,
                      letterSpacing: "-0.025em",
                      lineHeight: 1,
                    }}
                  >
                    {pkg.price}
                  </span>
                  <p
                    className="m-0 text-fg-2 mt-auto"
                    style={{ fontSize: 14, lineHeight: 1.55 }}
                  >
                    {pkg.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {service.details && service.details.length > 0 && (
        <section
          className="section"
          style={{
            background: "var(--color-surface-deep)",
            paddingTop: 96,
            paddingBottom: 96,
          }}
        >
          <div className="container-x">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
              <div>
                <span className="eyebrow block mb-5">WHAT&apos;S INCLUDED</span>
                <h2
                  className="m-0 font-display"
                  style={{
                    fontSize: "clamp(28px, 3.5vw, 40px)",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                  }}
                >
                  Process, in order.
                </h2>
              </div>
              <ul className="list-none m-0 p-0 flex flex-col gap-4">
                {service.details.map((d, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 pb-4"
                    style={{ borderBottom: "1px solid var(--color-hairline)" }}
                  >
                    <Check
                      size={18}
                      strokeWidth={1.5}
                      className="text-chrome mt-0.5 shrink-0"
                    />
                    <span
                      className="text-fg-1"
                      style={{ fontSize: 15, lineHeight: 1.55 }}
                    >
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {service.faq && service.faq.length > 0 && (
        <section className="section" style={{ paddingTop: 96, paddingBottom: 96 }}>
          <div className="container-x">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              <div>
                <span className="eyebrow block mb-5">FAQ</span>
                <h2
                  className="m-0 font-display"
                  style={{
                    fontSize: "clamp(28px, 3.5vw, 40px)",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                  }}
                >
                  Common <span className="text-fg-2">questions.</span>
                </h2>
              </div>
              <div className="lg:col-span-2 flex flex-col">
                {service.faq.map((item, i) => (
                  <div
                    key={i}
                    className="py-6"
                    style={{ borderBottom: "1px solid var(--color-hairline)" }}
                  >
                    <h3
                      className="m-0 font-body text-fg-1"
                      style={{
                        fontSize: 18,
                        fontWeight: 500,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item.q}
                    </h3>
                    <p
                      className="m-0 mt-3 text-fg-2"
                      style={{ fontSize: 15, lineHeight: 1.6 }}
                    >
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
