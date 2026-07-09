"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

// TODO(stage-3): RLS — one review per student per course.

const postReviewSchema = z.object({
  studentId: z.string().min(1),
  courseId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
});

export type ReviewActionResult = {
  error?: string;
  success?: boolean;
};

/**
 * Post a review for a course.
 */
export async function postReview(
  data: z.infer<typeof postReviewSchema>
): Promise<ReviewActionResult> {
  const parsed = postReviewSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    await prisma.review.create({
      data: {
        studentId: parsed.data.studentId,
        courseId: parsed.data.courseId,
        rating: parsed.data.rating,
        comment: parsed.data.comment,
      },
    });
    return { success: true };
  } catch (e) {
    console.error("Failed to post review:", e);
    return { error: "Failed to post review. You may have already reviewed this course." };
  }
}

/**
 * Get all reviews for a course.
 */
export async function getReviewsForCourse(courseId: string) {
  return prisma.review.findMany({
    where: { courseId },
    include: {
      student: {
        include: { user: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Get the average rating for a course.
 */
export async function getCourseAverageRating(courseId: string) {
  const result = await prisma.review.aggregate({
    where: { courseId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  return {
    average: result._avg.rating ?? 0,
    count: result._count.rating,
  };
}
