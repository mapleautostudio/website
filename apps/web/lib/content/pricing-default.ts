import type { PricingConfig } from "./pricing-schema";

// Canonical default — mirrors the pricing shown before this became DB-editable.
// Two jobs: (1) seed for the Supabase `pricing_content` row, (2) build-time
// fallback so the public page always renders even if the DB is empty or down.
// Matrix cells are "yes" | "no" | a custom label. Card bullets are DERIVED from
// this matrix (services a package gains vs the next-cheaper one), so the rows
// below are ordered cheapest → most cumulative.
export const DEFAULT_PRICING: PricingConfig = {
  meta: {
    title: "Detailing packages & pricing",
    subtitle:
      "Four levels of clean, every detail done by our experts in Saskatoon — documented before & after and quoted by vehicle size.",
  },
  packages: [
    {
      id: "mini-clean",
      name: "Mini Clean",
      tier: "Entry",
      accent: "entry",
      mostPopular: false,
      tagline: "Quick maintenance refresh for a car already in decent shape.",
      priceNote: "/ detail",
      idealLabel: "Ideal for",
      ideal: "first visits, or upkeep between bigger details.",
    },
    {
      id: "refresh",
      name: "Refresh",
      tier: "Returning",
      accent: "returning",
      mostPopular: false,
      tagline: "Keeps a past full detail looking new between the big jobs.",
      priceNote: "/ from",
      idealLabel: "Returning clients only",
      ideal: "you've had a full detail with us.",
    },
    {
      id: "complete-care",
      name: "Complete Care",
      tier: "Signature",
      accent: "signature",
      mostPopular: true,
      tagline: "Our signature full inside-and-out detail. Shampoo standard.",
      priceNote: "/ from",
      idealLabel: "Ideal for",
      ideal: "your first real deep detail with the studio.",
    },
    {
      id: "master-detail",
      name: "Master Detail",
      tier: "Gold",
      accent: "gold",
      mostPopular: false,
      tagline: "Paint correction & power polishing for a show-car finish.",
      priceNote: "/ from",
      idealLabel: "Ideal for",
      ideal: "restoration, pre-sale, or show day.",
    },
  ],
  services: [
    { id: "ext-wash", label: "Exterior wash & dry", values: ["Quick", "yes", "yes", "yes"] },
    { id: "int-vacuum", label: "Interior vacuum", values: ["yes", "yes", "yes", "yes"] },
    { id: "glass", label: "Window / glass cleaning", values: ["Wipe", "yes", "yes", "yes"] },
    { id: "int-wipe", label: "Interior wipe-down", values: ["no", "yes", "yes", "yes"] },
    { id: "protectant", label: "Quick protectant applied", values: ["no", "yes", "yes", "yes"] },
    { id: "hand-wash", label: "Full exterior hand wash & door jambs", values: ["no", "no", "yes", "yes"] },
    { id: "wheels", label: "Tire & wheel deep clean & dress", values: ["no", "no", "yes", "yes"] },
    { id: "shampoo", label: "Carpets, seats & mats shampooed", values: ["no", "no", "yes", "yes"] },
    { id: "trunk", label: "Trunk cleaned & vacuumed", values: ["no", "no", "yes", "yes"] },
    { id: "engine-bay", label: "Engine bay wash & dress", values: ["no", "no", "no", "yes"] },
    { id: "swirl", label: "Scratch & swirl mark removal", values: ["no", "no", "no", "yes"] },
    { id: "polish", label: "Power polishing (paint correction)", values: ["no", "no", "no", "yes"] },
  ],
  prices: [
    {
      id: "cars",
      label: "Cars & small SUVs (2-row)",
      shortLabel: "Cars",
      values: ["$159", "$249", "$299", "$579"],
      headline: true,
    },
    {
      id: "trucks",
      label: "Trucks (reg / super / crew)",
      shortLabel: "Trucks",
      values: ["—", "$269", "$325", "$599"],
      headline: false,
    },
    {
      id: "vans",
      label: "Vans & large SUVs (3-row)",
      shortLabel: "Vans",
      values: ["—", "$299", "$349", "$629"],
      headline: false,
    },
  ],
  addons: [
    {
      id: "engine-bay-clean",
      name: "Engine Bay Clean",
      desc: "Engine bay wash & dress, plus center console & glovebox detail.",
      price: "+$30",
    },
    {
      id: "pet-hair",
      name: "Pet Hair Removal",
      desc: "Thorough extraction of embedded pet hair from upholstered surfaces.",
      price: "Ask for pricing",
    },
    {
      id: "headlight",
      name: "Headlight Restoration",
      desc: "Polish away yellowing and haze to restore clarity and visibility.",
      price: "Ask for pricing",
    },
    {
      id: "ozone",
      name: "Ozone Treatment",
      desc: "Eliminates deep-set odors — smoke, mildew, food — at the molecular level.",
      price: "Ask for pricing",
    },
  ],
};
