"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { EnrollmentStatus } from "@prisma/client";

// TODO(stage-3): RLS — students only see their own enrollments.
// TODO(stage-3): Payment verification before enrollment.

const enrollStudentSchema = z.object({
  studentId: z.string().min(1),
  courseId: z.string().min(1),
});

const updateProgressSchema = z.object({
  enrollmentId: z.string().min(1),
  progressPercent: z.number().int().min(0).max(100),
});

export type EnrollmentActionResult = {
  error?: string;
  success?: boolean;
  enrollmentId?: string;
};

/**
 * Enroll a student in a course.
 * TODO(stage-3): Verify payment before allowing enrollment.
 */
export async function enrollStudent(
  data: z.infer<typeof enrollStudentSchema>
): Promise<EnrollmentActionResult> {
  const parsed = enrollStudentSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: parsed.data.studentId,
        courseId: parsed.data.courseId,
        status: EnrollmentStatus.ACTIVE,
      },
    });
    return { success: true, enrollmentId: enrollment.id };
  } catch (e) {
    console.error("Failed to enroll student:", e);
    return { error: "Failed to enroll. Student may already be enrolled in this course." };
  }
}

/**
 * Get all enrollments for a student.
 */
export async function getEnrollmentsForStudent(studentId: string) {
  return prisma.enrollment.findMany({
    where: { studentId },
    include: {
      course: {
        include: {
          teacher: { include: { user: true } },
          modules: { include: { lessons: true }, orderBy: { order: "asc" } },
        },
      },
    },
    orderBy: { startedAt: "desc" },
  });
}

/**
 * Update enrollment progress.
 */
export async function updateProgress(
  data: z.infer<typeof updateProgressSchema>
): Promise<EnrollmentActionResult> {
  const parsed = updateProgressSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    const updateData: Record<string, unknown> = {
      progressPercent: parsed.data.progressPercent,
    };

    if (parsed.data.progressPercent === 100) {
      updateData.status = EnrollmentStatus.COMPLETED;
      updateData.completedAt = new Date();
    }

    await prisma.enrollment.update({
      where: { id: parsed.data.enrollmentId },
      data: updateData,
    });
    return { success: true };
  } catch (e) {
    console.error("Failed to update progress:", e);
    return { error: "Failed to update progress." };
  }
}

/**
 * Get all enrollments for a course (teacher/admin view).
 */
export async function getEnrollmentsForCourse(courseId: string) {
  return prisma.enrollment.findMany({
    where: { courseId },
    include: {
      student: { include: { user: true } },
    },
    orderBy: { startedAt: "desc" },
  });
}
