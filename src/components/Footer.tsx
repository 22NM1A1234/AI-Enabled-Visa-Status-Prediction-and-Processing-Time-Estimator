import { Globe, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-secondary/30 py-12">
      <div className="container max-w-4xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <span className="font-heading text-lg font-bold text-foreground">
              VisaPredict<span className="text-primary">.ai</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Developed as part of an AI & Machine Learning Project. Powered by ensemble models trained on 25,000+ historical visa records.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub Repository
            </a>
          </div>
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} VisaPredict.ai — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
