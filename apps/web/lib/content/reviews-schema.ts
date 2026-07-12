import { z } from "zod";

// Shape written by .github/scripts/refresh-reviews.mjs into public.reviews_cache
// and read back by the homepage. Validated on both ends.

export const reviewSchema = z.object({
  id: z.string(),
  author: z.string(),
  avatarUrl: z.string().nullable(),
  rating: z.number().int().min(1).max(5),
  text: z.string().nullable(),
  publishedAt: z.string().nullable(), // ISO
});

export const reviewsPayloadSchema = z.object({
  reviews: z.array(reviewSchema),
  totalCount: z.number().int().min(0),
  textCount: z.number().int().min(0),
  averageRating: z.number().min(0).max(5),
  fetchedAt: z.string().nullable(),
});

export type Review = z.infer<typeof reviewSchema>;
export type ReviewsPayload = z.infer<typeof reviewsPayloadSchema>;

// Fallback when the cache row is missing/invalid: an honest empty state.
export const DEFAULT_REVIEWS: ReviewsPayload = {
  reviews: [],
  totalCount: 0,
  textCount: 0,
  averageRating: 0,
  fetchedAt: null,
};
