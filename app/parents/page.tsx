import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CheckCircle2 } from "lucide-react";

export default function ParentsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="max-w-4xl space-y-12">
          <SectionHeading
            eyebrow="For Parents"
            title="Stay Connected to Your Child's Progress"
            description="We believe education is a partnership. Our platform provides complete transparency into your child's learning journey."
          />

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <CheckCircle2 className="h-8 w-8 text-meridian mb-4" />
              <h3 className="text-xl font-medium text-foreground">Attendance Monitoring</h3>
              <p className="mt-2 text-muted-foreground">
                Get real-time notifications about class attendance and schedule changes directly to your dashboard.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <CheckCircle2 className="h-8 w-8 text-meridian mb-4" />
              <h3 className="text-xl font-medium text-foreground">Progress Tracking</h3>
              <p className="mt-2 text-muted-foreground">
                View detailed milestone reports and understand exactly which curriculum objectives have been met.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <CheckCircle2 className="h-8 w-8 text-meridian mb-4" />
              <h3 className="text-xl font-medium text-foreground">Homework & Assignments</h3>
              <p className="mt-2 text-muted-foreground">
                See what homework is due, review completed assignments, and track grades for ongoing assessments.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <CheckCircle2 className="h-8 w-8 text-meridian mb-4" />
              <h3 className="text-xl font-medium text-foreground">Teacher Feedback</h3>
              <p className="mt-2 text-muted-foreground">
                Read regular feedback reports from expert teachers and communicate with them directly.
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
