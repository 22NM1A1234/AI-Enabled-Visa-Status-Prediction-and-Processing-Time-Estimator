import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollingStats from "@/components/ScrollingStats";
import PipelineSection from "@/components/PipelineSection";
import PredictionForm from "@/components/PredictionForm";
import HowItWorks from "@/components/HowItWorks";
import ModelMetrics from "@/components/ModelMetrics";
import TechStack from "@/components/TechStack";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ScrollingStats />
      <PipelineSection />
      <PredictionForm />
      <HowItWorks />
      <ModelMetrics />
      <TechStack />
      <Footer />
    </div>
  );
};

export default Index;
