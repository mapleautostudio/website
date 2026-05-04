import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { CtaBand } from "@/components/marketing/CtaBand";
import { BOOKING_HREF } from "@/lib/content/contact";

export const metadata = {
  title: "About — Maple Auto Studio",
  description:
    "An independent detailing shop. Documented work, photographed evidence, written quotes — and the same technician on your car from start to finish.",
};

const SECTIONS = [
  {
    eyebrow: "PHILOSOPHY",
    title: "Specifics, not slogans.",
    body: [
      "An auto-detailing shop’s pitch usually arrives in adjectives — premium, professional, family-owned, the best in town. Adjectives don’t book, and they don’t hold up at pickup. We replaced ours with specifics.",
      "Every wear item we find on your car is photographed. Every quote we write is itemised. Every coating that goes down is logged with batch number and applied panel. If a paint correction can’t safely take a third stage, we tell you and stop at two. The work is the marketing.",
    ],
  },
  {
    eyebrow: "ONE TECHNICIAN",
    title: "The same hands, start to finish.",
    body: [
      "Khus has 12 years on paint, ceramic, and interior work. The hands that prep your panels are the hands that apply the coating. There’s no junior pass-off mid-job, no rotation between bays, no “the day-shift detailer signed off on it.” One technician, your car, drop-off to pickup.",
    ],
  },
  {
    eyebrow: "PARTNERSHIP",
    title: "In partnership with Akaal Auto Hub.",
    body: [
      "Maple Auto Studio operates as the detailing partner of Akaal Auto Hub. Mechanical work goes to Akaal. Paint, ceramic, correction, tint, and interior work come here. The two shops share standards on photographed inspections and written quotes — same paperwork on every car, regardless of which side of the work is happening.",
      "If you’re booked with Akaal for repair and the car needs detailing afterwards, you don’t book twice. Tell us at drop-off and we coordinate the handoff.",
    ],
  },
];

const STATS = [
  { big: "12", small: "years", label: "On paint, ceramic, and interior work." },
  {
    big: "4.9",
    small: "★ · 200+",
    label: "Verified Google reviews. Not curated, not paid for.",
  },
  {
    big: "6",
    small: "services",
    label: "Detailing, ceramic, correction, tint, boats, accessories.",
  },
  {
    big: "0",
    small: "upsells",
    label: "If we find something mid-job, we stop and call.",
  },
];

export default function AboutPage() {
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
              <span className="eyebrow">ABOUT</span>
              <h1
                className="m-0 font-display"
                style={{
                  fontSize: "clamp(44px, 9vw, 96px)",
                  fontWeight: 300,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.96,
                }}
              >
                <span className="text-fg-1">Specifics,</span>
                <br />
                <span className="text-fg-2">not slogans.</span>
              </h1>
              <p className="m-0 body-lg" style={{ maxWidth: 640 }}>
                An independent detailing shop. We work on a small number of cars at a time, document everything we do, and quote in writing before we start.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <Link href="/process" className="btn btn--ghost">
                  How a job runs
                </Link>
                <Link href={BOOKING_HREF} className="btn btn--primary">
                  Book service
                  <ArrowRight size={16} strokeWidth={1.5} />
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
            <div className="flex flex-col gap-16 lg:gap-24">
              {SECTIONS.map((s, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16"
                >
                  <div>
                    <span className="eyebrow block mb-5">{s.eyebrow}</span>
                    <h2
                      className="m-0 font-display"
                      style={{
                        fontSize: "clamp(28px, 3.5vw, 40px)",
                        fontWeight: 300,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                      }}
                    >
                      {s.title}
                    </h2>
                  </div>
                  <div className="lg:col-span-2 flex flex-col gap-5">
                    {s.body.map((p, pi) => (
                      <p
                        key={pi}
                        className="m-0 text-fg-1"
                        style={{
                          fontSize: 16,
                          lineHeight: 1.65,
                          maxWidth: 720,
                        }}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ paddingBlock: 96 }}>
          <div className="container-x">
            <span className="eyebrow block mb-10">BY THE NUMBERS</span>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              style={{
                gap: 1,
                background: "var(--color-hairline)",
                border: "1px solid var(--color-hairline)",
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              {STATS.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3"
                  style={{
                    background: "var(--color-surface)",
                    padding: "clamp(24px, 3vw, 36px)",
                    minHeight: 200,
                  }}
                >
                  <div className="flex items-baseline gap-2">
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
                      {s.big}
                    </span>
                    <span
                      className="text-fg-3"
                      style={{
                        fontSize: 14,
                        letterSpacing: "-0.005em",
                      }}
                    >
                      {s.small}
                    </span>
                  </div>
                  <p
                    className="m-0 text-fg-2 mt-auto"
                    style={{ fontSize: 13, lineHeight: 1.55 }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <p
              className="mt-6 text-fg-3"
              style={{ fontSize: 12, lineHeight: 1.6, maxWidth: 720 }}
            >
              Review counts and tenure are placeholder figures; actual numbers are confirmed quarterly with the customer.
            </p>
          </div>
        </section>
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}
