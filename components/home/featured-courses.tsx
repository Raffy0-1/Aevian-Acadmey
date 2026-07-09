import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { featuredCourses } from "@/lib/data/courses";
import { ScrollReveal, ScrollRevealStagger } from "@/components/ui/scroll-reveal";

export function FeaturedCourses() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Featured courses"
              title="A starting point for every level"
            />
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-meridian hover:underline"
            >
              Browse all courses <ArrowRight size={15} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ScrollRevealStagger>
            {featuredCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-gold/30 hover:bg-card/90"
              >
                <div className="flex flex-wrap gap-2">
                  <Badge>{course.difficulty}</Badge>
                  <Badge>{course.ageGroup}</Badge>
                </div>
                <h3 className="mt-4 text-lg group-hover:text-meridian transition-colors">
                  {course.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {course.category} · {course.duration}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-sm">
                  <Star size={14} className="fill-gold text-gold" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">
                    · {course.studentsEnrolled.toLocaleString()} students
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Taught by {course.teacher}
                </p>
              </Link>
            ))}
          </ScrollRevealStagger>
        </div>

        <div className="mt-12 flex justify-center">
          <ScrollReveal>
            <Link href="/courses">
              <Button variant="outline" size="lg">
                View all courses
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
