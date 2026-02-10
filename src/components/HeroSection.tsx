import { ArrowRight, Brain, Clock, Database } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { icon: Brain, value: "85.5%", label: "Classification Accuracy" },
  { icon: Clock, value: "R² 0.819", label: "Processing Time Model" },
  { icon: Database, value: "25,480", label: "Records Analyzed" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Neural network background" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center py-20 animate-fade-in">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="font-heading text-xs tracking-wider text-primary">
            ML-Powered Prediction Engine v2.0
          </span>
        </div>

        {/* Title */}
        <h1 className="mb-4 text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
          AI-Powered Visa Approval{" "}
          <span className="text-gradient block">&amp; Processing Time Predictor</span>
        </h1>

        <p className="mb-3 text-lg text-muted-foreground max-w-2xl">
          Ensemble machine learning models trained on 25,000+ historical visa records to estimate approval probability and processing timelines.
        </p>
        <p className="mb-10 text-sm text-muted-foreground/70 max-w-2xl">
          Gradient Boosting Regressor · Random Forest Classifier · 24 Engineered Features
        </p>

        {/* CTA */}
        <a
          href="#predict"
          className="group mb-16 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:scale-105 glow-md"
        >
          Start Prediction
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </a>

        {/* Stats */}
        <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card flex flex-col items-center gap-2 p-6 animate-pulse-glow">
              <stat.icon className="h-6 w-6 text-primary" />
              <span className="font-heading text-2xl font-bold text-foreground">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
