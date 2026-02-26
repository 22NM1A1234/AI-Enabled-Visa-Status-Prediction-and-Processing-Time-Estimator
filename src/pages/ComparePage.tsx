import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from "recharts";
import { countries } from "@/lib/visaData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tooltipStyle = { background: "hsl(210 25% 11%)", border: "1px solid hsl(210 20% 18%)", borderRadius: 8, color: "hsl(180 10% 90%)" };
const COLORS = ["hsl(170, 80%, 50%)", "hsl(220, 80%, 60%)", "hsl(40, 90%, 55%)", "hsl(340, 70%, 55%)"];

const ComparePage = () => {
  const [selected, setSelected] = useState<string[]>(["", "", "", ""]);

  const updateCountry = (index: number, value: string) => {
    setSelected((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const selectedCountries = selected.filter(Boolean).map(code => countries.find(c => c.code === code)!).filter(Boolean);

  const chartData = selectedCountries.map(c => ({
    name: c.name,
    days: c.avgProcessingDays,
  }));

  const handleCompare = () => {};

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container max-w-4xl">
          <h1 className="text-center font-heading text-4xl font-bold text-foreground mb-2">
            Country Comparison Tool
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            Compare visa processing times across different countries side-by-side
          </p>

          <div className="glass-card p-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-6">
              Select Countries to Compare (2-4)
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
              {[0, 1, 2, 3].map((i) => (
                <div key={i}>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Country {i + 1} {i < 2 ? <span className="text-destructive">*</span> : "(Optional)"}
                  </label>
                  <select
                    value={selected[i]}
                    onChange={(e) => updateCountry(i, e.target.value)}
                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                  >
                    <option value="">Select country...</option>
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <button
              onClick={handleCompare}
              disabled={selectedCountries.length < 2}
              className="mx-auto block rounded-xl bg-primary px-8 py-3 font-bold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
            >
              Compare Countries
            </button>
          </div>

          {selectedCountries.length >= 2 && (
            <div className="mt-8 space-y-6 animate-fade-in">
              {/* Bar Chart */}
              <div className="glass-card p-6">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                  Processing Time Comparison
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData} barSize={50}>
                    <XAxis dataKey="name" tick={{ fill: "hsl(210 10% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "hsl(210 10% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} unit=" days" />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} days`, ""]} />
                    <Bar dataKey="days" radius={[6, 6, 0, 0]}>
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Detail Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                {selectedCountries.map((c, i) => (
                  <div key={c.code} className="glass-card p-6 space-y-3" style={{ borderLeftColor: COLORS[i], borderLeftWidth: 3 }}>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{c.flag}</span>
                      <span className="font-heading text-lg font-bold text-foreground">{c.name}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Avg. Processing</span>
                        <div className="font-heading font-bold text-foreground">{c.avgProcessingDays} days</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Range</span>
                        <div className="font-heading font-bold text-foreground">{c.range} days</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Region</span>
                        <div className="font-heading font-bold text-foreground">{c.region}</div>
                      </div>
                      <div>
                        <a href={c.embassyLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                          Embassy Link →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ComparePage;
