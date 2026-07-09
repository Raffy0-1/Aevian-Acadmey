import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";

const steps = [
  {
    number: "01",
    title: "Book a free trial class",
    description:
      "Tell us your child's age, level, and goals. We match a teacher and timezone-aware slot in minutes.",
  },
  {
    number: "02",
    title: "Meet your teacher, live",
    description:
      "A full-length live class — not a demo. Your teacher assesses level and gives written feedback after.",
  },
  {
    number: "03",
    title: "Start the matched curriculum",
    description:
      "Enroll in the course path the teacher recommends, with a schedule that fits your week.",
  },
  {
    number: "04",
    title: "Track real progress",
    description:
      "Attendance, homework, and feedback land in the parent dashboard after every single class.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-card py-20 sm:py-28">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="How it works"
            title="From first class to certificate"
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <ScrollRevealStagger>
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative pl-1 group transition-all duration-300 hover:translate-x-1"
              >
                <span className="font-mono text-sm text-gold transition-colors group-hover:text-meridian">{step.number}</span>
                <h3 className="mt-3 text-lg font-medium text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </ScrollRevealStagger>
        </div>
      </Container>
    </section>
  );
}
