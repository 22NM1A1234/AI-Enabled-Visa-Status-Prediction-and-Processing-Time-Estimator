import { MODEL_METRICS } from "@/lib/model";
import { BarChart3, Target, Activity } from "lucide-react";

const { classification: cls, regression: reg } = MODEL_METRICS;

const ModelMetrics = () => {
  return (
    <section className="py-24">
      <div className="container max-w-4xl">
        <h2 className="mb-3 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
          Model Performance
        </h2>
        <p className="mx-auto mb-12 text-center text-muted-foreground">
          Evaluated on {MODEL_METRICS.testSize.toLocaleString()} test samples from {MODEL_METRICS.datasetSize.toLocaleString()} records
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Classification */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Target className="h-4 w-4 text-primary" />
              Classification (Visa Status)
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Accuracy", value: `${(cls.accuracy * 100).toFixed(1)}%` },
                { label: "Precision", value: `${(cls.precision * 100).toFixed(1)}%` },
                { label: "Recall", value: `${(cls.recall * 100).toFixed(1)}%` },
                { label: "F1 Score", value: `${(cls.f1Score * 100).toFixed(1)}%` },
              ].map((m) => (
                <div key={m.label} className="rounded-lg bg-secondary p-3 text-center">
                  <div className="text-xs text-muted-foreground">{m.label}</div>
                  <div className="font-heading text-lg font-bold text-primary">{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Regression */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Activity className="h-4 w-4 text-primary" />
              Regression (Processing Time)
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "MAE", value: `${reg.mae} days` },
                { label: "RMSE", value: `${reg.rmse} days` },
                { label: "R²", value: reg.r2.toFixed(4) },
              ].map((m) => (
                <div key={m.label} className="rounded-lg bg-secondary p-3 text-center">
                  <div className="text-xs text-muted-foreground">{m.label}</div>
                  <div className="font-heading text-lg font-bold text-foreground">{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelMetrics;
