"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function PhotoTile({
  src,
  alt,
  tag,
  caption,
  className,
  style,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
}: {
  src: string;
  alt: string;
  tag: string;
  caption: string;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <motion.figure
      className={`relative overflow-hidden m-0 group ${className ?? ""}`}
      style={{
        background: "var(--color-elevated)",
        ...style,
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{
          objectFit: "cover",
          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="group-hover:scale-[1.03]"
      />
      <div
        aria-hidden
        className="transition-opacity duration-300 group-hover:opacity-100"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 45%, rgba(10,14,17,0.78) 100%)",
          opacity: 0.55,
          pointerEvents: "none",
        }}
      />
      <figcaption
        className="absolute inset-0 flex flex-col justify-end gap-1"
        style={{ padding: "clamp(16px, 2vw, 24px)" }}
      >
        <span
          className="eyebrow"
          style={{ color: "var(--color-accent)" }}
        >
          {tag}
        </span>
        <span
          className="text-fg-1"
          style={{
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
          }}
        >
          {caption}
        </span>
      </figcaption>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 0 1px var(--color-hairline)",
          pointerEvents: "none",
        }}
      />
    </motion.figure>
  );
}
