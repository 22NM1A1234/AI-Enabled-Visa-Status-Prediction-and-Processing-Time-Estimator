import { CheckCircle2, XCircle, Clock, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { PredictionResult } from "@/lib/model";

interface Props {
  result: PredictionResult;
}

const PredictionResults = ({ result }: Props) => {
  const isCertified = result.predictedStatus === "Certified";
  const deniedProb = Math.round((1 - result.approvalProbability) * 100);
  const approvedProb = Math.round(result.approvalProbability * 100);

  const chartData = [
    { name: "Certified", value: approvedProb },
    { name: "Denied", value: deniedProb },
  ];

  return (
    <div className="mt-10 space-y-6 animate-fade-in">
      <h3 className="font-heading text-xl font-bold text-foreground text-center">
        Prediction Results
      </h3>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Visa Status Card */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            Visa Status Prediction
          </div>

          <div className="flex items-center gap-3">
            {isCertified ? (
              <CheckCircle2 className="h-8 w-8 text-primary" />
            ) : (
              <XCircle className="h-8 w-8 text-destructive" />
            )}
            <span className={`font-heading text-2xl font-bold ${isCertified ? "text-primary" : "text-destructive"}`}>
              {result.predictedStatus}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Confidence Level</span>
              <span className="font-heading font-bold text-foreground">{result.confidence}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${isCertified ? "bg-primary" : "bg-destructive"}`}
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Approval Probability</span>
              <span className="font-heading font-semibold text-primary">{approvedProb}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Denial Probability</span>
              <span className="font-heading font-semibold text-destructive">{deniedProb}%</span>
            </div>
          </div>
        </div>

        {/* Processing Time Card */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Clock className="h-4 w-4" />
            Processing Time Estimate
          </div>

          <div className="text-center py-2">
            <span className="font-heading text-4xl font-bold text-foreground">
              {result.processingDays}
            </span>
            <span className="ml-1 text-lg text-muted-foreground">± {result.processingDays - result.processingDaysLow} days</span>
          </div>

          <div className="rounded-lg bg-secondary p-4 text-center">
            <div className="text-xs text-muted-foreground mb-1">Expected Range</div>
            <div className="font-heading text-lg font-bold text-foreground">
              {result.processingDaysLow} – {result.processingDaysHigh} days
            </div>
          </div>
        </div>
      </div>

      {/* Probability Chart */}
      <div className="glass-card p-6">
        <div className="text-sm font-medium text-muted-foreground mb-4">Probability Distribution</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData} barSize={60}>
            <XAxis dataKey="name" tick={{ fill: "hsl(210 10% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fill: "hsl(210 10% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip
              contentStyle={{ background: "hsl(210 25% 11%)", border: "1px solid hsl(210 20% 18%)", borderRadius: 8, color: "hsl(180 10% 90%)" }}
              formatter={(value: number) => [`${value}%`, '']}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              <Cell fill="hsl(170, 80%, 50%)" />
              <Cell fill="hsl(0, 70%, 50%)" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PredictionResults;
