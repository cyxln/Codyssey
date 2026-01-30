import HeroSection from "../components/HeroSection";
import QuoteSection from "../components/QuoteSection";
import AboutUsSection from "../components/AboutUsSection";
import OurStrategySection from "../components/OurStrategySection";
import OurImpactSection from "../components/OurImpactSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <QuoteSection />
      <AboutUsSection />
      <OurStrategySection />
      <OurImpactSection />
    </main>
  );
}
