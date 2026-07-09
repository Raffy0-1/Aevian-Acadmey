import { redirect } from "next/navigation";
import { getCurrentUser, getDashboardPath } from "@/lib/auth";

/**
 * /dashboard — redirects to the user's role-specific dashboard.
 */
export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  redirect(getDashboardPath(user.role));
}
