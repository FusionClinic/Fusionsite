import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ValuePropsSection } from "@/components/value-props-section"
import { LeadGenSection } from "@/components/lead-gen-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { PricingSection } from "@/components/pricing-section"
import { ListingsSection } from "@/components/listings-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { FaqBlogSection } from "@/components/faq-blog-section"
import { Footer } from "@/components/footer"
import { StickyMobileCTA } from "@/components/sticky-mobile-cta"

export default function HomePage() {
  return (
    <main className="relative">
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
  )
}
