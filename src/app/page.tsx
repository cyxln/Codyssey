import HeroSection from "../components/HeroSection";
import QuoteSection from "../components/QuoteSection";
import AboutUsSection from "../components/AboutUsSection";
import OurStrategySection from "../components/OurStrategySection";
import OurImpactSection from "../components/OurImpactSection";
import JoinNowSection from "../components/JoinNowSection";
import StatsSection from "../components/StatsSection";
import SocialProofSection from "../components/SocialProofSection";
import FooterSection from "../components/FooterSection";
import ScrollReveal from "../components/elements/ScrollReveal";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>
      <ScrollReveal>
        <QuoteSection />
      </ScrollReveal>
      <ScrollReveal>
        <AboutUsSection />
      </ScrollReveal>
      <ScrollReveal>
        <OurStrategySection />
      </ScrollReveal>
      <ScrollReveal>
        <OurImpactSection />
      </ScrollReveal>
      <ScrollReveal>
        <JoinNowSection />
      </ScrollReveal>
      <StatsSection />
      <SocialProofSection />
      <FooterSection />
    </main>
  );
}
