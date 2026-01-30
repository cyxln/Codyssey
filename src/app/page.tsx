import HeroSection from "../components/HeroSection";
import QuoteSection from "../components/QuoteSection";
import AboutUsSection from "../components/AboutUsSection";
import OurStrategySection from "../components/OurStrategySection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <QuoteSection />
      <AboutUsSection />
      <OurStrategySection />
    </main>
  );
}
