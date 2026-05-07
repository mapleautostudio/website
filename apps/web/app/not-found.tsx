import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { BOOKING_HREF } from "@/lib/content/contact";

export const metadata = {
  title: "Not found — Maple Auto Studio",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <section style={{ paddingTop: 144, paddingBottom: 96 }}>
          <div className="container-x">
            <div className="max-w-230 flex flex-col gap-6 md:gap-8">
              <span className="eyebrow">404 · NOT FOUND</span>
              <h1
                className="m-0 font-display"
                style={{
                  fontSize: "clamp(2.5rem, 9vw, 6rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.96,
                  hyphens: "none",
                  overflowWrap: "normal",
                  paddingRight: "1rem",
                }}
              >
                <span className="text-fg-1">Off the</span>{" "}
                <em style={{ color: "var(--color-accent)", opacity: 0.9 }}>
                  service log.
                </em>
              </h1>
              <p className="m-0 body-lg" style={{ maxWidth: 560 }}>
                The page you were looking for either moved, never existed, or
                you typed a URL we don&apos;t recognize. From here, head home,
                book a service, or browse what we offer.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <Link href="/" className="btn btn--primary">
                  <ArrowLeft size={16} strokeWidth={1.5} />
                  Back to home
                </Link>
                <Link href={BOOKING_HREF} className="btn btn--ghost">
                  Book service
                  <ArrowRight size={16} strokeWidth={1.5} />
                </Link>
                <Link href="/#services" className="btn btn--ghost">
                  Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
