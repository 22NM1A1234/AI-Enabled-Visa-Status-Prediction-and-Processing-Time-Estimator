import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

const visaTypes = ["H-1B", "L-1", "O-1", "EB-1", "EB-2", "EB-3", "F-1 OPT", "J-1"];
const countries = [
  "India", "China", "Philippines", "Mexico", "South Korea",
  "Brazil", "Canada", "United Kingdom", "Germany", "Japan", "Other",
];
const experiences = ["0-2 years", "3-5 years", "6-10 years", "10-15 years", "15+ years"];
const educations = ["High School", "Bachelor's", "Master's", "PhD", "Professional Degree"];
const employerSizes = ["1-50", "51-200", "201-1000", "1001-5000", "5000+"];

interface FormData {
  visaType: string;
  country: string;
  experience: string;
  education: string;
  employerSize: string;
  wage: string;
  previousApps: string;
}

const PredictionForm = () => {
  const [form, setForm] = useState<FormData>({
    visaType: "", country: "", experience: "", education: "",
    employerSize: "", wage: "", previousApps: "0",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    status: string;
    probability: number;
    processingDays: number;
  }>(null);

  const update = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate prediction
    setTimeout(() => {
      const prob = 60 + Math.random() * 30;
      setResult({
        status: prob > 75 ? "Approved" : "Under Review",
        probability: Math.round(prob * 10) / 10,
        processingDays: Math.round(15 + Math.random() * 45),
      });
      setLoading(false);
    }, 2000);
  };

  const selectClass =
    "w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary appearance-none";

  return (
    <section id="predict" className="py-24 scroll-mt-20">
      <div className="container max-w-3xl">
        <h2 className="mb-3 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
          Application Analysis
        </h2>
        <p className="mx-auto mb-12 text-center text-muted-foreground">
          Enter your visa application details for AI-powered prediction
        </p>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Visa Type */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Visa Type <span className="text-primary">*</span>
              </label>
              <p className="mb-2 text-xs text-muted-foreground">
                Select the visa category you're applying for.
              </p>
              <select
                required
                value={form.visaType}
                onChange={(e) => update("visaType", e.target.value)}
                className={selectClass}
              >
                <option value="">Select...</option>
                {visaTypes.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Country of Origin <span className="text-primary">*</span>
              </label>
              <p className="mb-2 text-xs text-muted-foreground">
                Your country of citizenship affects processing.
              </p>
              <select
                required
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                className={selectClass}
              >
                <option value="">Select...</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Work Experience <span className="text-primary">*</span>
              </label>
              <p className="mb-2 text-xs text-muted-foreground">
                Total years of relevant professional work experience.
              </p>
              <select
                required
                value={form.experience}
                onChange={(e) => update("experience", e.target.value)}
                className={selectClass}
              >
                <option value="">Select...</option>
                {experiences.map((x) => (
                  <option key={x} value={x}>{x}</option>
                ))}
              </select>
            </div>

            {/* Education */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Education Level <span className="text-primary">*</span>
              </label>
              <p className="mb-2 text-xs text-muted-foreground">
                Highest level of education completed.
              </p>
              <select
                required
                value={form.education}
                onChange={(e) => update("education", e.target.value)}
                className={selectClass}
              >
                <option value="">Select...</option>
                {educations.map((ed) => (
                  <option key={ed} value={ed}>{ed}</option>
                ))}
              </select>
            </div>

            {/* Employer Size */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Employer Size
              </label>
              <p className="mb-2 text-xs text-muted-foreground">
                Number of employees at petitioning company.
              </p>
              <select
                value={form.employerSize}
                onChange={(e) => update("employerSize", e.target.value)}
                className={selectClass}
              >
                <option value="">Select...</option>
                {employerSizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Wage */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Offered Wage (USD) <span className="text-primary">*</span>
              </label>
              <p className="mb-2 text-xs text-muted-foreground">
                Annual salary offered in USD.
              </p>
              <input
                required
                type="number"
                placeholder="e.g. 85000"
                value={form.wage}
                onChange={(e) => update("wage", e.target.value)}
                className={selectClass}
              />
            </div>
          </div>

          {/* Previous Apps */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Previous Applications
            </label>
            <p className="mb-2 text-xs text-muted-foreground">
              Number of previous visa applications filed.
            </p>
            <input
              type="number"
              min="0"
              value={form.previousApps}
              onChange={(e) => update("previousApps", e.target.value)}
              className={selectClass + " max-w-[200px]"}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground transition-all hover:opacity-90 glow-sm disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Run Prediction
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Result */}
        {result && (
          <div className="mt-8 glass-card p-8 glow-md">
            <h3 className="mb-6 font-heading text-xl font-bold text-foreground">
              Prediction Results
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-secondary p-4 text-center">
                <div className="text-sm text-muted-foreground">Predicted Status</div>
                <div className={`mt-1 font-heading text-xl font-bold ${result.status === "Approved" ? "text-primary" : "text-yellow-400"}`}>
                  {result.status}
                </div>
              </div>
              <div className="rounded-lg bg-secondary p-4 text-center">
                <div className="text-sm text-muted-foreground">Approval Probability</div>
                <div className="mt-1 font-heading text-xl font-bold text-primary">
                  {result.probability}%
                </div>
              </div>
              <div className="rounded-lg bg-secondary p-4 text-center">
                <div className="text-sm text-muted-foreground">Est. Processing Time</div>
                <div className="mt-1 font-heading text-xl font-bold text-foreground">
                  {result.processingDays} days
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PredictionForm;
