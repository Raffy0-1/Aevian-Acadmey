import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Gift, Share2, Award } from "lucide-react";

export default function AffiliatePage() {
  const steps = [
    {
      icon: Share2,
      title: "1. Share your link",
      description: "Get a custom tracking link to share with parents, bloggers, and local communities.",
    },
    {
      icon: Gift,
      title: "2. Family books a trial",
      description: "When they complete their first live trial class, they get standard trial support.",
    },
    {
      icon: Award,
      title: "3. Earn commissions",
      description: "Earn 15% commission on all course enrollments paid by families you refer during their first year.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="space-y-16">
          <SectionHeading
            eyebrow="Partnership"
            title="Aevian Affiliate Program"
            description="Recommend premium online education to your network and earn commissions on course registrations."
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
              Join Affiliate Network
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
