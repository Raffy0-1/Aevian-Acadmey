import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LearningConstellation } from "@/components/ui/learning-constellation";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-chalk">
      <Container className="grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:py-32">
        <div className="animate-fade-up">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.14em] text-gold">
            Global Online Learning Platform
          </p>
          <h1 className="text-balance text-4xl leading-[1.1] sm:text-5xl lg:text-[3.25rem]">
            Connecting Students Worldwide with
            <span className="italic text-gold"> Expert Teachers.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-chalk/75">
            Empowering students globally through personalized 1-on-1 tutoring, international curriculum expertise, and premium test preparation.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button variant="gold" size="lg">
              Book Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-chalk/25 text-chalk hover:bg-chalk/10"
            >
              <Play size={16} /> Watch how it works
            </Button>
          </div>
          <p className="mt-8 text-xs uppercase tracking-wide text-chalk/50">
            No credit card required · Cancel anytime
          </p>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <LearningConstellation className="h-auto w-full max-w-md text-chalk/60" />
        </div>
      </Container>
    </section>
  );
}
