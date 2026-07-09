import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Award, Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const fallbackTeachers = [
  {
    id: "t1",
    user: { name: "Nadia Farooq" },
    bio: "Mathematics educator with 12 years of experience in IB and Cambridge curricula. Passionate about making algebra and calculus intuitive for young learners.",
    subjects: ["Mathematics", "Statistics"],
    yearsExperience: 12,
    hourlyRate: 4500,
  },
  {
    id: "t2",
    user: { name: "James Whitfield" },
    bio: "CELTA-certified English teacher specializing in spoken fluency and exam preparation. Former BBC language program contributor.",
    subjects: ["English", "Creative Writing"],
    yearsExperience: 9,
    hourlyRate: 5000,
  },
  {
    id: "t3",
    user: { name: "Aravind Rao" },
    bio: "Software engineer turned educator. Built curriculum for coding bootcamps across Southeast Asia. Teaches Python and Web Development.",
    subjects: ["Computer Science", "Python", "Web Development"],
    yearsExperience: 7,
    hourlyRate: 5500,
  },
];

async function getTeachers() {
  try {
    const list = await prisma.teacherProfile.findMany({
      include: { user: true },
    });
    if (list.length > 0) return list;
  } catch (e) {
    console.warn("Could not query teachers, using fallbacks.", e);
  }
  return fallbackTeachers;
}

export default async function TeachersPage() {
  const teachers = await getTeachers();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container>
          <SectionHeading
            eyebrow="Expert Faculty"
            title="Learn from vetted industry professionals"
            description="Our teachers hold advanced degrees and deep classroom experience. We observe every educator live before matching them with students."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((t: any) => (
              <div
                key={t.id}
                className="group flex flex-col rounded-lg border border-border bg-card p-6"
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground">{t.user.name}</h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Award size={13} /> {t.yearsExperience} years experience
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground flex-1 line-clamp-3">
                  {t.bio}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {t.subjects.map((sub: string) => (
                    <Badge key={sub}>{sub}</Badge>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-mono text-sm text-foreground">
                    ${(t.hourlyRate / 100).toFixed(0)}/hr
                  </span>
                  <Link href={`/teachers/${t.id}`}>
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <Calendar size={13} /> Book Slot
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
