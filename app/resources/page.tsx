import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Download, FileText, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ResourcesPage() {
  const materials = [
    {
      title: "Compounding Mathematics Curriculum Roadmap",
      category: "Syllabus Guides",
      description: "Visual concept map illustrating how arithmetic unlocks variables, equation balance, and calculus nodes.",
      format: "PDF (2.4 MB)",
    },
    {
      title: "Python Sandbox Getting Started Guide",
      category: "Computer Science",
      description: "Setup walkthrough for installing visual code, python packages, and building games.",
      format: "PDF (1.8 MB)",
    },
    {
      title: "Interactive English Conversation Prompts",
      category: "Languages",
      description: "Discussion cue cards used in classrooms to practice debate structures and connected speech.",
      format: "PDF (1.2 MB)",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="Study Center"
            title="Downloadable syllabus roadmaps and guides"
            description="Access resources put together by Aevian faculty and curriculum designers to assist home learning paths."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((m, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border bg-card p-6 flex flex-col gap-4"
              >
                <div className="flex-1 space-y-2">
                  <Badge>{m.category}</Badge>
                  <h3 className="text-lg font-medium text-foreground">{m.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {m.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4 text-xs font-mono">
                  <span className="text-muted-foreground">{m.format}</span>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Download size={13} /> Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
