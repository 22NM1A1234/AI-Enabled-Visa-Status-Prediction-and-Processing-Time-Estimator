import { Database, Brain, Zap } from "lucide-react";

const steps = [
  {
    icon: Database,
    title: "Data Collection",
    description: "25,480+ historical visa application records with 24 engineered features are preprocessed and normalized.",
  },
  {
    icon: Brain,
    title: "Model Training",
    description: "Gradient Boosting & Random Forest models are trained with 80/20 split and hyperparameter tuning for optimal accuracy.",
  },
  {
    icon: Zap,
    title: "Real-time Prediction",
    description: "Your inputs are encoded and fed through trained model weights to produce approval probability and processing time estimates.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container max-w-4xl">
        <h2 className="mb-3 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
          How It Works
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          This system uses ensemble machine learning models trained on 25,000+ historical visa records to estimate approval probability and processing timelines.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="glass-card p-6 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="font-heading text-xs text-primary tracking-wider">STEP {i + 1}</div>
              <h3 className="font-heading text-lg font-bold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
