// Live customer reviews now come from Google via lib/content/reviews-data.ts
// (cached in Supabase, rendered by components/marketing/Reviews.tsx). The old
// hardcoded testimonials and the invented "4.9 · 213 reviews" figure were
// removed — the site only shows real, verifiable reviews.

type Pillar = {
  big: string;
  small?: string;
  smallStar?: boolean;
  suffix?: string;
  title: string;
  body: string;
};

export const PILLARS: Pillar[] = [
  {
    big: "1",
    small: "tech per car",
    title: "Same hands, every step.",
    body: "One technician handles your vehicle through every stage — walk-around, prep, correction, coating, and final detail. The person who inspected it is the person who finishes it.",
  },
  {
    big: "100",
    small: "% documented",
    title: "Photographed, every panel.",
    body: "Before/after photos of every panel land on your phone before pickup — the correction speaks for itself. And every Google review on our page is public: real customers, unedited, never paid for.",
  },
  {
    big: "0",
    small: "surprise quotes",
    title: "Quoted before we start.",
    body: "Coatings, correction, tint — all priced by vehicle and condition before any product touches paint. If a job runs longer than estimated, the quote doesn't.",
  },
];
