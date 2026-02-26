import { BarChart3 } from "lucide-react";
import type { UserInput, PredictionResult } from "@/lib/model";

interface Props {
  input: UserInput;
  result: PredictionResult;
}

const FeatureWaterfall = ({ input, result }: Props) => {
  const baseline = 28.4; // model intercept
  const impacts = [
    { label: "Job Experience", value: input.hasJobExperience ? -5.23 : 0, color: input.hasJobExperience ? "bg-primary" : "bg-muted" },
    { label: "Education", value: input.education === "Doctorate" ? -4.12 : input.education === "Master's" ? -2.56 : input.education === "High School" ? 3.89 : 0, color: "" },
    { label: "Prevailing Wage", value: input.prevailingWage > 73812 ? -3.45 : 1.5, color: "" },
    { label: "Full-time", value: input.fullTimePosition ? -2.14 : 0, color: "" },
    { label: "Job Training", value: input.requiresJobTraining ? 4.87 : 0, color: "" },
    { label: "Continent", value: input.continent === "Europe" ? -1.78 : input.continent === "Asia" ? 2.31 : 0, color: "" },
    { label: "Region", value: input.region === "South" ? 1.56 : input.region === "Northeast" ? -1.23 : 0, color: "" },
  ].filter(i => i.value !== 0);

  const maxAbs = Math.max(...impacts.map(i => Math.abs(i.value)), 1);

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <BarChart3 className="h-4 w-4" />
        Feature Impact Waterfall
      </div>
      <p className="text-xs text-muted-foreground">
        How each factor shifts your processing time from the baseline ({baseline} days avg)
      </p>

      <div className="space-y-3">
        {impacts.map((impact, i) => {
          const isNeg = impact.value < 0;
          const widthPct = Math.min(100, (Math.abs(impact.value) / maxAbs) * 100);
          return (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-foreground">{impact.label}</span>
                <span className={`font-bold ${isNeg ? "text-primary" : "text-destructive"}`}>
                  {isNeg ? "" : "+"}{impact.value.toFixed(1)} days
                </span>
              </div>
              <div className="flex h-3 items-center">
                <div className="relative h-full w-full rounded-full bg-secondary">
                  <div
                    className={`absolute h-full rounded-full transition-all duration-700 ${isNeg ? "bg-primary" : "bg-destructive"}`}
                    style={{
                      width: `${widthPct}%`,
                      ...(isNeg ? { right: "50%", borderRadius: "9999px 0 0 9999px" } : { left: "50%", borderRadius: "0 9999px 9999px 0" }),
                    }}
                  />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between rounded-lg bg-secondary p-3">
        <span className="text-xs font-medium text-foreground">Final Prediction</span>
        <span className="font-heading text-sm font-bold text-primary">{result.processingDays} days</span>
      </div>
    </div>
  );
};

export default FeatureWaterfall;
