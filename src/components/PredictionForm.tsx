import { useState } from "react";
import { ArrowRight, Loader2, RotateCcw, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { predict, type UserInput, type PredictionResult } from "@/lib/model";
import PredictionResults from "./PredictionResults";

const continents = ["Asia", "Europe", "North America", "South America", "Oceania", "Africa"] as const;
const educations = ["High School", "Bachelor's", "Master's", "Doctorate"] as const;
const regions = ["Northeast", "South", "Midwest", "West"] as const;
const wageUnits = ["Year", "Month", "Week", "Hour"] as const;

interface FormState {
  hasJobExperience: string;
  requiresJobTraining: string;
  numberOfEmployees: string;
  yearOfEstablishment: string;
  prevailingWage: string;
  fullTimePosition: string;
  continent: string;
  education: string;
  region: string;
  unitOfWage: string;
}

const initial: FormState = {
  hasJobExperience: "", requiresJobTraining: "", numberOfEmployees: "",
  yearOfEstablishment: "", prevailingWage: "", fullTimePosition: "",
  continent: "", education: "", region: "", unitOfWage: "",
};

const tooltips: Record<string, string> = {
  hasJobExperience: "Does the applicant have prior relevant job experience?",
  requiresJobTraining: "Does the position require additional job training?",
  numberOfEmployees: "Total number of employees at the petitioning company.",
  yearOfEstablishment: "Year the petitioning company was established.",
  prevailingWage: "The prevailing wage offered for the position in USD.",
  fullTimePosition: "Is this a full-time position?",
  continent: "Continent of the applicant's country of origin.",
  education: "Highest education level completed by the applicant.",
  region: "US region where the job is located.",
  unitOfWage: "Unit in which the wage is expressed.",
};

const FieldLabel = ({ label, required, tipKey }: { label: string; required?: boolean; tipKey: string }) => (
  <div className="flex items-center gap-1.5 mb-1.5">
    <label className="text-sm font-medium text-foreground">
      {label} {required && <span className="text-primary">*</span>}
    </label>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[220px] text-xs">
        {tooltips[tipKey]}
      </TooltipContent>
    </Tooltip>
  </div>
);

const selectClass =
  "w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary appearance-none";

const PredictionForm = () => {
  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.hasJobExperience) e.hasJobExperience = "Required";
    if (!form.requiresJobTraining) e.requiresJobTraining = "Required";
    if (!form.numberOfEmployees || Number(form.numberOfEmployees) < 1) e.numberOfEmployees = "Enter a positive number";
    if (!form.yearOfEstablishment || Number(form.yearOfEstablishment) < 1800 || Number(form.yearOfEstablishment) > 2026) e.yearOfEstablishment = "Enter a valid year (1800–2026)";
    if (!form.prevailingWage || Number(form.prevailingWage) < 0) e.prevailingWage = "Enter a positive wage";
    if (Number(form.prevailingWage) > 500000) e.prevailingWage = "Max $500,000";
    if (!form.fullTimePosition) e.fullTimePosition = "Required";
    if (!form.continent) e.continent = "Required";
    if (!form.education) e.education = "Required";
    if (!form.region) e.region = "Required";
    if (!form.unitOfWage) e.unitOfWage = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setResult(null);

    // Simulate brief processing delay for UX
    setTimeout(() => {
      const input: UserInput = {
        hasJobExperience: form.hasJobExperience === "Yes",
        requiresJobTraining: form.requiresJobTraining === "Yes",
        numberOfEmployees: Number(form.numberOfEmployees),
        yearOfEstablishment: Number(form.yearOfEstablishment),
        prevailingWage: Number(form.prevailingWage),
        fullTimePosition: form.fullTimePosition === "Yes",
        continent: form.continent as UserInput["continent"],
        education: form.education as UserInput["education"],
        region: form.region as UserInput["region"],
        unitOfWage: form.unitOfWage as UserInput["unitOfWage"],
      };
      setResult(predict(input));
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setForm(initial);
    setResult(null);
    setErrors({});
  };

  const ErrorMsg = ({ field }: { field: keyof FormState }) =>
    errors[field] ? <p className="mt-1 text-xs text-destructive">{errors[field]}</p> : null;

  return (
    <section id="predict" className="py-24 scroll-mt-20">
      <div className="container max-w-3xl">
        <h2 className="mb-3 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
          Application Analysis
        </h2>
        <p className="mx-auto mb-12 text-center text-muted-foreground">
          Enter your visa application details for ML-powered prediction
        </p>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Job Experience */}
            <div>
              <FieldLabel label="Job Experience" required tipKey="hasJobExperience" />
              <select value={form.hasJobExperience} onChange={(e) => update("hasJobExperience", e.target.value)} className={selectClass}>
                <option value="">Select...</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <ErrorMsg field="hasJobExperience" />
            </div>

            {/* Job Training */}
            <div>
              <FieldLabel label="Requires Job Training" required tipKey="requiresJobTraining" />
              <select value={form.requiresJobTraining} onChange={(e) => update("requiresJobTraining", e.target.value)} className={selectClass}>
                <option value="">Select...</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <ErrorMsg field="requiresJobTraining" />
            </div>

            {/* Number of Employees */}
            <div>
              <FieldLabel label="Number of Employees" required tipKey="numberOfEmployees" />
              <input type="number" min="1" placeholder="e.g. 500" value={form.numberOfEmployees} onChange={(e) => update("numberOfEmployees", e.target.value)} className={selectClass} />
              <ErrorMsg field="numberOfEmployees" />
            </div>

            {/* Year of Establishment */}
            <div>
              <FieldLabel label="Year of Establishment" required tipKey="yearOfEstablishment" />
              <input type="number" min="1800" max="2026" placeholder="e.g. 2005" value={form.yearOfEstablishment} onChange={(e) => update("yearOfEstablishment", e.target.value)} className={selectClass} />
              <ErrorMsg field="yearOfEstablishment" />
            </div>

            {/* Prevailing Wage */}
            <div>
              <FieldLabel label="Prevailing Wage (USD)" required tipKey="prevailingWage" />
              <input type="number" min="0" max="500000" placeholder="e.g. 85000" value={form.prevailingWage} onChange={(e) => update("prevailingWage", e.target.value)} className={selectClass} />
              <ErrorMsg field="prevailingWage" />
            </div>

            {/* Full Time */}
            <div>
              <FieldLabel label="Full-time Position" required tipKey="fullTimePosition" />
              <select value={form.fullTimePosition} onChange={(e) => update("fullTimePosition", e.target.value)} className={selectClass}>
                <option value="">Select...</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <ErrorMsg field="fullTimePosition" />
            </div>

            {/* Continent */}
            <div>
              <FieldLabel label="Continent of Origin" required tipKey="continent" />
              <select value={form.continent} onChange={(e) => update("continent", e.target.value)} className={selectClass}>
                <option value="">Select...</option>
                {continents.map((c) => <option key={c}>{c}</option>)}
              </select>
              <ErrorMsg field="continent" />
            </div>

            {/* Education */}
            <div>
              <FieldLabel label="Education Level" required tipKey="education" />
              <select value={form.education} onChange={(e) => update("education", e.target.value)} className={selectClass}>
                <option value="">Select...</option>
                {educations.map((ed) => <option key={ed}>{ed}</option>)}
              </select>
              <ErrorMsg field="education" />
            </div>

            {/* Region */}
            <div>
              <FieldLabel label="Region of Employment" required tipKey="region" />
              <select value={form.region} onChange={(e) => update("region", e.target.value)} className={selectClass}>
                <option value="">Select...</option>
                {regions.map((r) => <option key={r}>{r}</option>)}
              </select>
              <ErrorMsg field="region" />
            </div>

            {/* Unit of Wage */}
            <div>
              <FieldLabel label="Unit of Wage" required tipKey="unitOfWage" />
              <select value={form.unitOfWage} onChange={(e) => update("unitOfWage", e.target.value)} className={selectClass}>
                <option value="">Select...</option>
                {wageUnits.map((u) => <option key={u}>{u}</option>)}
              </select>
              <ErrorMsg field="unitOfWage" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground transition-all hover:opacity-90 glow-sm disabled:opacity-50"
            >
              {loading ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> Analyzing...</>
              ) : (
                <><ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /> Run Prediction</>
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </form>

        {result && <PredictionResults result={result} />}
      </div>
    </section>
  );
};

export default PredictionForm;
