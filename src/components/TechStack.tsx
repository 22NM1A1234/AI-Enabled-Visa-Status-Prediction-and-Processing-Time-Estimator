import { Code, Server, Brain, Rocket, GitBranch } from "lucide-react";

const stack = [
  {
    category: "Frontend",
    icon: Code,
    items: ["HTML", "CSS", "JavaScript"],
  },
  {
    category: "Backend",
    icon: Server,
    items: ["Python", "Flask"],
  },
  {
    category: "Machine Learning",
    icon: Brain,
    items: ["scikit-learn", "joblib"],
  },
  {
    category: "Deployment",
    icon: Rocket,
    items: ["Render.com"],
  },
  {
    category: "Version Control",
    icon: GitBranch,
    items: ["GitHub"],
  },
];

const TechStack = () => (
  <section className="py-20">
    <div className="container max-w-5xl">
      <h2 className="mb-3 text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
        Tech Stack
      </h2>
      <p className="mx-auto mb-12 text-center text-muted-foreground">
        Technologies powering this application
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {stack.map(({ category, icon: Icon, items }) => (
          <div
            key={category}
            className="glass-card flex flex-col items-center gap-3 p-6 text-center transition-transform hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">{category}</h3>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item} className="text-xs text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TechStack;
