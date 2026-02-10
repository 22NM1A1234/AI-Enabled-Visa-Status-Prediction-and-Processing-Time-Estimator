import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ScrollingStats from "@/components/ScrollingStats";
import PipelineSection from "@/components/PipelineSection";
import PredictionForm from "@/components/PredictionForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ScrollingStats />
      <PipelineSection />
      <PredictionForm />
    </div>
  );
};

export default Index;
