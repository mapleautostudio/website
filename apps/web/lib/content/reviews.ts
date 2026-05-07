export type Review = {
  stars: 5;
  body: string;
  author: string;
  vehicle: string;
  service: string;
  date?: string;
};

export const HERO_REVIEW: Review = {
  stars: 5,
  body: "They photographed every swirl and water spot before correction, then sent the after shots panel-by-panel. The depth of black on the hood is unreal. Worth every dollar of the two-stage with ceramic.",
  author: "Priya N.",
  vehicle: "2019 Audi Q5",
  service: "2-stage + ceramic",
  date: "MAR 2026",
};

export const SUPPORTING_REVIEWS: Review[] = [
  {
    stars: 5,
    body: "Booked the full interior detail before a long road trip. Pet hair gone, leather conditioned, console looked factory. Same-day pickup.",
    author: "Marcus T.",
    vehicle: "2017 Lexus IS",
    service: "Interior detail",
  },
  {
    stars: 5,
    body: "Ceramic tint front-to-back, lifetime warranty, no bubbles, no purple after a year. Way better install than my last shop.",
    author: "Danielle R.",
    vehicle: "2024 Tesla Model 3",
    service: "Ceramic tint",
  },
  {
    stars: 5,
    body: "Custom-fit weather mats and a dash cam install in one visit. Wiring tucked clean, no zip ties showing.",
    author: "Sam K.",
    vehicle: "2016 Subaru Outback",
    service: "Accessories",
  },
];

export const REVIEWS_META = {
  count: "213 reviews",
  source: "Google",
  averageStar: "4.9",
  averageStarSuffix: "200+",
};

export const PILLARS = [
  {
    big: "12",
    small: "years",
    title: "One detailer, your car.",
    body: "Khus has 12 years on paint, ceramic, and interior work. The same hands prep, polish, and coat your vehicle from drop-off to pickup — no rotation between staff mid-job.",
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
