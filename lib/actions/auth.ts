"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { getDashboardPath } from "@/lib/auth";

// TODO(stage-3): Rate limiting on auth endpoints.
// TODO(stage-3): Email verification flow.

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.nativeEnum(Role),
});

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type AuthActionResult = {
  error?: string;
  success?: boolean;
};

/**
 * Sign up a new user. Creates both a Supabase auth user and the
 * corresponding User + profile row in Prisma.
 */
export async function signUp(formData: FormData): Promise<AuthActionResult> {
  const parsed = signUpSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
    role: formData.get("role") as string,
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { email, password, name, role } = parsed.data;

  const supabase = await createClient();

  // Create Supabase auth user
  const { error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, role },
    },
  });

  if (authError) {
    return { error: authError.message };
  }

  // Create Prisma User + profile
  try {
    const profileData: Record<string, object> = {};
    if (role === Role.PARENT) {
      profileData.parentProfile = { create: {} };
    } else if (role === Role.STUDENT) {
      profileData.studentProfile = { create: {} };
    } else if (role === Role.TEACHER) {
      profileData.teacherProfile = { create: {} };
    }

    await prisma.user.create({
      data: {
        email,
        name,
        role,
        ...profileData,
      },
    });
  } catch (e) {
    // If Prisma user already exists (e.g. from seed data), update it
    const existing = await prisma.user.findUnique({ where: { email } });
    if (!existing) {
      console.error("Failed to create user:", e);
      return { error: "Failed to create user profile." };
    }
  }

  return { success: true };
}

/**
 * Sign in an existing user.
 */
export async function signIn(formData: FormData): Promise<AuthActionResult> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  const { email, password } = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Look up role and redirect to correct dashboard
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    redirect(getDashboardPath(user.role));
  }

  return { success: true };
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
