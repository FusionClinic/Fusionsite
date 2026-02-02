import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ValuePropsSection } from "@/components/value-props-section";
import { LeadGenSection } from "@/components/lead-gen-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { PricingSection } from "@/components/pricing-section";
import { ListingsSection } from "@/components/listings-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FaqBlogSection } from "@/components/faq-blog-section";
import { Footer } from "@/components/footer";
import { StickyMobileCTA } from "@/components/sticky-mobile-cta";

export default function HomePage() {
  // SEO Local: Isso ajuda a aparecer no Google Maps e Box de Empresas
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Fusion Clinic",
    image: "https://fusionclinic.com.br/icon-light-32x32.png", // Substitua pela logo real
    "@id": "https://fusionclinic.com.br",
    url: "https://fusionclinic.com.br",
    telephone: "+5584999999999",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Afonso Pena, 1234", // Endereço Fictício - AJUSTE
      addressLocality: "Natal",
      addressRegion: "RN",
      postalCode: "59000-000", // AJUSTE
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -5.79448, // Coordenadas aproximadas de Natal
      longitude: -35.211,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "08:00",
      closes: "18:00",
    },
  };

  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <HeroSection />
      <ValuePropsSection />
      <LeadGenSection />
      <HowItWorksSection />
      <PricingSection />
      <ListingsSection />
      <TestimonialsSection />
      <FaqBlogSection />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
