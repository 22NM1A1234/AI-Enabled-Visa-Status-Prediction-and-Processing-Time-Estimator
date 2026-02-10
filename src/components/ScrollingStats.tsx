const stats = [
  { value: "25,480+", label: "Visa Records Analyzed" },
  { value: "82%", label: "R² Model Fit (Processing Time)" },
  { value: "85%+", label: "Classification Accuracy" },
  { value: "24+", label: "Features Engineered" },
];

const ScrollingStats = () => {
  return (
    <section className="border-y border-border/50 bg-secondary/50 py-8">
      <div className="container">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollingStats;
