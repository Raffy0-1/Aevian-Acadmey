import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/data/testimonials";
import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="In their words"
            title="What families and teachers say"
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <ScrollRevealStagger>
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col justify-between rounded-lg border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gold/30 hover:bg-card/90"
              >
                <blockquote className="font-display text-lg leading-relaxed italic text-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium text-foreground">{t.name}</span>
                  <span className="text-muted-foreground"> · {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </ScrollRevealStagger>
        </div>
      </Container>
    </section>
  );
}
