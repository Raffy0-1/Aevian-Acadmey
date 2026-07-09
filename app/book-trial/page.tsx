import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { BookTrialWizard } from "@/components/booking/book-trial-wizard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getTeachersWithAvailability() {
  try {
    const list = await prisma.teacherProfile.findMany({
      include: {
        user: true,
        availability: true,
      },
    });
    if (list.length > 0) {
      return list.map((t) => ({
        id: t.id,
        name: t.user.name,
        subjects: t.subjects,
        availability: t.availability.map((a) => ({
          id: a.id,
          dayOfWeek: a.dayOfWeek,
          startTime: a.startTime,
          endTime: a.endTime,
        })),
      }));
    }
  } catch (e) {
    console.warn("Could not query teacher schedules, using fallback slots.", e);
  }

  // Fallback schedules
  return [
    {
      id: "t1",
      name: "Nadia Farooq (Math)",
      subjects: ["Mathematics"],
      availability: [
        { id: "a1", dayOfWeek: 1, startTime: "09:00", endTime: "12:00" },
        { id: "a2", dayOfWeek: 2, startTime: "14:00", endTime: "17:00" },
      ],
    },
    {
      id: "t2",
      name: "James Whitfield (English)",
      subjects: ["English"],
      availability: [
        { id: "a3", dayOfWeek: 3, startTime: "09:00", endTime: "12:00" },
        { id: "a4", dayOfWeek: 4, startTime: "14:00", endTime: "17:00" },
      ],
    },
  ];
}

export default async function BookTrialPage() {
  const teachers = await getTeachersWithAvailability();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="max-w-2xl">
          <BookTrialWizard teachers={teachers} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
