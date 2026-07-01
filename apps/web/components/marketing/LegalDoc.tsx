import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { SHOP } from "@/lib/content/contact";

export function LegalDoc({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main>
        <section style={{ paddingTop: 144, paddingBottom: 112 }}>
          <div className="container-tight">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-fg-2 hover:text-chrome transition-colors mb-12"
              style={{ fontSize: 13 }}
            >
              <ArrowLeft size={14} strokeWidth={1.5} /> Home
            </Link>

            <header
              className="flex flex-col gap-4"
              style={{
                borderBottom: "1px solid var(--color-hairline)",
                paddingBottom: 32,
                marginBottom: 40,
              }}
            >
              <span className="eyebrow">LEGAL</span>
              <h1
                className="m-0 font-display"
                style={{
                  fontSize: "clamp(2.25rem, 6vw, 3.5rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {title}
              </h1>
              <p className="m-0 meta">
                {SHOP.brand.full} · {SHOP.location.line1}, {SHOP.location.city}
              </p>
              <p className="m-0 caption" style={{ fontStyle: "italic" }}>
                Last updated: {updated}
              </p>
            </header>

            <p className="body-lg m-0" style={{ maxWidth: 720 }}>
              {intro}
            </p>

            <div className="legal-prose" style={{ marginTop: 8 }}>
              {children}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export function LegalSection({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: 44 }}>
      <h2
        className="m-0 font-display"
        style={{
          fontSize: "clamp(20px, 2.6vw, 26px)",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          color: "var(--color-fg-1)",
          borderLeft: "3px solid var(--color-accent)",
          paddingLeft: 16,
          marginBottom: 18,
        }}
      >
        <span
          className="meta"
          style={{
            color: "var(--color-accent)",
            marginRight: 10,
            fontSize: 15,
          }}
        >
          {String(index).padStart(2, "0")}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}
