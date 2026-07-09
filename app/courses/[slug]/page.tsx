import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, Clock, BookOpen, User, Calendar } from "lucide-react";
import { getCourseBySlug } from "@/lib/actions/courses";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let course: any = null;
  try {
    course = await getCourseBySlug(slug);
  } catch (e) {
    console.warn("Could not load course from database.", e);
  }

  // Fallback course data if DB is empty
  if (!course) {
    if (slug === "algebra-foundations") {
      course = {
        title: "Algebra Foundations",
        description: "Build a rock-solid understanding of algebraic thinking. From variables and expressions to equations and inequalities, students develop the mathematical fluency needed for advanced study.",
        category: "Mathematics",
        ageRangeMin: 11,
        ageRangeMax: 14,
        difficulty: "BEGINNER",
        durationWeeks: 12,
        priceCents: 29900,
        teacher: {
          user: { name: "Nadia Farooq" },
          bio: "Mathematics educator with 12 years of experience in IB and Cambridge curricula. Passionate about making algebra and calculus intuitive for young learners.",
        },
        modules: [
          {
            title: "Variables & Expressions",
            order: 1,
            lessons: [
              { title: "What is a Variable?", durationMinutes: 45 },
              { title: "Writing Expressions", durationMinutes: 45 },
              { title: "Evaluating Expressions", durationMinutes: 45 },
            ],
          },
        ],
        reviews: [],
      };
    } else {
      notFound();
    }
  }

  const totalRating = course.reviews?.reduce((acc: number, r: any) => acc + r.rating, 0) || 0;
  const avgRating = course.reviews?.length > 0 ? (totalRating / course.reviews.length).toFixed(1) : "4.9";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="grid gap-10 lg:grid-cols-3">
          {/* Main Course Info (Left 2 columns) */}
          <div className="space-y-8 lg:col-span-2">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{course.category}</Badge>
                <Badge>{course.difficulty}</Badge>
                <Badge>Ages {course.ageRangeMin}–{course.ageRangeMax}</Badge>
              </div>
              <h1 className="mt-4 font-display text-4xl leading-tight text-foreground sm:text-5xl">
                {course.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="fill-gold text-gold" />
                  <span className="font-semibold text-foreground">{avgRating}</span>
                  <span>({course.reviews?.length || 12} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={16} />
                  <span>{course.durationWeeks} weeks</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen size={16} />
                  <span>
                    {course.modules?.reduce((acc: number, m: any) => acc + (m.lessons?.length || 0), 0) || 12}{" "}
                    lessons
                  </span>
                </div>
              </div>
            </div>

            {/* Curriculum Accordion */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-foreground">Curriculum Outline</h2>
              <div className="space-y-3">
                {course.modules?.map((mod: any) => (
                  <details
                    key={mod.id || mod.order}
                    className="group rounded-lg border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden"
                    open={mod.order === 1}
                  >
                    <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground focus:outline-none">
                      <span className="font-display text-lg">
                        Module {mod.order}: {mod.title}
                      </span>
                      <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <ul className="mt-4 space-y-3 border-t border-border pt-4 text-sm text-muted-foreground">
                      {mod.lessons?.map((lesson: any, index: number) => (
                        <li key={lesson.id || index} className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <CheckCircle size={15} className="text-meridian" />
                            {lesson.title}
                          </span>
                          <span className="font-mono text-xs">{lesson.durationMinutes} min</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </section>

            {/* Teacher Info */}
            <section className="rounded-lg border border-border bg-card p-6 space-y-4">
              <h2 className="font-display text-xl text-foreground">Your Teacher</h2>
              <div className="flex gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    {course.teacher?.user?.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {course.teacher?.bio || "Expert educator at Aevian Academy."}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Enrollment Card (Right 1 column) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border border-border bg-card p-6 shadow-sm space-y-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                  Tuition Fee
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-4xl text-foreground">
                    ${(course.priceCents / 100).toFixed(0)}
                  </span>
                  <span className="text-sm text-muted-foreground">USD</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Includes all materials, worksheets, homework grading, and parent reports.
                </p>
              </div>

              <div className="space-y-3">
                <Link href={`/book-trial?course=${course.id}`} className="block w-full">
                  <Button variant="gold" size="lg" className="w-full">
                    Book Free Trial Class
                  </Button>
                </Link>
                <Link href={`/signup?enroll=${course.id}`} className="block w-full">
                  <Button variant="outline" size="lg" className="w-full">
                    Enroll Now
                  </Button>
                </Link>
              </div>

              <div className="border-t border-border pt-4 text-xs text-muted-foreground space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gold" />
                  <span>100% Satisfaction Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-gold" />
                  <span>Timezone-aware scheduling</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
