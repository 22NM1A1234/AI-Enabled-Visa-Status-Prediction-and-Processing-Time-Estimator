import { ArrowRight, Brain, Clock, Database, CheckCircle2 } from "lucide-react";
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

      <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-12 py-20 animate-fade-in">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="font-heading text-xs tracking-wider text-primary">
              ML-Powered Prediction Engine v2.0
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            AI-Powered Visa Approval{" "}
            <span className="text-gradient block">&amp; Processing Time Predictor</span>
          </h1>

          <p className="mb-3 text-lg text-muted-foreground max-w-2xl">
            Ensemble machine learning models trained on 25,000+ historical visa records to estimate approval probability and processing timelines.
          </p>
          <p className="mb-10 text-sm text-muted-foreground/70 max-w-2xl">
            Gradient Boosting Regressor · Random Forest Classifier · 24 Engineered Features
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <a
              href="#predict"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:scale-105 glow-md"
            >
              Get Estimate Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-4 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              Learn How It Works
            </a>
          </div>
        </div>

        {/* Sample Prediction Card */}
        <div className="w-full max-w-sm">
          <div className="glass-card p-6 space-y-4 animate-pulse-glow">
            <div className="text-xs font-heading font-bold tracking-wider text-muted-foreground uppercase">
              Sample Prediction
            </div>
            <div className="text-center py-2">
              <span className="font-heading text-5xl font-bold text-primary">22</span>
              <div className="text-sm text-muted-foreground mt-1">estimated days</div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-t border-border/50 pt-3">
                <span className="text-muted-foreground">Education</span>
                <span className="font-heading font-bold text-foreground">Master's - Asia</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Range</span>
                <span className="font-heading font-bold text-foreground">19-25 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Risk Level</span>
                <span className="font-heading font-bold text-primary">Low</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Approval Likelihood</span>
                <span className="font-heading font-bold text-primary">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats below hero - moved outside the flex container */}
      <div className="absolute bottom-0 left-0 right-0 pb-8">
        <div className="container">
          <div className="grid w-full max-w-3xl mx-auto grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card flex flex-col items-center gap-2 p-6 animate-pulse-glow">
                <stat.icon className="h-6 w-6 text-primary" />
                <span className="font-heading text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
