import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Award, Clock, ArrowLeft, Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

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

async function getTeacherDetails(id: string) {
  try {
    const teacher = await prisma.teacherProfile.findUnique({
      where: { id },
      include: { user: true, availability: true },
    });
    if (teacher) return teacher;
  } catch (e) {
    console.warn("Could not query teacher profile, using fallbacks.", e);
  }

  // Fallback match
  const matched = fallbackTeachers.find((t) => t.id === id);
  if (matched) {
    return {
      ...matched,
      availability: [
        { id: "a1", dayOfWeek: 1, startTime: "09:00", endTime: "12:00" },
        { id: "a2", dayOfWeek: 2, startTime: "14:00", endTime: "17:00" },
        { id: "a3", dayOfWeek: 3, startTime: "09:00", endTime: "12:00" },
      ],
    };
  }
  return null;
}

export default async function TeacherDetailPage({ params }: PageProps) {
  const { id } = await params;
  const teacher = await getTeacherDetails(id);

  if (!teacher) {
    notFound();
  }

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="space-y-8">
          <Link
            href="/teachers"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-meridian hover:underline"
          >
            <ArrowLeft size={14} /> Back to teachers directory
          </Link>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left 2 columns: Teacher Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-foreground">
                  <User size={28} />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                    {teacher.user.name}
                  </h1>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Award size={15} /> {teacher.yearsExperience} years professional experience
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-display text-xl text-foreground">About the Teacher</h2>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {teacher.bio}
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="font-display text-xl text-foreground">Subjects Taught</h2>
                <div className="flex flex-wrap gap-1.5">
                  {teacher.subjects.map((sub: string) => (
                    <Badge key={sub}>{sub}</Badge>
                  ))}
                </div>
              </div>

              {/* Weekly Schedule Availability */}
              <div className="space-y-4">
                <h2 className="font-display text-xl text-foreground">Weekly Availability</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {teacher.availability?.map((a: any) => (
                    <div
                      key={a.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-4 text-sm"
                    >
                      <span className="font-medium text-foreground">
                        {dayNames[a.dayOfWeek]}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                        <Clock size={13} /> {a.startTime} – {a.endTime}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Booking panel */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border border-border bg-card p-6 space-y-6 shadow-sm">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                    Hourly rate
                  </p>
                  <p className="mt-2 font-display text-4xl text-foreground">
                    ${(teacher.hourlyRate / 100).toFixed(0)}
                    <span className="text-sm text-muted-foreground">/hr</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <Link href={`/book-trial?teacher=${teacher.id}`} className="block w-full">
                    <Button variant="gold" size="lg" className="w-full">
                      Book Free Trial Class
                    </Button>
                  </Link>
                </div>

                <div className="border-t border-border pt-4 text-xs text-muted-foreground space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gold" />
                    <span>Live 1-on-1 and Group Classes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gold" />
                    <span>Reschedule up to 24h in advance</span>
                  </div>
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
