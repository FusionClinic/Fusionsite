import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ValuePropsSection } from "@/components/value-props-section";
import { LeadGenSection } from "@/components/lead-gen-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { PricingSection } from "@/components/pricing-section";
import { ListingsSection } from "@/components/listings-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FaqBlogSection } from "@/components/faq-blog-section"; // Componente Atualizado
import { Footer } from "@/components/footer";
import { StickyMobileCTA } from "@/components/sticky-mobile-cta";
import { getFeaturedRooms } from "@/lib/get-featured-rooms";
import { getRecentPosts } from "@/lib/get-recent-posts"; // <--- Importação Nova

// Cache ISR de 1 hora
export const revalidate = 3600;

export default async function HomePage() {
  // Busca dados em paralelo para ser mais rápido
  const [featuredRooms, recentPosts] = await Promise.all([
    getFeaturedRooms(),
    getRecentPosts(), // <--- Busca os posts
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: "Fusion Clinic",
    description:
      "Aluguel de consultórios mobiliados em Natal para profissionais de saúde.",
    image: "https://www.fusionclinic.com.br/og-image.jpg",
    "@id": "https://www.fusionclinic.com.br",
    url: "https://www.fusionclinic.com.br",
    telephone: "+5511919119054",
    address: {
      "@type": "PostalAddress",
      streetAddress: "R. da Saudade, 762",
      addressLocality: "Lagoa Nova, Natal",
      addressRegion: "RN",
      postalCode: "59056-125",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -5.8117973,
      longitude: -35.2131972,
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

      {/* Dados reais de Salas */}
      <ListingsSection rooms={featuredRooms} />

      <TestimonialsSection />

      {/* Dados reais de Blog */}
      <FaqBlogSection posts={recentPosts} />

      <Footer />
      <StickyMobileCTA />
    </main>
  );
}
