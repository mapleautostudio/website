import type { MetadataRoute } from "next";
import { SHOP } from "@/lib/content/contact";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SHOP.brand.full,
    short_name: SHOP.brand.wordmark,
    description: SHOP.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0f1418",
    theme_color: "#0f1418",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
