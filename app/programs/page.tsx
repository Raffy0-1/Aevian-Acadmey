import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { programs } from "@/lib/data/programs";

export const dynamic = "force-static";

export default function ProgramsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container>
          <div className="space-y-4 max-w-3xl">
            <SectionHeading
              eyebrow="Aevian Programs"
              title="Global Online Learning for Students Worldwide"
              description="Empowering students worldwide through personalized tutoring, academic excellence programs, and international test preparation."
            />
          </div>

          <div className="mt-16 space-y-24">
            {programs.map((program) => (
              <section key={program.id} id={program.id}>
                <div className="mb-8">
                  <h2 className="text-3xl font-semibold tracking-tight text-foreground">{program.title}</h2>
                  <p className="mt-2 text-lg text-muted-foreground">{program.description}</p>
                </div>
                
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {program.courses.map((course) => (
                    <div
                      key={course.slug}
                      className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md"
                    >
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.badges.map(badge => (
                          <Badge key={badge} className="bg-meridian/10 text-meridian">{badge}</Badge>
                        ))}
                      </div>
                      <h3 className="text-xl font-medium text-foreground group-hover:text-meridian">
                        {course.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground flex-1">
                        {course.description}
                      </p>
                      
                      <div className="mt-6 space-y-2">
                        <p className="text-sm">
                          <span className="font-medium text-foreground">Target: </span>
                          <span className="text-muted-foreground">{course.targetStudents}</span>
                        </p>
                        <p className="text-sm">
                          <span className="font-medium text-foreground">Duration: </span>
                          <span className="text-muted-foreground">{course.duration}</span>
                        </p>
                      </div>

                      <div className="mt-6 border-t border-border pt-6">
                        <Link 
                          href={`/programs/${course.slug}`}
                          className="flex items-center justify-center w-full rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
                        >
                          View Details & Free Trial
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
