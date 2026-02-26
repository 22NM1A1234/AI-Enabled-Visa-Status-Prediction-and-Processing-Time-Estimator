import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from "recharts";
import { visaCategories, monthlyTrends, countries } from "@/lib/visaData";
import { TrendingUp } from "lucide-react";

const visaTypeData = visaCategories.map(v => ({ name: v.name.replace(" Visa", ""), days: v.avgDays }));
const nationalityData = countries.slice(0, 8).map(c => ({ name: c.name, days: c.avgProcessingDays }));

const tooltipStyle = { background: "hsl(210 25% 11%)", border: "1px solid hsl(210 20% 18%)", borderRadius: 8, color: "hsl(180 10% 90%)" };

const HistoricalData = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-4">
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-heading tracking-wider text-primary mb-4">
            Data Insights
          </span>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            Historical Processing Data
          </h2>
          <p className="mt-2 text-muted-foreground">Visualizations from our 25,000+ application dataset</p>
        </div>

        <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Processing Time by Visa Type */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              Processing Time by Visa Type
            </div>
            <p className="text-xs text-muted-foreground">Average days per visa category</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={visaTypeData} barSize={28}>
                <XAxis dataKey="name" tick={{ fill: "hsl(210 10% 55%)", fontSize: 10 }} axisLine={false} tickLine={false} angle={-20} textAnchor="end" height={50} />
                <YAxis tick={{ fill: "hsl(210 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} unit="d" />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} days`, ""]} />
                <Bar dataKey="days" radius={[4, 4, 0, 0]} fill="hsl(170, 80%, 50%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Seasonal Processing Trends */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              Seasonal Processing Trends
            </div>
            <p className="text-xs text-muted-foreground">Monthly variation in processing times</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyTrends}>
                <XAxis dataKey="month" tick={{ fill: "hsl(210 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(210 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} unit="d" domain={[5, 12]} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} days`, ""]} />
                <Line type="monotone" dataKey="days" stroke="hsl(170, 80%, 50%)" strokeWidth={2} dot={{ fill: "hsl(170, 80%, 50%)", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span className="rounded bg-destructive/10 px-2 py-1 text-destructive font-medium">+28% Peak Impact</span>
              <span>Oct-Mar: Peak · Apr-Sep: Off-Peak</span>
            </div>
          </div>

          {/* Processing Time by Nationality */}
          <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              Processing by Nationality
            </div>
            <p className="text-xs text-muted-foreground">Average days for top 8 countries</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={nationalityData} layout="vertical" barSize={16}>
                <XAxis type="number" tick={{ fill: "hsl(210 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} unit="d" />
                <YAxis type="category" dataKey="name" tick={{ fill: "hsl(210 10% 55%)", fontSize: 10 }} axisLine={false} tickLine={false} width={70} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} days`, ""]} />
                <Bar dataKey="days" radius={[0, 4, 4, 0]}>
                  {nationalityData.map((_, i) => (
                    <Cell key={i} fill={i % 2 === 0 ? "hsl(170, 80%, 50%)" : "hsl(170, 60%, 40%)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoricalData;
