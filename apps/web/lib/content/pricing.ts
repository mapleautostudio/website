import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { pricingConfigSchema, type PricingConfig } from "./pricing-schema";
import { DEFAULT_PRICING } from "./pricing-default";

// Single-row table: the whole pricing config lives in row id = 1, with a `draft`
// (owner is editing) and a `published` (public sees) copy.
const ROW_ID = 1;

type Column = "draft" | "published";

// Read one column, validate it, and fall back to the built-in default on any
// problem (missing row, unmigrated table, connection error, invalid shape) so
// the public page and admin never hard-fail on pricing.
async function read(column: Column): Promise<PricingConfig> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("pricing_content")
      .select(column)
      .eq("id", ROW_ID)
      .maybeSingle();

    if (error || !data) return DEFAULT_PRICING;

    const parsed = pricingConfigSchema.safeParse(
      (data as Record<string, unknown>)[column],
    );
    return parsed.success ? parsed.data : DEFAULT_PRICING;
  } catch {
    return DEFAULT_PRICING;
  }
}

/** Config the public page renders. */
export function getPublishedPricing(): Promise<PricingConfig> {
  return read("published");
}

/** Working copy the admin editor loads. */
export function getDraftPricing(): Promise<PricingConfig> {
  return read("draft");
}

export { ROW_ID as PRICING_ROW_ID };
