import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { TeacherDashboardClient } from "@/components/dashboard/teacher-dashboard-client";

export default async function TeacherDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "TEACHER") redirect("/dashboard");

  const teacherProfile = user.teacherProfile;
  if (!teacherProfile) redirect("/dashboard");

  const [bookings, availability] = await Promise.all([
    prisma.booking.findMany({
      where: { teacherId: teacherProfile.id },
      include: {
        student: { include: { user: true } },
        course: true,
      },
      orderBy: { scheduledAt: "desc" },
    }),
    prisma.availability.findMany({
      where: { teacherId: teacherProfile.id },
      orderBy: { dayOfWeek: "asc" },
    }),
  ]);

  // Map database dates/relations for client compatibility
  const mappedBookings = bookings.map((b) => ({
    id: b.id,
    scheduledAt: b.scheduledAt.toISOString(),
    status: b.status,
    type: b.type,
    durationMinutes: b.durationMinutes,
    student: {
      id: b.student.id,
      user: {
        name: b.student.user.name,
        email: b.student.user.email,
      },
    },
    course: b.course ? { title: b.course.title } : null,
  }));

  const mappedAvailability = availability.map((a) => ({
    id: a.id,
    dayOfWeek: a.dayOfWeek,
    startTime: a.startTime,
    endTime: a.endTime,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Teacher Dashboard — check upcoming schedules, manage class registers, and update schedules.
        </p>
      </div>

      <TeacherDashboardClient
        teacherProfileId={teacherProfile.id}
        initialBookings={mappedBookings}
        initialAvailability={mappedAvailability}
      />
    </div>
  );
}
