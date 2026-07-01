import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { PACKAGES, PACKAGE_ADDONS } from "@/lib/content/packages";
import { BOOKING_HREF } from "@/lib/content/contact";

export function PackagesPricing() {
  return (
    <section aria-label="Detailing packages and pricing">
      {/* Dark photo band — a real shop/car photo drops in here later */}
      <div className="pkg-band">
        <div className="container-x">
          <Link href="/#services" className="pkg-band__crumb reveal">
            <ArrowLeft size={14} strokeWidth={1.5} /> All services
          </Link>
          <div className="flex flex-col items-center text-center">
            <span
              className="eyebrow pkg-band__eyebrow reveal reveal-1"
              style={{ display: "block", marginTop: 32 }}
            >
              Our packages
            </span>
            <h1
              className="pkg-band__title reveal reveal-2"
              style={{ marginTop: 16, maxWidth: 760 }}
            >
              Detailing packages &amp; pricing
            </h1>
            <p
              className="pkg-band__sub reveal reveal-3"
              style={{ marginTop: 18, maxWidth: "52ch" }}
            >
              Four levels of clean, every detail done by our experts in Saskatoon —
              documented before &amp; after and quoted by vehicle size.
            </p>
          </div>
        </div>
      </div>

      {/* Cards overlap up into the band */}
      <div className="container-x">
        <div className="pkg-cards">
          {PACKAGES.map((p, i) => (
            <div key={p.slug} className={`reveal reveal-${i + 1}`}>
              <article
                className={`pkg-card pkg-card--${p.accent} ${
                  p.mostPopular ? "pkg-card--pop" : ""
                }`}
              >
                {p.mostPopular && <span className="pkg-pill">Most Popular</span>}
                <span className={`pkg-chip pkg-chip--${p.accent}`}>{p.tier}</span>
                <h2 className="pkg-name">{p.name}</h2>
                <p className="pkg-sub">{p.sub}</p>

                <div className="pkg-price">
                  <span className="pkg-price__amt">{p.price}</span>
                  <span className="pkg-price__per">{p.priceNote}</span>
                </div>
                <div className="pkg-sizes">{p.sizes}</div>

                <Link
                  href={`${BOOKING_HREF}?service=detailing-packages&package=${p.slug}`}
                  className={`btn btn--block ${
                    p.mostPopular ? "btn--primary" : "btn--ghost"
                  }`}
                  style={{ marginTop: 18 }}
                >
                  Book {p.name}
                </Link>

                <div className="eyebrow eyebrow--muted pkg-feat-h">
                  {p.featuresHeading}
                </div>
                <ul className="pkg-feats">
                  {p.features.map((f) => (
                    <li key={f}>
                      <span className="pkg-tick">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="pkg-ideal">
                  <b>{p.idealLabel}</b> — {p.ideal}
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div
          className="text-center"
          style={{ maxWidth: 560, margin: "72px auto 24px" }}
        >
          <span className="eyebrow" style={{ display: "block", marginBottom: 10 }}>
            Customize your detail
          </span>
          <h2 className="h3">Optional add-ons</h2>
          <p className="body-lg" style={{ marginTop: 10, fontSize: 15 }}>
            Enhance any package — just mention them when you book.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PACKAGE_ADDONS.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.name} className="card pkg-addon">
                <div className="pkg-addon__ic">
                  <Icon size={18} strokeWidth={1.6} />
                </div>
                <h3
                  className="font-display"
                  style={{ fontSize: 16, fontWeight: 500 }}
                >
                  {a.name}
                </h3>
                <p
                  style={{
                    color: "var(--color-fg-2)",
                    fontSize: 12.5,
                    marginTop: 8,
                    minHeight: 52,
                  }}
                >
                  {a.desc}
                </p>
                <div
                  className={`pkg-addon__price ${
                    a.ask ? "pkg-addon__price--ask" : ""
                  }`}
                >
                  {a.price}
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison table placeholder */}
        <div
          className="text-center"
          style={{ maxWidth: 560, margin: "72px auto 24px" }}
        >
          <span className="eyebrow" style={{ display: "block", marginBottom: 10 }}>
            Still deciding?
          </span>
          <h2 className="h3">Which package is right for you?</h2>
          <p className="body-lg" style={{ marginTop: 10, fontSize: 15 }}>
            A side-by-side look at exactly what&apos;s covered in each package.
          </p>
        </div>
        <div className="pkg-ph" style={{ marginBottom: "var(--section-y)" }}>
          <span>Comparison table — coming soon</span>
        </div>
      </div>
    </section>
  );
}
