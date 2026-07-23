import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { StudentDashboardClient } from "@/components/dashboard/student-dashboard-client";

export default async function StudentDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "STUDENT") redirect("/dashboard");

  const studentProfile = user.studentProfile;
  if (!studentProfile) {
    return (
      <div className="p-16 text-center space-y-4">
        <h1 className="font-display text-3xl text-foreground">Profile Incomplete</h1>
        <p className="text-muted-foreground">
          Your student profile has not been fully set up yet. Please contact support to complete your registration.
        </p>
      </div>
    );
  }

  // Query enrolled courses with syllabus modules and lessons
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: studentProfile.id },
    include: {
      course: {
        include: {
          modules: {
            include: { lessons: true },
            orderBy: { order: "asc" },
          },
        },
      },
    },
    orderBy: { startedAt: "desc" },
  });

  // Map database dates/relations for client compatibility
  const mappedEnrollments = enrollments.map((e) => ({
    id: e.id,
    progressPercent: e.progressPercent,
    status: e.status,
    course: {
      id: e.course.id,
      title: e.course.title,
      description: e.course.description,
      modules: e.course.modules.map((m) => ({
        id: m.id,
        title: m.title,
        order: m.order,
        lessons: m.lessons.map((l) => ({
          id: l.id,
          title: l.title,
          order: l.order,
          videoUrl: l.videoUrl,
          durationMinutes: l.durationMinutes,
        })),
      })),
    },
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">
          Welcome back, {user.name ? user.name.split(" ")[0] : "Student"}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Student Dashboard — resume your lessons, complete quizzes, and submit assignments.
        </p>
      </div>

      <StudentDashboardClient
        studentProfileId={studentProfile.id}
        initialEnrollments={mappedEnrollments}
      />
    </div>
  );
}
