import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  reviewsPayloadSchema,
  DEFAULT_REVIEWS,
  type ReviewsPayload,
} from "./reviews-schema";

// Read the cached reviews for the homepage. Falls back to an empty (early-days)
// payload on any problem — missing row, invalid shape, or connection error — so
// the page always renders and never shows a broken reviews section.
export async function getReviews(): Promise<ReviewsPayload> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("reviews_cache")
      .select("payload")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) return DEFAULT_REVIEWS;

    const parsed = reviewsPayloadSchema.safeParse(data.payload);
    return parsed.success ? parsed.data : DEFAULT_REVIEWS;
  } catch {
    return DEFAULT_REVIEWS;
  }
}
