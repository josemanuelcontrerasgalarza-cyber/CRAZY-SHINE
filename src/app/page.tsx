import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { ArtOfDetailing } from "@/components/sections/ArtOfDetailing";
import { Marquee } from "@/components/sections/Marquee";
import { Services } from "@/components/sections/Services";
import { Garage } from "@/components/sections/Garage";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { WhyCrazyShine } from "@/components/sections/WhyCrazyShine";
import { FinalCta } from "@/components/sections/FinalCta";
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
      name: "Detailing services",
      itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.summary } })),
    },
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-volt focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <SmoothScroll />
      <Navbar />
      <main id="main">
        <Hero />
        <ArtOfDetailing />
        <Marquee />
        <Services />
        <Garage />
        <BeforeAfter />
        <WhyCrazyShine />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
