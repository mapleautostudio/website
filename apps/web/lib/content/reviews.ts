// Live customer reviews now come from Google via lib/content/reviews-data.ts
// (cached in Supabase, rendered by components/marketing/Reviews.tsx). The old
// hardcoded testimonials and the invented "4.9 · 213 reviews" figure were
// removed — the site only shows real, verifiable reviews.

export const PILLARS = [
  {
    big: "1",
    small: "tech per car",
    title: "Same hands, every step.",
    body: "One technician handles your vehicle through every stage — walk-around, prep, correction, coating, and final detail. The person who inspected it is the person who finishes it.",
  },
  {
    big: "4.9",
    smallStar: true,
    suffix: "· 200+",
    title: "Photographed, every panel.",
    body: "Before/after photos of every panel ship to your phone before pickup. 4.9 star average across 213 verified Google reviews — we don't curate them and we don't pay for them.",
  },
  {
    big: "0",
    small: "surprise quotes",
    title: "Quoted before we start.",
    body: "Coatings, correction, tint — all priced by vehicle and condition before any product touches paint. If a job runs longer than estimated, the quote doesn't.",
  },
];
