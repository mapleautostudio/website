import { z } from "zod";

// One JSON config drives the entire /services/detailing-packages page — both the
// package cards and the ✓/✗ comparison matrix. Prices are entered once (in the
// price rows) and every surface reads from them, so the card price and the
// matrix price can never disagree. See docs/superpowers/specs for the design.

export const ACCENTS = ["entry", "returning", "signature", "gold"] as const;

export const pricingPackageSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  tier: z.string(),
  accent: z.enum(ACCENTS),
  mostPopular: z.boolean(),
  tagline: z.string(),
  priceNote: z.string(),
  idealLabel: z.string(),
  ideal: z.string(),
});

// A matrix cell is "yes", "no", or a short custom label ("Quick", "Wipe").
export const serviceRowSchema = z.object({
  id: z.string().min(1),
  label: z.string(),
  values: z.array(z.string()),
});

export const priceRowSchema = z.object({
  id: z.string().min(1),
  label: z.string(),
  shortLabel: z.string().optional(),
  values: z.array(z.string()),
  headline: z.boolean(),
});

export const addonSchema = z.object({
  id: z.string().min(1),
  name: z.string(),
  desc: z.string(),
  price: z.string(),
});

export const pricingConfigSchema = z
  .object({
    meta: z.object({ title: z.string(), subtitle: z.string() }),
    packages: z.array(pricingPackageSchema).min(1),
    services: z.array(serviceRowSchema),
    prices: z.array(priceRowSchema),
    addons: z.array(addonSchema),
  })
  // Every row's values array must stay aligned with the number of package
  // columns; a mismatch means a column add/remove didn't propagate and the
  // grid would render ragged.
  .refine(
    (c) =>
      [...c.services, ...c.prices].every(
        (r) => r.values.length === c.packages.length,
      ),
    { message: "Every row must have one value per package column." },
  );

export type PricingConfig = z.infer<typeof pricingConfigSchema>;
export type PricingPackage = z.infer<typeof pricingPackageSchema>;
export type ServiceRow = z.infer<typeof serviceRowSchema>;
export type PriceRow = z.infer<typeof priceRowSchema>;
export type Addon = z.infer<typeof addonSchema>;

// ---- Derived (never stored) --------------------------------------------------

const NO = "no";
// A dash placeholder ("—", "–", "-") means "not offered / no price" — treat it
// as unset so it never shows in the sizes line or as a card bullet.
const isDash = (v: string) => /^[—–-]+$/.test(v.trim());
const isSet = (v: string) =>
  v.trim() !== "" && v.trim().toLowerCase() !== NO && !isDash(v);
const isYes = (v: string) => v.trim().toLowerCase() === "yes";

/** Big headline price for a card = the value in the row flagged `headline`. */
export function cardPrice(config: PricingConfig, col: number): string {
  const row = config.prices.find((p) => p.headline) ?? config.prices[0];
  return row?.values[col] ?? "";
}

/**
 * The small "Trucks $269 · Vans $299" line under the price. Built from the
 * non-headline price rows that carry a real value. When a package has no size
 * upcharges, it's a flat rate for every vehicle.
 */
export function cardSizes(config: PricingConfig, col: number): string {
  const headline = config.prices.find((p) => p.headline) ?? config.prices[0];
  const parts = config.prices
    .filter((p) => p !== headline && isSet(p.values[col] ?? ""))
    .map((p) => `${p.shortLabel || p.label} ${p.values[col]}`);
  return parts.length ? parts.join(" · ") : "Flat rate · all vehicles";
}

/**
 * Auto-derived card bullets: the services this package gained versus the
 * next-cheaper package (index − 1). Reproduces the "Everything in X, plus…"
 * framing without a separate bullet editor.
 */
export function cardFeatures(
  config: PricingConfig,
  col: number,
): { heading: string; items: string[] } {
  const prev = col > 0 ? config.packages[col - 1] : null;
  const items = config.services
    .filter((row) => {
      const here = isSet(row.values[col] ?? "");
      const before = prev ? isSet(row.values[col - 1] ?? "") : false;
      return here && !before;
    })
    .map((row) => {
      const v = row.values[col] ?? "";
      // A custom label ("Quick") qualifies the service; show it inline.
      return isYes(v) ? row.label : `${row.label} — ${v}`;
    });
  return {
    heading: prev ? `Everything in ${prev.name}, plus` : "What's included",
    items,
  };
}

/** Whether a matrix cell reads as included (drives the ✓ styling). */
export function cellState(value: string): "yes" | "no" | "custom" {
  const v = value.trim().toLowerCase();
  if (v === "yes") return "yes";
  if (v === "no" || v === "") return "no";
  return "custom";
}

/** Addons priced "Ask for pricing" render in a muted style. */
export function addonIsAsk(price: string): boolean {
  return /ask/i.test(price);
}
