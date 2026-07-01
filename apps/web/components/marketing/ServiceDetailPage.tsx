import { Check } from "lucide-react";
import { type Service } from "@/lib/content/services";
import { ServiceHero } from "./ServiceHero";
import { PackagesPricing } from "./PackagesPricing";

export function ServiceDetailPage({ service }: { service: Service }) {
  const { icon: Icon, ...serviceData } = service;
  const isPackages = service.slug === "detailing-packages";

  return (
    <main>
      {isPackages ? (
        <PackagesPricing />
      ) : (
        <ServiceHero
          service={serviceData}
          iconNode={<Icon size={28} strokeWidth={1.5} className="text-chrome" />}
        />
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
                    className="flex gap-6 py-6"
                    style={{ borderBottom: "1px solid var(--color-hairline)" }}
                  >
                    <span
                      className="shrink-0"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        color: "var(--color-fg-3)",
                        paddingTop: 3,
                        minWidth: 24,
                      }}
                    >
                      Q{i + 1}
                    </span>
                    <div>
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
