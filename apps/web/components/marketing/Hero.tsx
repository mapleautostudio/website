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
          <p
            className="reveal reveal-3 body-lg m-0"
            style={{
              maxWidth: 560,
              color: "var(--color-fg-1)",
              textShadow:
                "0 0 18px var(--color-surface-deep), 0 0 6px var(--color-surface-deep), 0 1px 2px var(--color-surface-deep)",
            }}
          >
            Detailing, window tinting, ceramic coating, and paint correction. Every panel photographed before-and-after, with a transparent quote before any product touches paint.
          </p>
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
