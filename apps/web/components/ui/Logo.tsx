import Link from "next/link";
import Image from "next/image";
import { SHOP } from "@/lib/content/contact";

export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const wordmarkSize = size === "sm" ? 18 : 22;
  const iconSize = size === "sm" ? 26 : 32;
  const subSize = 11;
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
        className="font-display font-medium leading-none"
        style={{ fontSize: wordmarkSize, letterSpacing: "0.01em" }}
      >
        <em className="italic">{SHOP.brand.wordmark}</em>
        <span className="hidden md:inline"> {SHOP.brand.extension}</span>
      </span>
      <span
        className="eyebrow hidden md:inline"
        style={{ fontSize: subSize, letterSpacing: "0.16em", marginLeft: 4 }}
      >
        {SHOP.brand.tag}
      </span>
    </Link>
  );
}
