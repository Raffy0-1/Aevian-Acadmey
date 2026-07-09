import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BookOpen, Award, Users, Heart } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: BookOpen,
      title: "Compounding Curricula",
      description: "We don't teach isolated tricks. Every lesson is designed as a node in a graph, directly unlocking the next concept to build true, lasting mastery.",
    },
    {
      icon: Users,
      title: "Live, Small-Group Mentorship",
      description: "Learning is social. Under eight students per class allows our credentialed teachers to provide targeted feedback and cultivate real class dynamics.",
    },
    {
      icon: Award,
      title: "Rigorous Standards",
      description: "Our teachers are thoroughly vetted, background checked, and observed leading classes before they ever join Aevian. We pay teachers premium rates to attract the top 1%.",
    },
    {
      icon: Heart,
      title: "Student-First Growth",
      description: "We provide comprehensive written reports, graded assignments, progress logs, and automated notifications to make parents active partners in learning.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16 space-y-20">
        {/* Intro Section */}
        <Container>
          <div className="max-w-3xl space-y-6">
            <SectionHeading
              eyebrow="Our Story"
              title="Education built to compound, not expire."
              description="Aevian was founded to push back against the 'video library' trend in online learning. We believe that learning is a live, collaborative process best guided by expert mentors."
            />
            <p className="text-base leading-relaxed text-muted-foreground">
              Most platforms scale by removing the teacher from the equation — offering pre-recorded packages where students are left to study alone. Aevian scales the teacher. We provide elite educators with custom, timezone-aware interactive tools to host small, synchronous groups across the world.
            </p>
          </div>
        </Container>

        {/* Core Values */}
        <section className="bg-card border-y border-border py-20">
          <Container>
            <SectionHeading
              eyebrow="Our Pillars"
              title="The principles that guide us"
              align="center"
              className="mx-auto"
            />
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, idx) => (
                <div key={idx} className="rounded-lg border border-border bg-background p-6 space-y-4">
                  <v.icon className="text-gold" size={24} />
                  <h3 className="text-lg font-medium text-foreground">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{v.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Vision Statement */}
        <Container className="text-center max-w-2xl py-10 space-y-6">
          <h2 className="font-display text-3xl text-foreground">
            A curriculum is a graph, not a list.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            By connecting concepts logically, we help young minds build frameworks of knowledge that survive semester tests and serve them as lifelong assets.
          </p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
