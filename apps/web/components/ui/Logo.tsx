import Link from "next/link";
import Image from "next/image";
import { SHOP } from "@/lib/content/contact";

export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const wordmarkSize = size === "sm" ? 23 : 22;
  const wordmarkWeight = size === "sm" ? 400 : 500;
  const iconSize = size === "sm" ? 26 : 32;
  const subSize = size === "sm" ? 14 : 11;
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 text-fg-1 transition-colors hover:text-chrome"
      aria-label={SHOP.brand.full}
    >
      <Image
        src="/logo.svg"
        alt=""
        width={iconSize}
        height={iconSize}
        priority
        style={{
          height: iconSize,
          width: "auto",
          display: "block",
        }}
      />
      <span
        className="font-display leading-none whitespace-nowrap"
        style={{
          fontSize: wordmarkSize,
          fontWeight: wordmarkWeight,
          letterSpacing: "0.01em",
        }}
      >
        <em className="italic">{SHOP.brand.wordmark}</em>
        <span className="md:hidden lg:inline"> {SHOP.brand.extension}</span>
      </span>
      <span
        className="eyebrow hidden lg:inline whitespace-nowrap"
        style={{ fontSize: subSize, letterSpacing: "0.16em", marginLeft: 4 }}
      >
        {SHOP.brand.tag}
      </span>
    </Link>
  );
}
