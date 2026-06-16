import { notFound } from "next/navigation";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { CtaBand } from "@/components/marketing/CtaBand";
import { ServiceDetailPage } from "@/components/marketing/ServiceDetailPage";
import { SERVICES, SERVICES_BY_SLUG } from "@/lib/content/services";

export function generateStaticParams() {
  return SERVICES.filter((s) => s.slug !== "photos").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES_BY_SLUG[slug];
  if (!service) return {};
  return {
    title: `${service.shortTitle} — Maple Auto Studio`,
    description: service.hero.sub,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.shortTitle} — Maple Auto Studio`,
      description: service.hero.sub,
      url: `https://mapleautostudio.ca/services/${service.slug}`,
      siteName: "Maple Auto Studio",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Maple Auto Studio" }],
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${service.shortTitle} — Maple Auto Studio`,
      description: service.hero.sub,
      images: ["/opengraph-image"],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES_BY_SLUG[slug];
  if (!service || service.slug === "photos") notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.shortTitle,
    description: service.hero.sub,
    provider: {
      "@type": "LocalBusiness",
      name: "Maple Auto Studio",
      url: "https://mapleautostudio.ca",
      telephone: "+16398001000",
      address: {
        "@type": "PostalAddress",
        streetAddress: "331 60 ST E",
        addressLocality: "Saskatoon",
        addressRegion: "SK",
        postalCode: "S7K 8C8",
        addressCountry: "CA",
      },
    },
    areaServed: { "@type": "City", name: "Saskatoon" },
    url: `https://mapleautostudio.ca/services/${service.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <ServiceDetailPage service={service} />
      <CtaBand />
      <Footer />
    </>
  );
}
