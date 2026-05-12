"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo({ sources }: { sources: string[] }) {
  const [src, setSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (sources.length === 0) return;
    const pick = sources[Math.floor(Math.random() * sources.length)];
    setSrc(pick);
  }, [sources]);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {/* Base fill in case the video hasn't mounted yet */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--color-surface-deep)" }}
      />

      {src && (
        <video
          ref={videoRef}
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{
            filter: "var(--hero-video-filter)",
          }}
        />
      )}

      {/* Top vignette — gentle, just enough to anchor the nav */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg,
            color-mix(in srgb, var(--color-surface-deep) 35%, transparent) 0%,
            color-mix(in srgb, var(--color-surface-deep) 12%, transparent) 18%,
            transparent 32%)`,
        }}
      />

      {/* Bottom scrim — gradual ramp so the hero dissolves into the page
          smoothly instead of cutting off at a hard line. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg,
            transparent 0%,
            transparent 35%,
            color-mix(in srgb, var(--color-surface-deep) 18%, transparent) 55%,
            color-mix(in srgb, var(--color-surface-deep) 45%, transparent) 72%,
            color-mix(in srgb, var(--color-surface-deep) 80%, transparent) 88%,
            var(--color-surface-deep) 100%)`,
        }}
      />
    </div>
  );
}
