import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Search, Filter } from "lucide-react";
import { getCourses } from "@/lib/actions/courses";
import { Difficulty } from "@prisma/client";

// Fallback courses for local build/no DB scenario
import { featuredCourses as staticCourses } from "@/lib/data/courses";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    difficulty?: string;
  }>;
}

export default async function CoursesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const category = params.category || "";
  const difficulty = params.difficulty as Difficulty | undefined;

  // Fetch from Prisma with fallbacks
  let courses: any[] = [];
  try {
    courses = await getCourses({
      search,
      category,
      difficulty,
    });
  } catch (e) {
    console.warn("Could not fetch courses from database, falling back.", e);
  }

  // If DB returns nothing (or fails), use static courses
  if (courses.length === 0) {
    courses = staticCourses.map((c) => ({
      id: c.slug,
      title: c.title,
      slug: c.slug,
      description: "A comprehensive course designed to build long-lasting understanding.",
      category: c.category,
      ageRangeMin: 10,
      ageRangeMax: 18,
      difficulty: c.difficulty.toUpperCase() as Difficulty,
      durationWeeks: parseInt(c.duration) || 8,
      priceCents: 29900,
      teacher: { user: { name: c.teacher } },
      reviews: [{ rating: c.rating }],
      _count: { enrollments: c.studentsEnrolled },
    }));
  }

  const categories = Array.from(new Set(courses.map((c) => c.category)));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container>
          <div className="space-y-4">
            <SectionHeading
              eyebrow="Curriculum Directory"
              title="Find your learning path"
              description="Aevian classes are built as structured graphs — choose a foundation or jump into an advanced specialization."
            />
          </div>

          {/* Filter Bar */}
          <div className="mt-12 flex flex-col gap-4 rounded-lg border border-border bg-card p-6 md:flex-row md:items-center">
            {/* Search Input */}
            <form action="" method="GET" className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input
                name="search"
                defaultValue={search}
                placeholder="Search algebra, python, speaking..."
                className="h-11 w-full rounded-md border border-border bg-background pl-10 pr-4 text-sm text-foreground focus:border-meridian focus:outline-none focus:ring-2 focus:ring-gold"
              />
            </form>

            <div className="flex flex-wrap gap-3">
              {/* Category selector */}
              <select
                name="category"
                defaultValue={category}
                className="h-11 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:border-meridian focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Difficulty selector */}
              <select
                name="difficulty"
                defaultValue={difficulty || ""}
                className="h-11 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:border-meridian focus:outline-none focus:ring-2 focus:ring-gold"
              >
                <option value="">All Levels</option>
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>

              <Button type="submit" variant="primary">
                Filter
              </Button>
            </div>
          </div>

          {/* Course Roster */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const totalRating = course.reviews?.reduce((acc: number, r: any) => acc + r.rating, 0) || 0;
              const avgRating = course.reviews?.length > 0 ? (totalRating / course.reviews.length).toFixed(1) : "5.0";

              return (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md"
                >
                  <div className="flex flex-wrap gap-2">
                    <Badge>{course.difficulty}</Badge>
                    <Badge>Ages {course.ageRangeMin}–{course.ageRangeMax}</Badge>
                  </div>
                  <h3 className="mt-4 text-lg group-hover:text-meridian line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {course.category} · {course.durationWeeks} weeks
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-3 flex-1">
                    {course.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm">
                    <Star size={14} className="fill-gold text-gold" />
                    <span className="font-medium">{avgRating}</span>
                    <span className="text-muted-foreground">
                      · {course._count?.enrollments || 0} students
                    </span>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm font-mono text-muted-foreground">
                      Taught by {course.teacher?.user?.name}
                    </span>
                    <span className="font-semibold text-foreground">
                      ${(course.priceCents / 100).toFixed(0)} USD
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
