import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="max-w-3xl space-y-8">
          <h1 className="font-display text-4xl text-foreground">Cookie Policy</h1>
          <p className="font-mono text-xs uppercase text-muted-foreground">
            Last Updated: July 2026
          </p>

          <div className="prose prose-slate max-w-none text-base leading-relaxed text-foreground space-y-6">
            <p>
              Aevian uses cookies to manage user authentication sessions and customize
              dashboard interface preferences.
            </p>
            <h2 className="font-display text-xl text-foreground pt-4">
              1. Essential Cookies
            </h2>
            <p>
              These cookies are required for security purposes and logging into your Parent, Student, Teacher, or Admin dashboards. The website cannot function correctly without these enabled.
            </p>
            <h2 className="font-display text-xl text-foreground pt-4">
              2. Functional Cookies
            </h2>
            <p>
              We store preferences such as chosen timezone, dashboard layouts, and course filters. These settings customize your experience so you don&apos;t have to reset them on every visit.
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
