export const metadata = {
  title: "Maple Auto Studio — Finish, calibrated.",
  description:
    "Independent detailing & accessories studio in Saskatoon. Detailing packages, ceramic coating, paint correction, window tint — by appointment.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Maple Auto Studio — Finish, calibrated.",
    description:
      "Independent detailing & accessories studio in Saskatoon. Detailing packages, ceramic coating, paint correction, window tint — by appointment.",
    url: "https://mapleautostudio.ca",
    siteName: "Maple Auto Studio",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Maple Auto Studio" }],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maple Auto Studio — Finish, calibrated.",
    description:
      "Independent detailing & accessories studio in Saskatoon. Detailing packages, ceramic coating, paint correction, window tint — by appointment.",
    images: ["/opengraph-image"],
  },
};

// Revalidate daily so the monthly Google-reviews refresh surfaces within a day
// without making the homepage dynamic.
export const revalidate = 86400;

import { Nav } from "@/components/marketing/Nav";
import { Hero } from "@/components/marketing/Hero";
import { Services } from "@/components/marketing/Services";
import { Pillars } from "@/components/marketing/Pillars";
import { Reviews } from "@/components/marketing/Reviews";
import { Visit } from "@/components/marketing/Visit";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Footer } from "@/components/marketing/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Pillars />
        <Reviews />
        <Visit />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
