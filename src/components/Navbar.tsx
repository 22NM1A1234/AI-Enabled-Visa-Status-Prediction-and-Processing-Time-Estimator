import { Globe, ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          <span className="font-heading text-lg font-bold text-foreground">
            VisaPredict<span className="text-primary">.ai</span>
          </span>
        </div>
        <a
          href="#predict"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-sm"
        >
          Get Started <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
