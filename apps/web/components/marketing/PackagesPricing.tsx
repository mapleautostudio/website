import Link from "next/link";
import { ArrowLeft, Check, X, Plus } from "lucide-react";
import { BOOKING_HREF } from "@/lib/content/contact";
import { getPublishedPricing } from "@/lib/content/pricing";
import {
  cardPrice,
  cardSizes,
  cardFeatures,
  cellState,
  addonIsAsk,
} from "@/lib/content/pricing-schema";

export async function PackagesPricing() {
  const config = await getPublishedPricing();
  const { meta, packages, services, prices, addons } = config;

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
              {meta.title}
            </h1>
            <p
              className="pkg-band__sub reveal reveal-3"
              style={{ marginTop: 18, maxWidth: "52ch" }}
            >
              {meta.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Cards overlap up into the band */}
      <div className="container-x">
        <div className="pkg-cards">
          {packages.map((p, i) => {
            const feats = cardFeatures(config, i);
            return (
              <div key={p.id} className={`reveal reveal-${i + 1}`}>
                <article
                  className={`pkg-card pkg-card--${p.accent} ${
                    p.mostPopular ? "pkg-card--pop" : ""
                  }`}
                >
                  {p.mostPopular && <span className="pkg-pill">Most Popular</span>}
                  <span className={`pkg-chip pkg-chip--${p.accent}`}>
                    {p.tier}
                  </span>
                  <h2 className="pkg-name">{p.name}</h2>
                  <p className="pkg-sub">{p.tagline}</p>

                  <div className="pkg-price">
                    <span className="pkg-price__amt">{cardPrice(config, i)}</span>
                    <span className="pkg-price__per">{p.priceNote}</span>
                  </div>
                  <div className="pkg-sizes">{cardSizes(config, i)}</div>

                  <Link
                    href={`${BOOKING_HREF}?service=detailing-packages&package=${p.id}`}
                    className={`btn btn--block ${
                      p.mostPopular ? "btn--primary" : "btn--ghost"
                    }`}
                    style={{ marginTop: 18 }}
                  >
                    Book {p.name}
                  </Link>

                  <div className="eyebrow eyebrow--muted pkg-feat-h">
                    {feats.heading}
                  </div>
                  <ul className="pkg-feats">
                    {feats.items.map((f) => (
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
            );
          })}
        </div>

        {/* Add-ons */}
        {addons.length > 0 && (
          <>
            <div
              className="text-center"
              style={{ maxWidth: 560, margin: "72px auto 24px" }}
            >
              <span
                className="eyebrow"
                style={{ display: "block", marginBottom: 10 }}
              >
                Customize your detail
              </span>
              <h2 className="h3">Optional add-ons</h2>
              <p className="body-lg" style={{ marginTop: 10, fontSize: 15 }}>
                Enhance any package — just mention them when you book.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {addons.map((a) => (
                <div key={a.id} className="card pkg-addon">
                  <div className="pkg-addon__ic">
                    <Plus size={18} strokeWidth={1.6} />
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
                      addonIsAsk(a.price) ? "pkg-addon__price--ask" : ""
                    }`}
                  >
                    {a.price}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Comparison matrix */}
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

        <div
          className="pkg-matrix-wrap"
          style={{ marginBottom: "var(--section-y)" }}
        >
          <table className="pkg-matrix">
            <caption className="sr-only">
              Detailing package comparison by service and vehicle size
            </caption>
            <thead>
              <tr>
                <th className="pkg-matrix__svc" scope="col">
                  <span className="eyebrow">Service</span>
                </th>
                {packages.map((p) => (
                  <th
                    key={p.id}
                    scope="col"
                    className={p.mostPopular ? "pkg-matrix__col-hl" : ""}
                  >
                    {p.mostPopular && (
                      <span className="pkg-matrix__pop">Most popular</span>
                    )}
                    <span className="pkg-matrix__pkg-name">{p.name}</span>
                    <span className="pkg-matrix__pkg-tier">{p.tier}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((row) => (
                <tr key={row.id}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((v, col) => {
                    const state = cellState(v);
                    const hl = packages[col]?.mostPopular
                      ? "pkg-matrix__col-hl"
                      : "";
                    return (
                      <td key={col} className={hl}>
                        {state === "yes" ? (
                          <span
                            className="pkg-matrix__yes"
                            aria-label="Included"
                          >
                            <Check size={16} strokeWidth={2.5} />
                          </span>
                        ) : state === "no" ? (
                          <span
                            className="pkg-matrix__no"
                            aria-label="Not included"
                          >
                            <X size={15} strokeWidth={2} />
                          </span>
                        ) : (
                          <span className="pkg-matrix__custom">{v}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {prices.map((row) => (
                <tr key={row.id} className="pkg-matrix__price-row">
                  <th scope="row">
                    <span className="pkg-matrix__price-label">{row.label}</span>
                  </th>
                  {row.values.map((v, col) => {
                    const hl = packages[col]?.mostPopular
                      ? "pkg-matrix__col-hl"
                      : "";
                    return (
                      <td key={col} className={hl}>
                        {v || "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
