import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { BookingForm } from "@/components/booking/BookingForm";
import { SHOP } from "@/lib/content/contact";

export const metadata = {
  title: "Book service — Maple Auto Studio",
  description:
    "Request a booking with Maple Auto Studio. We confirm by phone or email within the hour.",
  openGraph: {
    title: "Book service — Maple Auto Studio",
    description:
      "Request a booking with Maple Auto Studio. We confirm by phone or email within the hour.",
    url: "https://mapleautostudio.ca/book",
    siteName: "Maple Auto Studio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Maple Auto Studio" }],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book service — Maple Auto Studio",
    description:
      "Request a booking with Maple Auto Studio. We confirm by phone or email within the hour.",
    images: ["/opengraph-image"],
  },
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <>
      <Nav />
      <main>
        <section
          className="relative overflow-hidden"
          style={{ paddingTop: 144, paddingBottom: 80 }}
        >
          <div className="container-x">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-fg-2 hover:text-chrome transition-colors mb-12"
              style={{ fontSize: 13 }}
            >
              <ArrowLeft size={14} strokeWidth={1.5} /> Back to home
            </Link>

            <div
              className="grid grid-cols-1 lg:grid-cols-12"
              style={{ gap: 48 }}
            >
              <aside className="lg:col-span-5 flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                  <span className="eyebrow">REQUEST A BOOKING</span>
                  <h1
                    className="m-0 font-display"
                    style={{
                      fontSize: "clamp(40px, 6vw, 72px)",
                      fontWeight: 300,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    <span className="text-fg-1">Tell us the car</span>{" "}
                    <em
                      className="not-italic"
                      style={{ color: "var(--color-accent)", opacity: 0.9 }}
                    >
                      and the date.
                    </em>
                  </h1>
                  <p
                    className="m-0 body-lg"
                    style={{ maxWidth: 480 }}
                  >
                    We&apos;ll confirm by phone or email within the hour during
                    open hours, or first thing the next morning.
                  </p>
                </div>

                <div
                  className="flex flex-col gap-4"
                  style={{
                    paddingTop: 24,
                    borderTop: "1px solid var(--color-hairline)",
                  }}
                >
                  <div className="flex flex-col gap-1">
                    <span className="meta">STUDIO</span>
                    <span className="text-fg-1" style={{ fontSize: 14 }}>
                      {SHOP.location.line1}
                    </span>
                    <span className="text-fg-2" style={{ fontSize: 14 }}>
                      {SHOP.location.city}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="meta">PHONE</span>
                    <a
                      href={`tel:${SHOP.phoneTel}`}
                      className="text-fg-1 hover:opacity-80 transition-opacity"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 18,
                        fontWeight: 400,
                        letterSpacing: "-0.015em",
                      }}
                    >
                      {SHOP.phone}
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="meta">EMAIL</span>
                    <a
                      href={`mailto:${SHOP.email}`}
                      className="text-fg-1 hover:text-chrome transition-colors break-all"
                      style={{ fontSize: 14 }}
                    >
                      {SHOP.email}
                    </a>
                  </div>
                </div>
              </aside>

              <div className="lg:col-span-7 lg:col-start-6">
                <div
                  style={{
                    padding: "clamp(24px, 4vw, 40px)",
                    background: "var(--color-elevated)",
                    border: "1px solid var(--color-hairline)",
                    borderRadius: 6,
                  }}
                >
                  <BookingForm defaultService={service} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
