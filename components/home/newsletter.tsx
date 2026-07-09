import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  return (
    <section className="bg-ink py-20 text-chalk">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="max-w-lg text-3xl sm:text-4xl">
          One thoughtful email a month. No noise.
        </h2>
        <p className="max-w-md text-chalk/70">
          Curriculum updates, teacher spotlights, and study resources —
          nothing else.
        </p>
        <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@example.com"
            className="h-11 flex-1 rounded-md border border-chalk/20 bg-transparent px-4 text-sm text-chalk placeholder:text-chalk/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          />
          <Button variant="gold" type="submit">
            Subscribe
          </Button>
        </form>
      </Container>
    </section>
  );
}
