import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Star, Quote, ShieldCheck } from "lucide-react";

export default function ReviewsPage() {
  const reviews = [
    {
      author: "Sarah Chen",
      role: "Parent of Lily (Ages 12)",
      rating: 5,
      comment: "Nadia Farooq has a way of making mathematical concepts accessible that pre-recorded videos simply cannot touch. Lily has moved from avoiding math homework to asking for advanced topics.",
    },
    {
      author: "Wei Zhang",
      role: "Parent of Leo (Age 14)",
      rating: 5,
      comment: "Aravind's Python coding workshop was exactly the project-based structure Leo needed. The custom feedback after every class is very thorough and keeps me informed.",
    },
    {
      author: "Marcus Vance",
      role: "Student (Age 16)",
      rating: 5,
      comment: "The IB Physics mechanics classes prepare you directly for college-level concepts. Dr. Marchetti makes sure you understand the core mechanics instead of just plugging formulas.",
    },
    {
      author: "Carla Silva",
      role: "Parent of Lucas (Age 11)",
      rating: 4,
      comment: "We joined spoken English fluency class to build conversational confidence. The timezone schedules are extremely convenient and classes are highly interactive.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="space-y-16">
          <SectionHeading
            eyebrow="Success Stories"
            title="What Aevian families say"
            description="Read verified parent reviews and student outcomes from our compounding curricula across Mathematics, English, Coding, and Physics."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="relative rounded-lg border border-border bg-card p-8 shadow-sm space-y-4"
              >
                <Quote className="absolute right-6 top-6 h-8 w-8 text-gold/15" />
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-gold text-gold" />
                  ))}
                </div>

                <p className="text-base leading-relaxed text-foreground italic">
                  &ldquo;{r.comment}&rdquo;
                </p>

                <div className="border-t border-border pt-4 flex justify-between items-center text-sm">
                  <div>
                    <h3 className="font-medium text-foreground">{r.author}</h3>
                    <p className="text-xs text-muted-foreground">{r.role}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-meridian font-mono">
                    <ShieldCheck size={14} /> Verified Student
                  </div>
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
