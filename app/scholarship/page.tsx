import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Heart } from "lucide-react";

export default function ScholarshipPage() {
  const steps = [
    {
      icon: BookOpen,
      title: "1. Eligibility",
      description: "Open to students aged 8–18 who show strong curiosity for mathematics, science, or coding, and require financial assistance.",
    },
    {
      icon: Award,
      title: "2. Application",
      description: "Fill out a student statement and upload a teacher recommendation letter describing interests and academic motivation.",
    },
    {
      icon: Heart,
      title: "3. Fully Funded Tuition",
      description: "Selected scholars receive 100% tuition coverage for full length courses, plus device and internet access grants.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="space-y-16">
          <SectionHeading
            eyebrow="Financial Aid"
            title="Aevian Scholarship Program"
            description="We are committed to making premium online education accessible. Every cohort includes fully funded scholarship slots."
          />

          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border bg-card p-6 space-y-4 text-center flex flex-col items-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-gold">
                  <s.icon size={22} />
                </div>
                <h3 className="text-lg font-medium text-foreground">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="gold" size="lg">
              Submit Aid Application
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
