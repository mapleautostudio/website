import {
  ShieldCheck,
  Circle,
  Wrench,
  Grid2x2,
  Sailboat,
  Briefcase,
  Camera,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  num: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  cardDescription: string;
  cardFooter: { from: string; duration: string };
  span: 6 | 4 | 12;
  navGroup: "main" | "more";
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
  };
  heroImage?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    objectPosition?: string;
  };
  heroPlaceholder?: { meta: string[] };
  packages?: Array<{ name: string; duration: string; description: string }>;
  details?: string[];
  faq: Array<{ q: string; a: string }>;
};

export const SERVICES: Service[] = [
  {
    slug: "detailing-packages",
    num: "01",
    title: "Detailing packages.",
    shortTitle: "Detailing packages",
    icon: ShieldCheck,
    cardDescription:
      "Full interior + exterior detail. Photographed before/after. Quoted by vehicle size and condition — not by guesswork.",
    cardFooter: { from: "QUOTE BY VEHICLE", duration: "HALF DAY" },
    span: 6,
    navGroup: "main",
    hero: {
      eyebrow: "DETAILING · 4 PACKAGES",
      headline: "Detailing, by package.",
      sub: "Choose the level of correction. We document every step on a per-vehicle work order, photographed before and after.",
    },
    heroPlaceholder: {
      meta: ["4 PACKAGES", "HALF DAY TO MULTI-DAY", "QUOTED BY VEHICLE"],
    },
    packages: [
      {
        name: "Express",
        duration: "2h",
        description: "Wash, decon, vacuum, interior wipe-down. Daily-driver upkeep.",
      },
      {
        name: "Full",
        duration: "Half day",
        description: "Express plus clay bar, leather conditioning, sealant, wheel-well dressing.",
      },
      {
        name: "Premium",
        duration: "Full day",
        description: "Full plus single-stage paint correction, engine bay detail, glass treatment.",
      },
      {
        name: "Concours",
        duration: "1–2 days",
        description: "Multi-stage correction, full ceramic prep, every panel photographed.",
      },
    ],
    faq: [
      { q: "How long does a full detail last?", a: "Three to four months for a Full, six to nine for Premium, twelve-plus for Concours with ceramic." },
      { q: "What's the difference between detail and correction?", a: "Detail removes dirt and contaminants. Correction removes scratches and swirl marks from the clear coat." },
      { q: "Do you do mobile?", a: "Yes — pickup and dropoff available within Saskatoon city limits on most packages. Ask when booking and we'll quote it." },
    ],
  },
  {
    slug: "ceramic-coating",
    num: "02",
    title: "Ceramic coating.",
    shortTitle: "Ceramic coating",
    icon: Circle,
    cardDescription: "Pro-grade ceramic, multi-stage prep. We document every panel before coating goes down.",
    cardFooter: { from: "QUOTE BY VEHICLE", duration: "1–2 DAYS" },
    span: 6,
    navGroup: "main",
    hero: {
      eyebrow: "CERAMIC · LIFETIME OPTIONS",
      headline: "Ceramic, by hand.",
      sub: "Pro-grade coatings applied panel by panel after multi-stage prep. Manufacturer-warranted up to lifetime.",
    },
    heroImage: {
      src: "/photos/ceramic-coating/hero.jpg",
      width: 2768,
      height: 4160,
      alt: "Ceramic coating applied to a darkened panel showing deep reflection.",
      objectPosition: "center",
    },
    details: [
      "Two-bucket wash, iron decon, clay bar, IPA wipe-down before any coating.",
      "Multi-stage paint correction included on Premium and above.",
      "Coatings: 3-year, 5-year, 7-year, lifetime — priced by vehicle.",
      "Self-cleaning hydrophobic finish; documented care guide on pickup.",
    ],
    faq: [
      { q: "How long does ceramic last?", a: "From three years for entry coatings to lifetime for the top tier — assuming care guide is followed." },
      { q: "Do I still need to wax?", a: "No. Ceramic replaces wax. Maintenance washes are recommended every 6–8 weeks." },
      { q: "What does it not protect against?", a: "Stone chips, deep scratches, or impact damage. For that, see paint protection film." },
    ],
  },
  {
    slug: "paint-correction",
    num: "03",
    title: "Paint correction.",
    shortTitle: "Paint correction",
    icon: Wrench,
    cardDescription:
      "One, two, or three-stage correction. We measure paint thickness before any compound touches it.",
    cardFooter: { from: "QUOTE BY VEHICLE", duration: "4–8H" },
    span: 4,
    navGroup: "main",
    hero: {
      eyebrow: "CORRECTION · MEASURED",
      headline: "Correction, on the record.",
      sub: "Single, two, or three-stage compound and polish. Paint thickness measured before any pad touches the panel.",
    },
    heroImage: {
      src: "/photos/paint-correction/hero.jpg",
      width: 4928,
      height: 3264,
      alt: "Paint correction in progress on a polished panel under shop lights.",
      objectPosition: "center",
    },
    details: [
      "Paint thickness gauge readings recorded per panel before correction starts.",
      "Single stage: removes light marring. Two stage: swirl marks. Three stage: deeper scratches.",
      "Photographed before, mid-correction, and after — sent to your phone.",
      "Pairs naturally with ceramic coating to lock in the finish.",
    ],
    faq: [
      { q: "Will you remove this scratch?", a: "If it's in the clear coat, almost always yes. If it's through to the base coat, no — we'll quote a touch-up instead." },
      { q: "How many stages do I need?", a: "We measure and tell you. We'd rather quote less and stop early than oversell stages." },
      { q: "Can I get correction without ceramic?", a: "Yes, but the finish degrades faster without protection. We'll show you the tradeoff." },
    ],
  },
  {
    slug: "window-tint",
    num: "04",
    title: "Window tint.",
    shortTitle: "Window tint",
    icon: Grid2x2,
    cardDescription: "Carbon and ceramic films, lifetime warranty. Cut on plotter, installed dust-free.",
    cardFooter: { from: "QUOTE BY VEHICLE", duration: "2–3H" },
    span: 4,
    navGroup: "main",
    hero: {
      eyebrow: "TINT · LIFETIME WARRANTY",
      headline: "Tint, dust-free.",
      sub: "Carbon and ceramic films cut on a computer plotter and installed in a sealed bay. No bubbles. No purple.",
    },
    heroImage: {
      src: "/photos/window-tint/hero.webp",
      width: 1597,
      height: 816,
      alt: "Window tint film shade comparison strip across glass panels.",
      objectPosition: "center",
    },
    details: [
      "Computer-cut on plotter — no blade on glass.",
      "Carbon film: 5%, 20%, 35%, 50% — lifetime warranty against fading and bubbling.",
      "Ceramic film: heat rejection up to 80%, glare reduction, signal-friendly.",
      "Front-to-back, partial, or strip-and-redo — quoted on visit.",
    ],
    faq: [
      { q: "Is this legal in Saskatchewan?", a: "Front side windows must allow at least 70% light through. We won't install anything below the legal limit." },
      { q: "How long until I can roll the windows down?", a: "Three to five days for the film to fully cure. We'll tell you on pickup." },
      { q: "What's covered by the lifetime warranty?", a: "Fading, bubbling, peeling, delamination. Not damage from glass cleaners with ammonia." },
    ],
  },
  {
    slug: "boat-services",
    num: "05",
    title: "Boat detailing.",
    shortTitle: "Boat services",
    icon: Sailboat,
    cardDescription:
      "Hull oxidation, gelcoat correction, and interior. Trailerable units only — we don't currently service in-water.",
    cardFooter: { from: "QUOTE BY VEHICLE", duration: "3–5H" },
    span: 4,
    navGroup: "main",
    hero: {
      eyebrow: "BOAT · TRAILERABLE",
      headline: "Boat detailing, trailerable.",
      sub: "Hull oxidation, gelcoat correction, vinyl interior cleaning. Drop the trailer, pick up the boat photographed start to finish.",
    },
    heroPlaceholder: {
      meta: ["TRAILERABLE", "UP TO 24 FEET", "GELCOAT + INTERIOR"],
    },
    details: [
      "Wash, decon, and oxidation removal on hull.",
      "Gelcoat compound and polish — single or two-stage.",
      "Vinyl interior cleaning, mildew removal, conditioner.",
      "Trailerable units only. We don't currently service in-water.",
    ],
    faq: [
      { q: "What size boats do you take?", a: "Up to 24 feet on a trailer. Above that, ask — we may refer to a marine specialist we trust." },
      { q: "Can you ceramic-coat a boat?", a: "Yes — gelcoat takes ceramic well. Ask for our marine ceramic option." },
      { q: "How long does it take?", a: "Three to five hours typical. Heavy oxidation can run a full day." },
    ],
  },
  {
    slug: "accessories",
    num: "06",
    title: "Car accessories & floor mats.",
    shortTitle: "Car accessories",
    icon: Briefcase,
    cardDescription:
      "Custom-fit floor mats, seat covers, dash cams, and cargo organizers — fitted in-shop or shipped.",
    cardFooter: { from: "QUOTE BY VEHICLE", duration: "CUSTOM FIT · IN-SHOP OR SHIP" },
    span: 12,
    navGroup: "more",
    hero: {
      eyebrow: "ACCESSORIES · CUSTOM-FIT",
      headline: "Accessories, fitted right.",
      sub: "Weather mats, seat covers, dash cams, and cargo organizers — fitted in-shop with cabling tucked clean, or shipped to your door.",
    },
    heroImage: {
      src: "/photos/accessories/supplies.jpg",
      width: 5419,
      height: 3613,
      alt: "Detailing supplies and accessories laid out on a workbench.",
      objectPosition: "center",
    },
    details: [
      "WeatherTech, Husky, and OEM floor mat options.",
      "Leather and neoprene seat covers — measured and quoted by VIN.",
      "Dash cam install with hardwire kits, no zip ties showing.",
      "Cargo organizers, roof racks, mud flaps — sourced and fitted.",
    ],
    faq: [
      { q: "Do you carry inventory?", a: "Common items yes. Most fit-by-VIN items are ordered after measurement." },
      { q: "How long for an install?", a: "Mats and covers: 30 minutes. Dash cam hardwire: 90 minutes." },
      { q: "Can you ship?", a: "Yes — we'll fit-verify by VIN, ship to your address, and send install instructions." },
    ],
  },
  {
    slug: "seat-covers",
    num: "07",
    title: "Seat covers & floor mats.",
    shortTitle: "Seat covers & floor mats",
    icon: Sparkles,
    cardDescription:
      "Tailored seat covers and floor mats fitted to your VIN — leather, neoprene, or all-weather.",
    cardFooter: { from: "QUOTE BY VEHICLE", duration: "FIT BY VIN" },
    span: 12,
    navGroup: "more",
    hero: {
      eyebrow: "COVERS & MATS · FIT BY VIN",
      headline: "Covers, fit by VIN.",
      sub: "Leather, neoprene, or all-weather covers and mats — measured against your VIN, fitted in-shop, photographed before pickup.",
    },
    heroImage: {
      src: "/photos/seat-covers/hero.jpg",
      width: 4480,
      height: 6720,
      alt: "Tailored seat cover detail showing stitching and fitment.",
      objectPosition: "center",
    },
    details: [
      "Custom seat covers in leather, neoprene, ballistic nylon — front, rear, third-row.",
      "WeatherTech / Husky / OEM mats, fit-verified before order.",
      "Dye-matched piping and stitching options.",
      "Removed for cleaning and reinstalled annually if requested.",
    ],
    faq: [
      { q: "How long is the lead time?", a: "Two to three weeks for custom-cut leather. Mats are 3–7 days." },
      { q: "Can you remove the original seat foam?", a: "No — we don't modify factory seat foam. We work over it." },
      { q: "Will the covers affect side airbags?", a: "All covers we sell are airbag-compatible and tagged accordingly." },
    ],
  },
  {
    slug: "photos",
    num: "08",
    title: "Photos.",
    shortTitle: "Photos",
    icon: Camera,
    cardDescription: "Before / after photographs from recent jobs.",
    cardFooter: { from: "GALLERY", duration: "UPDATED WEEKLY" },
    span: 12,
    navGroup: "more",
    hero: {
      eyebrow: "GALLERY",
      headline: "From the service log.",
      sub: "Photographs of recent work. Before and after on every job, taken on a calibrated phone in the same bay.",
    },
    faq: [],
  },
];

export const SERVICES_BY_SLUG = SERVICES.reduce((acc, s) => {
  acc[s.slug] = s;
  return acc;
}, {} as Record<string, Service>);

export const NAV_MAIN_SERVICES = SERVICES.filter((s) => s.navGroup === "main");
export const NAV_MORE_SERVICES = SERVICES.filter((s) => s.navGroup === "more");
export const HOMEPAGE_SERVICE_CARDS = SERVICES.slice(0, 6);
