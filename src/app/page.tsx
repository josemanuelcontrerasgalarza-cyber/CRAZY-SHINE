import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { Perks } from "@/components/sections/Perks";
import { Garage } from "@/components/sections/Garage";
import { Essence } from "@/components/sections/Essence";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Booking } from "@/components/sections/Booking";
import { Contact } from "@/components/sections/Contact";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoWash",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    ...(siteConfig.location.label ? { address: siteConfig.location.label } : {}),
    ...(siteConfig.instagram.url ? { sameAs: [siteConfig.instagram.url] } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de detailing",
      itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.summary } })),
    },
  };

  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-bone focus:px-4 focus:py-2 focus:text-ink">
        Saltar al contenido
      </a>
      <SmoothScroll />
      <Navbar />
      <main id="contenido">
        <Hero />
        <Marquee />
        <Services />
        <Perks />
        <Garage />
        <Marquee variant="band" />
        <Essence />
        <BeforeAfter />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
