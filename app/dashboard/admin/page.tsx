import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { AdminDashboardClient } from "@/components/dashboard/admin-dashboard-client";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/dashboard");

  const [
    userCount,
    courseCount,
    enrollmentCount,
    bookingCount,
    leadCount,
    ticketCount,
    leadsList,
    usersList,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.enrollment.count(),
    prisma.booking.count(),
    prisma.lead.count(),
    prisma.supportTicket.count(),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  const stats = [
    { label: "Active Users", value: userCount },
    { label: "Course Modules", value: courseCount },
    { label: "Syllabus Enrollments", value: enrollmentCount },
    { label: "Live Bookings", value: bookingCount },
    { label: "CRM Leads", value: leadCount },
    { label: "Support Tickets", value: ticketCount },
  ];

  // Map data for client compatibility
  const mappedLeads = leadsList.map((l) => ({
    id: l.id,
    name: l.name,
    email: l.email,
    source: l.source || "Direct",
    status: l.status,
  }));

  const mappedUsers = usersList.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">
          Platform Administration
        </h1>
        <p className="mt-1 text-muted-foreground">
          Monitor growth trends, adjust user roles, and follow CRM lead conversions.
        </p>
      </div>

      <AdminDashboardClient
        stats={stats}
        initialLeads={mappedLeads}
        initialUsers={mappedUsers}
      />
    </div>
  );
}
