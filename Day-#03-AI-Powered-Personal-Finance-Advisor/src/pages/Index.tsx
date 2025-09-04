import Navigation from "@/components/Navigation";
import FinanceHero from "@/components/FinanceHero";
import AIFeatures from "@/components/AIFeatures";
import DashboardPreview from "@/components/DashboardPreview";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <FinanceHero />
      <AIFeatures />
      <DashboardPreview />
      <CTASection />
    </div>
  );
};

export default Index;
