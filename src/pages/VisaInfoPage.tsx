import { ExternalLink } from "lucide-react";
import { visaCategories, countries } from "@/lib/visaData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const VisaInfoPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container text-center">
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
            India Visa Information
          </h1>
          <p className="mt-3 text-muted-foreground">
            Official visa guidelines and government portal links for visitors to India
          </p>
          <span className="mt-4 inline-block rounded-full bg-secondary px-4 py-1 text-xs text-muted-foreground">
            Last Updated: February 2026
          </span>
        </div>
      </section>

      {/* Official Portal */}
      <section className="py-12">
        <div className="container max-w-4xl">
          <div className="rounded-2xl bg-gradient-to-r from-primary/80 to-primary p-8 text-center text-primary-foreground">
            <h2 className="font-heading text-xl font-bold mb-2">🇮🇳 Official India Visa Portal</h2>
            <p className="text-sm opacity-90 mb-6">
              All visa applications for India should be submitted through the official government portal:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Indian Visa Online (Official)", url: "https://indianvisaonline.gov.in/" },
                { label: "Ministry of External Affairs", url: "https://www.mea.gov.in/" },
                { label: "Bureau of Immigration", url: "https://boi.gov.in/" },
              ].map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/30 bg-primary-foreground/10 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visa Categories */}
      <section className="py-12">
        <div className="container max-w-5xl">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-8">📋 Visa Categories</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visaCategories.map((v) => (
              <div key={v.name} className="glass-card p-6 space-y-2">
                <h3 className="font-heading text-lg font-bold text-foreground">{v.name}</h3>
                <p className="text-sm font-medium text-primary">{v.duration}</p>
                <p className="text-sm text-muted-foreground">{v.description}</p>
                <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                  Avg. Processing: {v.avgProcessing}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Country-Specific Info */}
      <section className="py-12">
        <div className="container max-w-5xl">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-3">🌍 Country-Specific Information</h2>
          <p className="text-sm text-muted-foreground mb-8">Processing times and embassy links for supported countries</p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {countries.map((c) => (
              <div key={c.code} className="glass-card p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{c.flag}</span>
                  <h3 className="font-heading font-bold text-foreground">{c.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">Avg: {c.range} days</p>
                <a
                  href={c.embassyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  Embassy Link →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8">
        <div className="container max-w-4xl">
          <div className="rounded-xl border border-border bg-secondary/50 p-6 text-center">
            <h3 className="font-heading font-bold text-foreground mb-2">⚠️ Important Disclaimer</h3>
            <p className="text-sm text-muted-foreground">
              The processing times shown are estimates based on historical data and may vary. 
              Always refer to the official Indian visa portal for the most accurate and up-to-date information. 
              VisaPredict.ai is not affiliated with the Government of India.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VisaInfoPage;
