import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { CtaBand } from "@/components/marketing/CtaBand";
import { BOOKING_HREF } from "@/lib/content/contact";

export const metadata = {
  title: "Process — Maple Auto Studio",
  description:
    "How a detailing job runs at Maple — drop-off, photographed inspection, written quote, phased work, second-tech QC, delivery with care guide.",
  openGraph: {
    title: "Process — Maple Auto Studio",
    description:
      "How a detailing job runs at Maple — drop-off, photographed inspection, written quote, phased work, second-tech QC, delivery with care guide.",
    url: "https://mapleautostudio.ca/process",
    siteName: "Maple Auto Studio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Maple Auto Studio" }],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Process — Maple Auto Studio",
    description:
      "How a detailing job runs at Maple — drop-off, photographed inspection, written quote, phased work, second-tech QC, delivery with care guide.",
    images: ["/opengraph-image"],
  },
};

const STEPS = [
  {
    n: "01",
    title: "Arrival.",
    body: "Pull in by appointment, or ask about pickup and dropoff within Saskatoon city limits when you book. Walk-around with you, key handover, baseline paint-thickness reading on every panel if correction is on the work order.",
    note: "BY APPOINTMENT OR PICKUP",
  },
  {
    n: "02",
    title: "Inspection.",
    body: "Panel-by-panel photographs under controlled light — swirl marks, water spots, scratches, interior wear, anything that affects the work. Paint thickness logged in microns before any compound touches the clear coat.",
    note: "PHOTOGRAPHED · MEASURED",
  },
  {
    n: "03",
    title: "Quote.",
    body: "Written quote within the hour. Every line item itemised, every option ranked. We tell you which work matters, which can wait, and what each tier costs. If you want a second opinion, we hold the bay.",
    note: "WRITTEN · OPTIONS RANKED",
  },
  {
    n: "04",
    title: "Work.",
    body: "Phased through the agreed scope. Multi-stage where the work calls for it, single-stage where it doesn't. Progress photos at the halfway point — you'll know how it's going before you ask.",
    note: "PHASED · PROGRESS PHOTOS",
  },
  {
    n: "05",
    title: "Final check.",
    body: "Second technician walks every panel under multiple light sources before we sign off. After photos, panel-by-panel, sent to your phone. If something isn't right, it goes back on the bench.",
    note: "TWO-TECH QC",
  },
  {
    n: "06",
    title: "Delivery.",
    body: "Keys back. Care guide for any coating applied, parking notes for the first 48 hours, your invoice with the same dollar figure as the quote — no surprise line items, no end-of-job ask.",
    note: "INVOICE = QUOTE",
  },
];

export default function ProcessPage() {
  return (
    <>
      <Nav />
      <main>
        <section style={{ paddingTop: 144, paddingBottom: 96 }}>
          <div className="container-x">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-fg-2 hover:text-chrome transition-colors mb-12"
              style={{ fontSize: 13 }}
            >
              <ArrowLeft size={14} strokeWidth={1.5} /> Home
            </Link>

            <div className="max-w-230 flex flex-col gap-6 md:gap-8">
              <span className="eyebrow">PROCESS · 6 STEPS</span>
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
                <span className="text-fg-1">How a job</span>
                <br />
                <em style={{ color: "var(--color-accent)", opacity: 0.9 }}>
                  runs.
                </em>
              </h1>
              <p className="m-0 body-lg" style={{ maxWidth: 640 }}>
                Drop the keys, walk through what we found, get a written quote before any product touches paint. Photographed start to finish.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <Link href={BOOKING_HREF} className="btn btn--primary">
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

        <section
          style={{
            background: "var(--color-surface-deep)",
            paddingBlock: 96,
          }}
        >
          <div className="container-x">
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{
                gap: 1,
                background: "var(--color-hairline)",
                border: "1px solid var(--color-hairline)",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className="flex flex-col gap-4"
                  style={{
                    background: "var(--color-surface-deep)",
                    padding: "clamp(28px, 4vw, 44px)",
                    minHeight: 280,
                  }}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span
                      className="font-display"
                      style={{
                        fontSize: 64,
                        fontWeight: 200,
                        letterSpacing: "-0.04em",
                        lineHeight: 0.9,
                        color: "var(--color-fg-1)",
                      }}
                    >
                      {s.n}
                    </span>
                    <span className="meta text-fg-3 text-right">{s.note}</span>
                  </div>
                  <h2
                    className="m-0 font-display"
                    style={{
                      fontSize: 28,
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      color: "var(--color-fg-1)",
                    }}
                  >
                    {s.title}
                  </h2>
                  <p
                    className="m-0 text-fg-2 mt-auto"
                    style={{ fontSize: 15, lineHeight: 1.6 }}
                  >
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ paddingBlock: 96 }}>
          <div className="container-x">
            <div className="max-w-190 mx-auto text-center flex flex-col gap-6">
              <span className="eyebrow block">WHAT YOU WON&apos;T GET</span>
              <h2
                className="m-0 font-display"
                style={{
                  fontSize: "clamp(28px, 4.5vw, 48px)",
                  fontWeight: 300,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                }}
              >
                <span className="text-fg-2">No upsells.</span>{" "}
                <span className="text-fg-1">No surprise line items.</span>
              </h2>
              <p
                className="m-0 text-fg-2 mx-auto"
                style={{ fontSize: 16, lineHeight: 1.65, maxWidth: 600 }}
              >
                If a job runs longer than estimated, the quote doesn&apos;t. If we find something mid-job, we stop and call before continuing. The invoice you receive is the quote you signed off on.
              </p>
            </div>
          </div>
        </section>
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}
