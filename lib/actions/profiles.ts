"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { EnglishLevel } from "@prisma/client";

// TODO(stage-3): RLS — users can only update their own profile.

const updateProfileSchema = z.object({
  userId: z.string().min(1),
  name: z.string().min(2).optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  timezone: z.string().optional(),
  locale: z.string().optional(),
});

const updateParentProfileSchema = z.object({
  parentProfileId: z.string().min(1),
  phone: z.string().optional(),
  country: z.string().optional(),
});

const updateStudentProfileSchema = z.object({
  studentProfileId: z.string().min(1),
  gradeLevel: z.string().optional(),
  englishLevel: z.nativeEnum(EnglishLevel).optional(),
});

const updateTeacherProfileSchema = z.object({
  teacherProfileId: z.string().min(1),
  bio: z.string().optional(),
  subjects: z.array(z.string()).optional(),
  yearsExperience: z.number().int().min(0).optional(),
  hourlyRate: z.number().int().min(0).optional(),
});

export type ProfileActionResult = {
  error?: string;
  success?: boolean;
};

/**
 * Update the base User profile (name, avatar, timezone, locale).
 */
export async function updateProfile(
  data: z.infer<typeof updateProfileSchema>
): Promise<ProfileActionResult> {
  const parsed = updateProfileSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { userId, ...updateData } = parsed.data;

  // Remove undefined values
  const cleanData = Object.fromEntries(
    Object.entries(updateData).filter(([, v]) => v !== undefined)
  );

  try {
    await prisma.user.update({
      where: { id: userId },
      data: cleanData,
    });
    return { success: true };
  } catch (e) {
    console.error("Failed to update profile:", e);
    return { error: "Failed to update profile." };
  }
}

/**
 * Update a parent's profile details.
 */
export async function updateParentProfile(
  data: z.infer<typeof updateParentProfileSchema>
): Promise<ProfileActionResult> {
  const parsed = updateParentProfileSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { parentProfileId, ...updateData } = parsed.data;

  try {
    await prisma.parentProfile.update({
      where: { id: parentProfileId },
      data: updateData,
    });
    return { success: true };
  } catch (e) {
    console.error("Failed to update parent profile:", e);
    return { error: "Failed to update parent profile." };
  }
}

/**
 * Update a student's profile details.
 */
export async function updateStudentProfile(
  data: z.infer<typeof updateStudentProfileSchema>
): Promise<ProfileActionResult> {
  const parsed = updateStudentProfileSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { studentProfileId, ...updateData } = parsed.data;

  try {
    await prisma.studentProfile.update({
      where: { id: studentProfileId },
      data: updateData,
    });
    return { success: true };
  } catch (e) {
    console.error("Failed to update student profile:", e);
    return { error: "Failed to update student profile." };
  }
}

/**
 * Update a teacher's profile details.
 */
export async function updateTeacherProfile(
  data: z.infer<typeof updateTeacherProfileSchema>
): Promise<ProfileActionResult> {
  const parsed = updateTeacherProfileSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { teacherProfileId, ...updateData } = parsed.data;

  try {
    await prisma.teacherProfile.update({
      where: { id: teacherProfileId },
      data: updateData,
    });
    return { success: true };
  } catch (e) {
    console.error("Failed to update teacher profile:", e);
    return { error: "Failed to update teacher profile." };
  }
}
