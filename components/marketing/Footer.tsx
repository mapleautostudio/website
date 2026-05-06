import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { SHOP } from "@/lib/content/contact";
import { SERVICES } from "@/lib/content/services";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="bg-surface-deep"
      style={{ borderTop: "1px solid var(--color-hairline)" }}
    >
      <div
        className="container-x"
        style={{ paddingTop: 96, paddingBottom: 48 }}
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 lg:gap-12"
          style={{ marginBottom: 96 }}
        >
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo size="md" />
            <p
              className="mt-6 text-fg-2 max-w-75"
              style={{ fontSize: 14, lineHeight: 1.6 }}
            >
              {SHOP.description}
            </p>
            <p
              className="mt-3 text-fg-2 max-w-75"
              style={{ fontSize: 14, lineHeight: 1.6 }}
            >
              {SHOP.partnership}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              <Link
                href="/about"
                className="text-fg-2 hover:text-chrome transition-colors"
                style={{ fontSize: 13 }}
              >
                About
              </Link>
              <Link
                href="/process"
                className="text-fg-2 hover:text-chrome transition-colors"
                style={{ fontSize: 13 }}
              >
                Process
              </Link>
              <Link
                href="/photos"
                className="text-fg-2 hover:text-chrome transition-colors"
                style={{ fontSize: 13 }}
              >
                Photos
              </Link>
            </div>
          </div>

          <div>
            <span className="eyebrow block mb-5">SERVICES</span>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={
                      s.slug === "photos" ? "/photos" : `/services/${s.slug}`
                    }
                    className="text-fg-2 hover:text-chrome transition-colors"
                    style={{ fontSize: 14 }}
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="eyebrow block mb-5">FOLLOW</span>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {SHOP.social.map((s) => (
                <li key={s.platform} className="flex flex-col">
                  <a
                    href={s.url}
                    className="text-fg-2 hover:text-chrome transition-colors"
                    style={{ fontSize: 14 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.platform}
                  </a>
                  <span className="meta" style={{ fontSize: 11 }}>
                    {s.handle}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="eyebrow block mb-5">VISIT</span>
            <ul
              className="list-none m-0 p-0 flex flex-col gap-3 text-fg-2"
              style={{ fontSize: 14 }}
            >
              <li>{SHOP.location.line1}</li>
              <li>{SHOP.location.city}</li>
              <li className="mt-1">
                <a
                  href={`tel:${SHOP.phoneTel}`}
                  className="text-fg-1 hover:opacity-80 transition-opacity inline-block"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 400,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {SHOP.phone}
                </a>
              </li>
              <li className="mt-2">Mon–Fri · 8a–6p</li>
              <li>Sat · 9a–3p</li>
            </ul>
          </div>
        </div>

        <div
          className="pt-7 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
          style={{ borderTop: "1px solid var(--color-hairline)" }}
        >
          <span className="meta">
            © {year} MAPLE AUTO STUDIO · YXE. ALL RIGHTS RESERVED.
          </span>
          <span className="meta">v1.0 · BUILD 0501</span>
        </div>
      </div>
    </footer>
  );
}
