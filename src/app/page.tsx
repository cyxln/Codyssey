import HeroSection from "../components/HeroSection";
import QuoteSection from "../components/QuoteSection";
import AboutUsSection from "../components/AboutUsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <QuoteSection />
      <AboutUsSection />
    </main>
  );
}
