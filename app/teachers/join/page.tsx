import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";

export default function TeachersJoinPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="max-w-4xl space-y-12 text-center">
          <SectionHeading
            eyebrow="For Teachers"
            title="Join Our Global Teaching Network"
            description="Aevian is looking for passionate, certified instructors to teach students worldwide. Bring your expertise to a global audience."
          />
          
          <div className="mx-auto max-w-2xl bg-card rounded-lg border border-border p-8 mt-12 text-left">
            <h3 className="text-2xl font-medium text-foreground mb-4">Why Teach With Us?</h3>
            <ul className="space-y-4 text-muted-foreground list-disc pl-5">
              <li><strong>Global Reach:</strong> Connect with students from the UK, USA, Australia, the Gulf, and beyond.</li>
              <li><strong>Flexible Hours:</strong> Teach on your own timezone with our advanced scheduling system.</li>
              <li><strong>Premium Support:</strong> We handle the marketing, billing, and technical support so you can focus on teaching.</li>
              <li><strong>Competitive Compensation:</strong> Earn premium rates, especially for specialized international curricula and test prep.</li>
            </ul>

            <div className="mt-8 text-center">
              <Button variant="gold" size="lg">Apply to Teach</Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
