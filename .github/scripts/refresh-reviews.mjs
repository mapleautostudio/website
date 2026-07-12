// Monthly Google-reviews refresh.
//
// Scrapes the shop's Google Maps listing, normalizes + validates the reviews,
// and upserts them into public.reviews_cache (row 1) via PostgREST. The
// homepage reads from that cache, so this script being down never breaks the
// site — it just leaves the last-good data in place.
//
// Fail-safe: any scrape error exits non-zero WITHOUT writing, so a bad run
// shows red in the Actions tab but never overwrites good data with nothing.
//
// $0, no API key, no Google account. To move to the official Places API later,
// only scrapeReviews() below needs to change.

import { scraper } from "google-maps-review-scraper";

// The listing, in the `!1s<hex>:<hex>!` form the scraper's URL parser requires.
const PLACE_URL =
  "https://www.google.com/maps/place/Maple+Auto+Studio/data=!4m2!3m1!1s0x0:0xb7f96c3e33500cf8!17s";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY (set them as repo secrets).",
  );
  process.exit(1);
}

async function scrapeReviews() {
  const raw = await scraper({ url: PLACE_URL, sort_type: "newest", clean: true });
  if (!Array.isArray(raw)) {
    throw new Error(`scraper returned ${typeof raw}, expected array`);
  }
  return raw;
}

function normalize(raw) {
  const reviews = [];
  for (const r of raw) {
    const rating = Number(r?.review?.rating);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) continue; // skip junk
    const text = (r?.review?.text ?? "").toString().trim();
    const ms = Number(r?.time?.published);
    reviews.push({
      id: String(r?.review_id ?? `${r?.author?.id ?? "anon"}-${ms || reviews.length}`),
      author: (r?.author?.name ?? "Google user").toString().trim() || "Google user",
      avatarUrl: r?.author?.profile_url ? String(r.author.profile_url) : null,
      rating: Math.round(rating),
      text: text.length ? text : null,
      publishedAt: Number.isFinite(ms) && ms > 0 ? new Date(ms).toISOString() : null,
    });
  }

  const totalCount = reviews.length;
  const textCount = reviews.filter((r) => r.text).length;
  const averageRating =
    totalCount === 0
      ? 0
      : Math.round((reviews.reduce((s, r) => s + r.rating, 0) / totalCount) * 10) / 10;

  return {
    reviews,
    totalCount,
    textCount,
    averageRating,
    fetchedAt: new Date().toISOString(),
  };
}

async function upsert(payload) {
  const res = await fetch(`${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/reviews_cache`, {
    method: "POST",
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify({ id: 1, payload, updated_at: new Date().toISOString() }),
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) {
    throw new Error(`Supabase upsert failed: ${res.status} ${await res.text()}`);
  }
}

try {
  const raw = await scrapeReviews();
  const payload = normalize(raw);
  await upsert(payload);
  console.log(
    `Reviews refreshed: ${payload.totalCount} total, ${payload.textCount} with text, avg ${payload.averageRating}.`,
  );
} catch (err) {
  console.error(`Refresh failed (cache left unchanged): ${err?.message ?? err}`);
  process.exit(1);
}
