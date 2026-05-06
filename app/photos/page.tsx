import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { CtaBand } from "@/components/marketing/CtaBand";
import { PhotoTile } from "@/components/marketing/PhotoTile";

export const metadata = {
  title: "Photos — Maple Auto Studio",
  description:
    "Photographs of recent work at Maple Auto Studio — detailing, ceramic coating, paint correction, tint, and accessories.",
};

const TILES = {
  paintCorrection: {
    src: "/photos/paint-correction/hero.jpg",
    alt: "Paint correction in progress on a polished panel under shop lights.",
    tag: "PAINT CORRECTION",
    caption: "Two-stage compound + polish, panel by panel.",
  },
  ceramic: {
    src: "/photos/ceramic-coating/hero.jpg",
    alt: "Ceramic coating applied to a darkened panel showing deep reflection.",
    tag: "CERAMIC COATING",
    caption: "Pro-grade ceramic, applied by hand.",
  },
  tint: {
    src: "/photos/window-tint/hero.webp",
    alt: "Window tint film shade comparison strip across glass panels.",
    tag: "WINDOW TINT",
    caption: "Carbon and ceramic film, shade strip on the bay glass.",
  },
  dashCam: {
    src: "/photos/accessories/dash-cam.jpg",
    alt: "Dash cam install with cabling tucked clean behind the trim.",
    tag: "DASH CAM",
    caption: "Hardwire kit, no zip ties, no exposed wire.",
  },
  floorMats: {
    src: "/photos/accessories/floor-mats.jpg",
    alt: "Custom-fit weather floor mats laid in a vehicle interior.",
    tag: "FLOOR MATS",
    caption: "Custom-fit, weather-rated, fitted by VIN.",
  },
  seatCoverPortrait: {
    src: "/photos/seat-covers/hero.jpg",
    alt: "Tailored seat cover detail showing stitching and fitment.",
    tag: "SEAT COVERS",
    caption: "Tailored cover, stitching matched to interior.",
  },
  supplies: {
    src: "/photos/accessories/supplies.jpg",
    alt: "Detailing supplies and accessories laid out on a workbench.",
    tag: "DETAILING KIT",
    caption: "Workbench, every product in its place.",
  },
  microfiber: {
    src: "/photos/accessories/microfiber.jpg",
    alt: "Microfiber towels stacked on a workbench, color-coded.",
    tag: "MICROFIBER",
    caption: "Color-coded towels — paint, glass, interior.",
  },
  seatCoverWide: {
    src: "/photos/accessories/seat-covers-1.jpg",
    alt: "Custom upholstery photographed inside a vehicle cabin.",
    tag: "UPHOLSTERY",
    caption: "Custom upholstery, photographed before pickup.",
  },
};

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
                A working set. Recent jobs across detailing, ceramic, correction, tint, and accessories. More added as the studio photographs new work.
              </p>
            </div>
          </div>
        </section>

        <section style={{ paddingBottom: 96 }}>
          <div className="container-x">
            <div className="flex flex-col gap-3 md:gap-4">
              {/* Row 1 — featured pair: hero landscape + tall portrait */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4">
                <PhotoTile
                  {...TILES.paintCorrection}
                  className="lg:col-span-7"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority
                  style={{ height: "clamp(280px, 42vw, 540px)" }}
                />
                <PhotoTile
                  {...TILES.ceramic}
                  className="lg:col-span-5"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  style={{ height: "clamp(360px, 42vw, 540px)" }}
                />
              </div>

              {/* Row 2 — wide divider banner */}
              <PhotoTile
                {...TILES.tint}
                sizes="100vw"
                style={{ height: "clamp(180px, 22vw, 320px)" }}
              />

              {/* Row 3 — triple portraits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                <PhotoTile
                  {...TILES.dashCam}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ height: "clamp(360px, 32vw, 480px)" }}
                />
                <PhotoTile
                  {...TILES.floorMats}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ height: "clamp(360px, 32vw, 480px)" }}
                />
                <PhotoTile
                  {...TILES.seatCoverPortrait}
                  className="sm:col-span-2 lg:col-span-1"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 33vw"
                  style={{ height: "clamp(360px, 32vw, 480px)" }}
                />
              </div>

              {/* Row 4 — landscape pair */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4">
                <PhotoTile
                  {...TILES.supplies}
                  className="lg:col-span-7"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  style={{ height: "clamp(220px, 26vw, 380px)" }}
                />
                <PhotoTile
                  {...TILES.microfiber}
                  className="lg:col-span-5"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  style={{ height: "clamp(220px, 26vw, 380px)" }}
                />
              </div>

              {/* Row 5 — full-width landscape finisher */}
              <PhotoTile
                {...TILES.seatCoverWide}
                sizes="100vw"
                style={{ height: "clamp(240px, 30vw, 440px)" }}
              />
            </div>
          </div>
        </section>
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}
