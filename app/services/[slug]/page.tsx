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

  return (
    <>
      <Nav />
      <ServiceDetailPage service={service} />
      <CtaBand />
      <Footer />
    </>
  );
}
