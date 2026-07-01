import { Wrench, PawPrint, Lightbulb, Wind, type LucideIcon } from "lucide-react";

export type PackageAccent = "entry" | "returning" | "signature" | "gold";

export type PricingPackage = {
  slug: string;
  tier: string;
  accent: PackageAccent;
  name: string;
  sub: string;
  price: string;
  priceNote: string;
  sizes: string;
  featuresHeading: string;
  features: string[];
  idealLabel: string;
  ideal: string;
  mostPopular?: boolean;
};

export type PackageAddon = {
  name: string;
  desc: string;
  price: string;
  ask?: boolean;
  icon: LucideIcon;
};

// Placeholder pricing mirrors the local market anchor (Saskatoon Auto Connection);
// the owner sets final numbers. Refresh reuses the old "Interior Care" slot pricing.
export const PACKAGES: PricingPackage[] = [
  {
    slug: "mini-clean",
    tier: "Entry",
    accent: "entry",
    name: "Mini Clean",
    sub: "Quick maintenance refresh for a car already in decent shape.",
    price: "$159",
    priceNote: "/ detail",
    sizes: "Flat rate · all vehicles",
    featuresHeading: "What's included",
    features: [
      "Exterior wash & dry",
      "Interior vacuum",
      "Windows wiped down",
      "~1 hour on site",
    ],
    idealLabel: "Ideal for",
    ideal: "first visits, or upkeep between bigger details.",
  },
  {
    slug: "refresh",
    tier: "Returning",
    accent: "returning",
    name: "Refresh",
    sub: "Keeps a past full detail looking new between the big jobs.",
    price: "$249",
    priceNote: "/ from",
    sizes: "Trucks $269 · Vans & large SUVs $299",
    featuresHeading: "Everything in Mini, plus",
    features: [
      "Maintenance wash & dry",
      "Interior wipe-down",
      "Quick protectant",
    ],
    idealLabel: "Returning clients only",
    ideal: "you've had a full detail with us.",
  },
  {
    slug: "complete-care",
    tier: "Signature",
    accent: "signature",
    name: "Complete Care",
    sub: "Our signature full inside-and-out detail. Shampoo standard.",
    price: "$299",
    priceNote: "/ from",
    sizes: "Trucks $325 · Vans & large SUVs $349",
    featuresHeading: "Everything in Refresh, plus",
    features: [
      "Full exterior hand wash, door jambs",
      "Tire & wheel deep clean",
      "Carpets & mats shampooed",
      "Glass in & out · trunk cleaned",
    ],
    idealLabel: "Ideal for",
    ideal: "your first real deep detail with the studio.",
    mostPopular: true,
  },
  {
    slug: "master-detail",
    tier: "Gold",
    accent: "gold",
    name: "Master Detail",
    sub: "Paint correction & power polishing for a show-car finish.",
    price: "$579",
    priceNote: "/ from",
    sizes: "Trucks $599 · Vans & large SUVs $629",
    featuresHeading: "Everything in Complete, plus",
    features: [
      "Engine bay wash & dress",
      "Scratch & swirl removal",
      "Power polishing (paint correction)",
    ],
    idealLabel: "Ideal for",
    ideal: "restoration, pre-sale, or show day.",
  },
];

export const PACKAGE_ADDONS: PackageAddon[] = [
  {
    name: "Engine Bay Clean",
    desc: "Engine bay wash & dress, plus center console & glovebox detail.",
    price: "+$30",
    icon: Wrench,
  },
  {
    name: "Pet Hair Removal",
    desc: "Thorough extraction of embedded pet hair from upholstered surfaces.",
    price: "Ask for pricing",
    ask: true,
    icon: PawPrint,
  },
  {
    name: "Headlight Restoration",
    desc: "Polish away yellowing and haze to restore clarity and visibility.",
    price: "Ask for pricing",
    ask: true,
    icon: Lightbulb,
  },
  {
    name: "Ozone Treatment",
    desc: "Eliminates deep-set odors — smoke, mildew, food — at the molecular level.",
    price: "Ask for pricing",
    ask: true,
    icon: Wind,
  },
];
