import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import type { User, ParentProfile, StudentProfile, TeacherProfile } from "@prisma/client";

export type AuthUser = User & {
  parentProfile: ParentProfile | null;
  studentProfile: StudentProfile | null;
  teacherProfile: TeacherProfile | null;
};

/**
 * Get the currently authenticated user with their role-specific profile.
 * Returns null if not authenticated.
 *
 * TODO(stage-3): Replace app-level auth checks with RLS policies.
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) return null;

  const supabase = await createClient();
  const {
    data: { user: supabaseUser },
  } = await supabase.auth.getUser();

  if (!supabaseUser?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: supabaseUser.email },
    include: {
      parentProfile: true,
      studentProfile: true,
      teacherProfile: true,
    },
  });

  return user;
}

/**
 * Get the dashboard path for a given role.
 */
export function getDashboardPath(role: string): string {
  switch (role) {
    case "PARENT":
      return "/dashboard/parent";
    case "STUDENT":
      return "/dashboard/student";
    case "TEACHER":
      return "/dashboard/teacher";
    case "ADMIN":
      return "/dashboard/admin";
    default:
      return "/";
  }
}
