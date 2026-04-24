import HeroSection from "../components/HeroSection";
import QuoteSection from "../components/QuoteSection";
import AboutUsSection from "../components/AboutUsSection";
import OurStrategySection from "../components/OurStrategySection";
import OurImpactSection from "../components/OurImpactSection";
import JoinNowSection from "../components/JoinNowSection";
import StatsSection from "../components/StatsSection";
import SocialProofSection from "../components/SocialProofSection";
import FooterSection from "../components/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <QuoteSection />
      <AboutUsSection />
      <OurStrategySection />
      <OurImpactSection />
      <JoinNowSection />
      <StatsSection />
      <SocialProofSection />
      <FooterSection />
    </main>
  );
}
