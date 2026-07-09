import { Users, GitBranch, ShieldCheck, LineChart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";

const features = [
  {
    icon: Users,
    title: "Small live classes",
    description:
      "Under eight students per class, so your teacher actually knows how each one is doing — not just their name.",
  },
  {
    icon: GitBranch,
    title: "Curricula that connect",
    description:
      "Every lesson is built to unlock the next one. Progress is a path, not a pile of unrelated videos.",
  },
  {
    icon: ShieldCheck,
    title: "Vetted, credentialed teachers",
    description:
      "Every teacher is interviewed, background-checked, and observed live before they lead their first class.",
  },
  {
    icon: LineChart,
    title: "Progress you can see",
    description:
      "Parents get real feedback after every class — what was covered, what to practice, what's next.",
  },
];

export function Features() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Why Aevian"
            title="Built around the teacher, not the video player"
            description="Most platforms scale by removing the teacher from the loop. Aevian scales the teacher — smaller classes, better tools, clearer feedback."
          />
        </ScrollReveal>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <ScrollRevealStagger>
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gold/30 hover:bg-card/90"
              >
                <feature.icon className="text-meridian transition-colors group-hover:text-gold" size={22} strokeWidth={1.5} />
                <h3 className="mt-4 text-lg">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
