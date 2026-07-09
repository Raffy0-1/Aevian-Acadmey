"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

// TODO(stage-3): RLS — students only see their own submissions,
// teachers only see submissions for their courses.

const submitHomeworkSchema = z.object({
  homeworkId: z.string().min(1),
  studentId: z.string().min(1),
  text: z.string().optional(),
  fileUrl: z.string().url().optional(),
});

const gradeHomeworkSchema = z.object({
  submissionId: z.string().min(1),
  grade: z.string().min(1, "Grade is required"),
  feedback: z.string().optional(),
});

export type HomeworkActionResult = {
  error?: string;
  success?: boolean;
};

/**
 * Submit a homework assignment.
 */
export async function submitHomework(
  data: z.infer<typeof submitHomeworkSchema>
): Promise<HomeworkActionResult> {
  const parsed = submitHomeworkSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    await prisma.homeworkSubmission.create({
      data: {
        homeworkId: parsed.data.homeworkId,
        studentId: parsed.data.studentId,
        text: parsed.data.text,
        fileUrl: parsed.data.fileUrl,
      },
    });
    return { success: true };
  } catch (e) {
    console.error("Failed to submit homework:", e);
    return { error: "Failed to submit homework." };
  }
}

/**
 * Grade a homework submission (teacher).
 */
export async function gradeHomework(
  data: z.infer<typeof gradeHomeworkSchema>
): Promise<HomeworkActionResult> {
  const parsed = gradeHomeworkSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    await prisma.homeworkSubmission.update({
      where: { id: parsed.data.submissionId },
      data: {
        grade: parsed.data.grade,
        feedback: parsed.data.feedback,
      },
    });
    return { success: true };
  } catch (e) {
    console.error("Failed to grade homework:", e);
    return { error: "Failed to grade homework." };
  }
}

/**
 * Get homework submissions for a student.
 */
export async function getHomeworkForStudent(studentId: string) {
  return prisma.homeworkSubmission.findMany({
    where: { studentId },
    include: {
      homework: {
        include: {
          lesson: {
            include: {
              module: {
                include: { course: true },
              },
            },
          },
        },
      },
    },
    orderBy: { submittedAt: "desc" },
  });
}

/**
 * Get homework assignments for a course's lessons.
 */
export async function getHomeworkForCourse(courseId: string) {
  return prisma.homework.findMany({
    where: {
      lesson: {
        module: { courseId },
      },
    },
    include: {
      lesson: true,
      submissions: {
        include: {
          student: { include: { user: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}
