import { Users, GitBranch, ShieldCheck, LineChart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";

const features = [
  {
    icon: Users,
    title: "1-on-1 & Small Live Classes",
    description:
      "Under eight students per class or direct 1-on-1 mentorship so your teacher actually tailors feedback to your learning pace.",
  },
  {
    icon: GitBranch,
    title: "The Learning Path Strategy",
    description:
      "Every lesson is built to unlock the next milestone. Progress is a structured geometric path, not a pile of disjointed videos.",
  },
  {
    icon: ShieldCheck,
    title: "Vetted Master Educators",
    description:
      "Top 5% of international educators interviewed, background-checked, and observed live before leading classes.",
  },
  {
    icon: LineChart,
    title: "Visible Real-Time Progress",
    description:
      "Parents and students receive detailed performance metrics and critical thinking analytics after every class session.",
  },
];

export function Features() {
  return (
    <section className="py-20 lg:py-28 bg-cream border-b border-slate-border/50">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="The Aevian Advantage"
            title="Built around master teachers, structured paths & real growth"
            description="Most platforms scale by replacing teachers with pre-recorded videos. Aevian empowers master educators with small classes, better tools, and compounding learning paths."
          />
        </ScrollReveal>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <ScrollRevealStagger>
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-border bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-copper/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-copper/10 text-copper transition-colors group-hover:bg-copper group-hover:text-white">
                  <feature.icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy tracking-tight">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {feature.description}
                </p>
              </div>
            ))}
          </ScrollRevealStagger>
        </div>
      </Container>
    </section>
  );
}

