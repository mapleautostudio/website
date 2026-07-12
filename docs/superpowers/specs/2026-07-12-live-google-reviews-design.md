# Live Google reviews — design

**Date:** 2026-07-12
**Branch:** `feat/google-reviews`
**Goal:** Replace the fabricated reviews section on the homepage with **real** reviews pulled from the shop's Google Maps listing, refreshed monthly at $0, degrading honestly while the shop has few reviews.

## Why (correctness + legal)

The current homepage hardcodes fake testimonials and claims **"4.9 · 213 Google reviews"** in `lib/content/reviews.ts` and `Pillars.tsx`. The real listing (CID `0xb7f96c3e33500cf8`) currently has **1 review — 5★, no text, left by AKAAL AUTOHUB LTD.** Fabricated testimonials/ratings are a real risk for a Canadian business (Competition Act, deceptive marketing). This removes all invented reviews and numbers and shows only what's true.

## Source (decided with client: scraper now, official API later)

- **Fetcher:** npm `google-maps-review-scraper` (v3.0.0, no API key, no account, $0). Verified working against the real listing with URL form `…/data=!4m2!3m1!1s0x0:0xb7f96c3e33500cf8!17s`.
- Scraping is against Google ToS; accepted by the owner for a monthly read of their own listing. Worst case it stops returning data and the site keeps showing the last cached set. The pipeline is built so swapping to the official Places API later is a **one-file change** (only the fetch step).

## Architecture

```
GitHub Action (monthly cron + manual)          Supabase                 Next.js homepage
  .github/scripts/refresh-reviews.mjs  ──REST──▶ reviews_cache  ──read──▶ <Reviews/> (async, ISR)
    scrape → normalize → validate → upsert        (1 row, jsonb)          adaptive by review count
```

- **The site never depends on the scraper being up.** It renders from the Supabase cache; a failed scrape just leaves the last-good data in place.

### Data model — `reviews_cache` (single row, like `pricing_content`)

```sql
create table public.reviews_cache (
  id smallint primary key default 1,
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  constraint reviews_cache_singleton check (id = 1)
);
-- RLS enabled; revoke all from anon, authenticated. Web + CI use the service-role key.
```

`payload` shape (validated by Zod both in CI before write and in the web reader):

```ts
ReviewsPayload {
  reviews: Array<{
    id: string
    author: string
    avatarUrl: string | null   // stored, not rendered in v1
    rating: number             // 1..5
    text: string | null
    publishedAt: string | null // ISO
  }>
  totalCount: number           // all reviews incl. textless
  textCount: number            // reviews with non-empty text
  averageRating: number        // mean of ALL ratings, 1 decimal
  fetchedAt: string            // ISO
}
```

### Fetcher — `.github/scripts/refresh-reviews.mjs`

- Standalone: its own `.github/scripts/package.json` (dep: `google-maps-review-scraper` only) so it never touches the app's dependency tree. DB write is plain PostgREST `fetch` upsert with the service-role key (no `@supabase/supabase-js` needed — same style as the keep-alive script).
- Steps: scrape all pages (`sort_type: "newest"`) → normalize each review → compute `averageRating`/counts → Zod-validate → upsert row 1.
- **Fail-safe:** on scrape error → exit 1 (Action shows red, alerting the owner) **without writing**, so the cache stays last-good. A successful scrape (even 0 reviews) writes.

### Workflow — `.github/workflows/refresh-reviews.yml`

- `schedule: cron "0 9 1 * *"` (09:00 UTC, 1st of month) + `workflow_dispatch`.
- Secrets: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (same two the keep-alive workflow needs). **These are currently unset in the repo — the keep-alive Action has been failing weekly because of it.** Setting them here fixes both.

### Web

- `lib/content/reviews-config.ts` — `LISTING_URL` (`https://www.google.com/maps?cid=13256745992546422008`), thresholds `MIN_TEXT_FOR_CARDS = 3`, `MIN_TOTAL_FOR_RATING = 5`.
- `lib/content/reviews-schema.ts` — Zod + types + `DEFAULT_REVIEWS` (empty).
- `lib/content/reviews-data.ts` (server) — `getReviews()`: read cache, validate, fall back to `DEFAULT_REVIEWS` on any error.
- `components/marketing/Reviews.tsx` — **async server component**, adaptive:
  - `textCount ≥ 3` → existing premium card grid, filled with real reviews (newest first, featured + up to 3), each marked "via Google", section links to the listing.
  - else → **early-days** state: honest headline (e.g. "Just getting started"), one line inviting Google reviews, prominent **"Review us on Google"** button → `LISTING_URL`. No fake stars, no empty grid.
  - `totalCount ≥ 5` → show the average-rating header ("4.9 ★ · N reviews"); below that it reads as fake, so it's hidden.
- `components/marketing/Pillars.tsx` / `reviews.ts` `PILLARS` — rewrite the middle pillar to something true at any count (e.g. "Reviewed in the open — every review is public on Google, unedited, never paid for"). Keep `PILLARS` in `reviews.ts`; remove `HERO_REVIEW`, `SUPPORTING_REVIEWS`, `REVIEWS_META`, and the old `Review` type.
- Homepage gets `export const revalidate = 86400` so a new monthly scrape surfaces within a day without going dynamic.

Avatars: v1 renders **initials + a Google "G" mark** (fully server-rendered, no external image loads / CSP concerns). Real Google avatar images are a possible later enhancement (`avatarUrl` is already stored).

## Verification

- Local: run the fetch script against the real listing → confirm row written; load the homepage (dev) → confirm early-days state renders (1 textless review → no cards, CTA shown) and no "213 / 4.9" anywhere.
- CI: `workflow_dispatch` the Action once → green run + row updated.
- `tsc` clean.

## Out of scope

- Per-service review filtering, replies, review moderation.
- Official Places API swap (kept trivial for later).
- Rendering Google avatar images (v1 uses initials + G mark).

## Commit plan

1. Spec.
2. `reviews_cache` migration (+ apply via `maple-db-push`).
3. Fetch script + `.github/scripts/package.json`.
4. Workflow + set repo secrets (fixes keep-alive too).
5. Web: schema, config, reader; rebuild `Reviews.tsx`; delete fake content; homepage ISR.
6. Pillars honest copy.
7. HANDOVER update + end-to-end verify.
