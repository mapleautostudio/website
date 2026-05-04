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
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 70% at 50% 35%,
            color-mix(in srgb, var(--color-elevated) 80%, transparent) 0%,
            var(--color-surface) 55%,
            var(--color-surface-deep) 100%)`,
        }}
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
            filter: "brightness(0.55) saturate(0.65) contrast(1.05)",
          }}
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            color-mix(in srgb, var(--color-surface) 45%, transparent) 0%,
            color-mix(in srgb, var(--color-surface) 55%, transparent) 50%,
            var(--color-surface) 100%)`,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, var(--color-chrome) 25%, var(--color-chrome) 26%, transparent 27%, transparent 74%, var(--color-chrome) 75%, var(--color-chrome) 76%, transparent 77%), linear-gradient(90deg, transparent 24%, var(--color-chrome) 25%, var(--color-chrome) 26%, transparent 27%, transparent 74%, var(--color-chrome) 75%, var(--color-chrome) 76%, transparent 77%)`,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
