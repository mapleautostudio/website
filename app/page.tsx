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
