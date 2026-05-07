export const SERVICE_SLUGS = [
  "detailing-packages",
  "ceramic-coating",
  "paint-correction",
  "window-tint",
  "boat-services",
  "accessories",
  "seat-covers",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];
