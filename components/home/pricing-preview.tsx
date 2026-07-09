import Link from "next/link";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$79",
    period: "/ month",
    description: "One course, one weekly class",
    features: ["1 live class per week", "Progress dashboard", "Homework feedback"],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$149",
    period: "/ month",
    description: "Two courses, steady momentum",
    features: [
      "2 live classes per week",
      "Progress dashboard",
      "Homework feedback",
      "Priority scheduling",
    ],
    highlighted: true,
  },
  {
    name: "Immersion",
    price: "$259",
    period: "/ month",
    description: "Multiple subjects, exam-track pace",
    features: [
      "4 live classes per week",
      "Progress dashboard",
      "Priority scheduling",
      "Monthly teacher call",
    ],
    highlighted: false,
  },
];

import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";

export function PricingPreview() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Simple plans, cancel anytime"
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <ScrollRevealStagger>
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "flex flex-col rounded-lg border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
                  plan.highlighted
                    ? "border-meridian bg-meridian text-meridian-foreground hover:shadow-meridian/20"
                    : "border-border bg-card hover:border-gold/30 hover:bg-card/90"
                )}
              >
                <p className="font-mono text-xs uppercase tracking-wide opacity-70">
                  {plan.name}
                </p>
                <p className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-display">{plan.price}</span>
                  <span className="text-sm opacity-70">{plan.period}</span>
                </p>
                <p className="mt-2 text-sm opacity-80">{plan.description}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check size={15} className={plan.highlighted ? "text-gold" : "text-meridian"} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlighted ? "gold" : "outline"}
                  className="mt-8"
                >
                  Choose {plan.name}
                </Button>
              </div>
            ))}
          </ScrollRevealStagger>
        </div>
        <ScrollReveal>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Need something custom for a school or group?{" "}
            <Link href="/contact" className="text-meridian hover:underline">
              Talk to us
            </Link>
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}
