import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Faq } from "@/components/home/faq";

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container>
          <Faq />
        </Container>
      </main>
      <Footer />
    </>
  );
}
