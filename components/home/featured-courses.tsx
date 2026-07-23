import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { programs } from "@/lib/data/programs";
import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";

export function FeaturedCourses() {
  // Extract the first course from each program to showcase
  const featured = programs.map(p => ({
    ...p.courses[0],
    categoryName: p.title
  })).slice(0, 4); // Just show 4

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Featured Programs"
              title="A starting point for every level"
            />
            <Link
              href="/programs"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-meridian hover:underline"
            >
              Browse all programs <ArrowRight size={15} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ScrollRevealStagger>
            {featured.map((course) => (
              <Link
                key={course.slug}
                href={`/programs/${course.slug}`}
                className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gold/30 hover:bg-card/90"
              >
                <div className="flex flex-wrap gap-2">
                  {course.badges.slice(0, 2).map((badge, i) => (
                    <Badge key={i}>{badge}</Badge>
                  ))}
                </div>
                <h3 className="mt-4 text-lg group-hover:text-meridian transition-colors line-clamp-2">
                  {course.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {course.categoryName}
                </p>
                <div className="mt-4 flex flex-col gap-1 text-sm text-muted-foreground border-t border-border pt-4">
                  <span>Target: {course.targetStudents}</span>
                  <span>Duration: {course.duration}</span>
                </div>
              </Link>
            ))}
          </ScrollRevealStagger>
        </div>

        <div className="mt-12 flex justify-center">
          <ScrollReveal>
            <Link href="/programs">
              <Button variant="outline" size="lg">
                View all programs
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
