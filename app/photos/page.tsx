import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { CtaBand } from "@/components/marketing/CtaBand";

export const metadata = {
  title: "Photos — Maple Auto Studio",
  description:
    "Before / after photographs from recent jobs at Maple Auto Studio.",
};

const PLACEHOLDER_TILES = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  caption: [
    "2-stage + ceramic",
    "Full interior",
    "Ceramic tint",
    "Boat gelcoat",
    "Window tint",
    "Paint correction",
    "Custom mats",
    "Engine bay detail",
    "Concours detail",
  ][i],
  vehicle: [
    "2019 Audi Q5",
    "2017 Lexus IS",
    "2024 Tesla Model 3",
    "2018 Sea Ray 240",
    "2022 BMW M3",
    "2016 Porsche Cayman",
    "2016 Subaru Outback",
    "2020 Mercedes E450",
    "2014 Porsche 911",
  ][i],
}));

export default function PhotosPage() {
  return (
    <>
      <Nav />
      <main>
        <section style={{ paddingTop: 144, paddingBottom: 64 }}>
          <div className="container-x">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-fg-2 hover:text-chrome transition-colors mb-12"
              style={{ fontSize: 13 }}
            >
              <ArrowLeft size={14} strokeWidth={1.5} /> Home
            </Link>

            <div className="max-w-190 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <Camera size={22} strokeWidth={1.5} className="text-chrome" />
                <span className="eyebrow">GALLERY</span>
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
                <span className="text-fg-2">From the</span>{" "}
                <span className="text-fg-1">service log.</span>
              </h1>
              <p className="m-0 body-lg" style={{ maxWidth: 640 }}>
                Photographs of recent work. Before and after on every job, taken on a calibrated phone in the same bay.
              </p>
            </div>
          </div>
        </section>

        <section style={{ paddingBottom: 96 }}>
          <div className="container-x">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {PLACEHOLDER_TILES.map((tile) => (
                <figure
                  key={tile.id}
                  className="card relative overflow-hidden m-0"
                  style={{
                    aspectRatio: "4 / 5",
                    padding: 0,
                    background: "var(--color-surface-deep)",
                    cursor: "pointer",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `
                        radial-gradient(120% 70% at 30% 30%, rgba(192,197,204,0.05) 0%, transparent 60%),
                        linear-gradient(180deg, #1a2027 0%, #0a0e11 100%)
                      `,
                    }}
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-5">
                    <div className="flex items-start justify-between">
                      <Camera
                        size={18}
                        strokeWidth={1.5}
                        className="text-chrome opacity-60"
                      />
                      <span className="meta">
                        {String(tile.id + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <figcaption className="flex flex-col gap-1">
                      <span
                        className="text-fg-1"
                        style={{
                          fontSize: 15,
                          fontWeight: 500,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {tile.caption}
                      </span>
                      <span className="meta">{tile.vehicle.toUpperCase()}</span>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>

            <p
              className="mt-8 text-fg-3 text-center"
              style={{ fontSize: 13, lineHeight: 1.6 }}
            >
              Placeholder grid — real before/after photographs will replace these tiles before launch.
            </p>
          </div>
        </section>
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}
