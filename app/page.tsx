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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "Fusion Clinic",
    description:
      "Aluguel de consultórios mobiliados em Natal para profissionais de saúde.",
    image: "https://www.fusionclinic.com.br/og-image.jpg",
    "@id": "https://www.fusionclinic.com.br",
    url: "https://www.fusionclinic.com.br",
    telephone: "+5584999999999",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Exemplo, 123",
      addressLocality: "Natal",
      addressRegion: "RN",
      postalCode: "59000-000",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -5.79448,
      longitude: -35.211,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
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
