import { useState, useMemo } from "react";
import { FlaskConical, ArrowUpDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { type UserInput, type PredictionResult, predict } from "@/lib/model";

interface Props {
  baseInput: UserInput;
  baseResult: PredictionResult;
}

const scenarios = [
  { label: "With Job Experience", key: "hasJobExperience", value: true },
  { label: "Without Job Experience", key: "hasJobExperience", value: false },
  { label: "Doctorate Education", key: "education", value: "Doctorate" },
  { label: "High School Education", key: "education", value: "High School" },
  { label: "Full-time Position", key: "fullTimePosition", value: true },
  { label: "Part-time Position", key: "fullTimePosition", value: false },
  { label: "High Wage ($120K)", key: "prevailingWage", value: 120000 },
  { label: "Low Wage ($35K)", key: "prevailingWage", value: 35000 },
] as const;

const WhatIfAnalysis = ({ baseInput, baseResult }: Props) => {
  const [selectedScenarios, setSelectedScenarios] = useState<number[]>([0, 3]);

  const results = useMemo(() => {
    return scenarios.map((s) => {
      const modified = { ...baseInput, [s.key]: s.value } as UserInput;
      const res = predict(modified);
      return {
        label: s.label,
        days: res.processingDays,
        approval: Math.round(res.approvalProbability * 100),
        diff: res.processingDays - baseResult.processingDays,
      };
    });
  }, [baseInput, baseResult]);

  const chartData = [
    { name: "Current", days: baseResult.processingDays, fill: "hsl(170, 80%, 50%)" },
    ...selectedScenarios.map((i) => ({
      name: results[i].label,
      days: results[i].days,
      fill: results[i].diff > 0 ? "hsl(0, 70%, 50%)" : "hsl(140, 70%, 45%)",
    })),
  ];

  const toggleScenario = (idx: number) => {
    setSelectedScenarios((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx].slice(-4)
    );
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <FlaskConical className="h-4 w-4" />
        What-If Scenario Analysis
      </div>
      <p className="text-xs text-muted-foreground">
        See how different choices could change your processing time
      </p>

      <div className="flex flex-wrap gap-2">
        {scenarios.map((s, i) => (
          <button
            key={i}
            onClick={() => toggleScenario(i)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              selectedScenarios.includes(i)
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} barSize={40}>
          <XAxis dataKey="name" tick={{ fill: "hsl(210 10% 55%)", fontSize: 10 }} axisLine={false} tickLine={false} angle={-20} textAnchor="end" height={60} />
          <YAxis tick={{ fill: "hsl(210 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} unit="d" />
          <Tooltip
            contentStyle={{ background: "hsl(210 25% 11%)", border: "1px solid hsl(210 20% 18%)", borderRadius: 8, color: "hsl(180 10% 90%)" }}
            formatter={(v: number) => [`${v} days`, ""]}
          />
          <Bar dataKey="days" radius={[6, 6, 0, 0]}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="grid gap-2 sm:grid-cols-2">
        {selectedScenarios.map((i) => (
          <div key={i} className="flex items-center justify-between rounded-lg bg-secondary p-3">
            <span className="text-xs text-foreground">{results[i].label}</span>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold ${results[i].diff > 0 ? "text-destructive" : "text-primary"}`}>
                {results[i].diff > 0 ? "+" : ""}{results[i].diff}d
              </span>
              <span className="text-xs text-muted-foreground">({results[i].approval}% approval)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatIfAnalysis;
