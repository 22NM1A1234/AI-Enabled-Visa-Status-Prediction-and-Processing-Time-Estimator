import { Brain } from "lucide-react";
import { featureImportance } from "@/lib/visaData";

const FeatureImportanceBars = () => {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Brain className="h-4 w-4" />
        ML Feature Importance
      </div>

      <div className="space-y-3">
        {featureImportance.map((f) => (
          <div key={f.feature} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-foreground">{f.feature}</span>
              <span className="font-heading font-bold text-primary">{f.importance}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-1000"
                style={{ width: `${f.importance}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureImportanceBars;
