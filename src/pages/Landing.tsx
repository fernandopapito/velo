import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import SpecsSection from "@/components/landing/SpecsSection";
import CTASection from "@/components/landing/CTASection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background" data-testid="landing-page">
      <Header />
      <main>
        <HeroSection />
        <SpecsSection />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
