import Link from "next/link";
import { SHOP } from "@/lib/content/contact";

export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const wordmarkSize = size === "sm" ? 18 : 22;
  const subSize = 11;
  return (
    <Link
      href="/"
      className="inline-flex items-baseline gap-3 text-fg-1 transition-colors hover:text-chrome"
      aria-label={SHOP.brand.full}
    >
      <span
        className="font-display font-medium leading-none"
        style={{ fontSize: wordmarkSize, letterSpacing: "0.01em" }}
      >
        {SHOP.brand.wordmark}
      </span>
      <span
        className="eyebrow"
        style={{ fontSize: subSize, letterSpacing: "0.16em" }}
      >
        {SHOP.brand.sub}
      </span>
    </Link>
  );
}
