import { TrendingUp, Database, Wrench, TreeDeciduous } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Gradient Boosting",
    description:
      "Best-performing regressor with MAE ≈ 4.4 days, RMSE ≈ 5.7 days, and R² ≈ 0.82 for processing time prediction.",
  },
  {
    icon: Database,
    title: "Data Pipeline",
    description:
      "25K+ records preprocessed: missing value handling, duplicate removal, categorical encoding, and normalization.",
  },
  {
    icon: Wrench,
    title: "Feature Engineering",
    description:
      "24+ engineered features including high_processing_delay, high_wage_flag, continent & region encodings.",
  },
  {
    icon: TreeDeciduous,
    title: "Random Forest Classifier",
    description:
      "Visa status classification achieving 85%+ accuracy with robust actual vs predicted validation.",
  },
];

const PipelineSection = () => {
  return (
    <section className="py-24">
      <div className="container">
        <h2 className="mb-3 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
          ML Pipeline
        </h2>
        <p className="mx-auto mb-14 max-w-2xl text-center text-muted-foreground">
          End-to-end framework: preprocessing → EDA → feature engineering → model
          training → real-time prediction.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass-card group p-6 transition-all hover:border-primary/40 hover:glow-sm"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PipelineSection;
