import { Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { monthlyTrends } from "@/lib/visaData";

const OptimalMonth = () => {
  const minDays = Math.min(...monthlyTrends.map(m => m.days));
  const bestMonth = monthlyTrends.find(m => m.days === minDays)!;

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Calendar className="h-4 w-4" />
        Optimal Month to Apply
      </div>
      <p className="text-xs text-muted-foreground">
        AI-predicted processing time for each month of the year
      </p>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={monthlyTrends} barSize={24}>
          <XAxis dataKey="month" tick={{ fill: "hsl(210 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(210 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} unit="d" domain={[0, 12]} />
          <Tooltip
            contentStyle={{ background: "hsl(210 25% 11%)", border: "1px solid hsl(210 20% 18%)", borderRadius: 8, color: "hsl(180 10% 90%)" }}
            formatter={(v: number) => [`${v} days`, ""]}
          />
          <Bar dataKey="days" radius={[4, 4, 0, 0]}>
            {monthlyTrends.map((entry, i) => (
              <Cell key={i} fill={entry.days === minDays ? "hsl(170, 80%, 50%)" : entry.days >= 9.5 ? "hsl(0, 70%, 50%)" : "hsl(210, 20%, 35%)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="rounded-lg bg-primary/10 border border-primary/20 p-3 text-center">
        <span className="text-xs text-muted-foreground">Best time to apply: </span>
        <span className="font-heading text-sm font-bold text-primary">{bestMonth.month} ({bestMonth.days} days avg)</span>
      </div>
    </div>
  );
};

export default OptimalMonth;
