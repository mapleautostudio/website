import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SHOP, BOOKING_HREF } from "@/lib/content/contact";
import { getHeroVideos } from "@/lib/hero-videos";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  const videos = getHeroVideos();
  return (
    <section className="relative min-h-[100vh] flex items-end overflow-hidden pt-24 pb-16 md:pb-24">
      <HeroVideo sources={videos} />

      <div className="container-x relative z-10 w-full">
        <div className="max-w-[920px] flex flex-col gap-6 md:gap-8">
          <h1
            className="reveal reveal-2 m-0 font-display font-light"
            style={{
              fontSize: "clamp(2.5rem, 9vw, 6rem)",
              lineHeight: 0.96,
              letterSpacing: "-0.03em",
              hyphens: "none",
              overflowWrap: "normal",
              paddingRight: "1rem",
            }}
          >
            <span className="text-fg-1">Finish,</span>
            <br />
            <em style={{ color: "var(--color-accent)", opacity: 0.9 }}>
              calibrated.
            </em>
          </h1>
          <div
            className="reveal reveal-3"
            style={{
              maxWidth: 620,
              position: "relative",
              padding: "8px 4px",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: "-28px -56px",
                backgroundColor:
                  "color-mix(in srgb, var(--color-surface-deep) 40%, transparent)",
                backdropFilter: "blur(36px) saturate(125%)",
                WebkitBackdropFilter: "blur(36px) saturate(125%)",
                maskImage:
                  "radial-gradient(ellipse 70% 100% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 70% 100% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.4) 65%, rgba(0,0,0,0) 100%)",
                pointerEvents: "none",
              }}
            />
            <p
              className="body-lg m-0"
              style={{ position: "relative", color: "var(--color-fg-1)" }}
            >
              <em
                className="not-italic"
                style={{ color: "var(--color-fg-1)", fontWeight: 500 }}
              >
                Detailing, window tinting, ceramic coating, and paint correction.
              </em>{" "}
              <span style={{ color: "var(--color-fg-2)" }}>
                Every panel photographed before-and-after, with a transparent quote before any product touches paint.
              </span>
            </p>
          </div>
          <div className="reveal reveal-4 flex flex-wrap gap-3 mt-2">
            <Link href={BOOKING_HREF} className="btn btn--primary">
              Book service
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
            <a href="#services" className="btn btn--ghost">
              View services
            </a>
          </div>

          <div className="reveal reveal-6 flex flex-col gap-1 mt-6 md:hidden">
            <span className="meta">{SHOP.location.geo}</span>
            <span className="meta text-fg-2">{SHOP.established}</span>
          </div>
        </div>

        <div className="reveal reveal-6 hidden md:flex absolute right-(--gutter) bottom-0 flex-col items-end gap-1.5">
          <span className="meta">{SHOP.location.geo}</span>
          <span className="meta text-fg-2">{SHOP.established}</span>
        </div>
      </div>
    </section>
  );
}
