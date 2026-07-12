"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/guard";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { pricingConfigSchema } from "@/lib/content/pricing-schema";
import { PRICING_ROW_ID } from "@/lib/content/pricing";

// The public page that reflects published pricing.
const PUBLIC_PATH = "/services/detailing-packages";

export type ActionResult = { ok: true } | { ok: false; error: string };

// Upsert the singleton, tolerating an environment where the seed migration
// hasn't run yet: update the row if present, otherwise insert it with both
// columns primed so `published` (NOT NULL) is always satisfied.
async function writeRow(
  patch: { draft?: unknown; published?: unknown },
  stamps: { updated_at?: string; published_at?: string },
) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("pricing_content")
    .update({ ...patch, ...stamps })
    .eq("id", PRICING_ROW_ID)
    .select("id");

  if (error) return error;
  if (data && data.length > 0) return null;

  // No existing row — insert one. Fill any column the caller didn't set so the
  // NOT NULL constraints hold.
  const draft = patch.draft ?? patch.published;
  const published = patch.published ?? patch.draft;
  const { error: insertError } = await supabase
    .from("pricing_content")
    .insert({ id: PRICING_ROW_ID, draft, published });
  return insertError ?? null;
}

/** Persist the owner's in-progress edits. Does not affect the public page. */
export async function savePricingDraft(input: unknown): Promise<ActionResult> {
  await requireAdmin();

  const parsed = pricingConfigSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Those edits didn't validate — nothing saved." };
  }

  const error = await writeRow(
    { draft: parsed.data },
    { updated_at: new Date().toISOString() },
  );
  if (error) return { ok: false, error: "Couldn't save the draft. Try again." };

  return { ok: true };
}

/** Promote the stored draft to the live page. */
export async function publishPricing(): Promise<ActionResult> {
  await requireAdmin();

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("pricing_content")
    .select("draft")
    .eq("id", PRICING_ROW_ID)
    .maybeSingle();

  if (error || !data) {
    return { ok: false, error: "Couldn't load the draft to publish." };
  }

  // Re-validate before it goes public — never publish a malformed config.
  const parsed = pricingConfigSchema.safeParse(data.draft);
  if (!parsed.success) {
    return { ok: false, error: "The draft is invalid — fix it before publishing." };
  }

  const now = new Date().toISOString();
  const writeError = await writeRow(
    { published: parsed.data },
    { published_at: now, updated_at: now },
  );
  if (writeError) return { ok: false, error: "Couldn't publish. Try again." };

  revalidatePath(PUBLIC_PATH);
  return { ok: true };
}

/** Throw away draft edits, resetting the draft back to what's live. */
export async function discardDraft(): Promise<ActionResult> {
  await requireAdmin();

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("pricing_content")
    .select("published")
    .eq("id", PRICING_ROW_ID)
    .maybeSingle();

  if (error || !data) {
    return { ok: false, error: "Couldn't load the published version." };
  }

  const writeError = await writeRow(
    { draft: data.published },
    { updated_at: new Date().toISOString() },
  );
  if (writeError) return { ok: false, error: "Couldn't discard the draft." };

  return { ok: true };
}
