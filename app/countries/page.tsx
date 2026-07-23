import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Globe } from "lucide-react";

export default function CountriesPage() {
  const regions = [
    { name: "United Kingdom", description: "Our primary market. Extensive support for UK SATs, GCSE/IGCSE, A-Levels, and 11+ Selective School Tests." },
    { name: "Australia", description: "NAPLAN preparation, Australian Curriculum tutoring, and selective school entrance exams." },
    { name: "USA & Canada", description: "SAT/ACT preparation, AP courses, MAP Growth, and American/Canadian school curricula." },
    { name: "Gulf & Middle East", description: "Supporting expatriate families with international curricula and dedicated Quran & Islamic Studies programs." },
    { name: "Europe", description: "IB curriculum specialists and English Language & Communication short courses." },
    { name: "Pakistan & South Asia", description: "Affordable, high-quality tutoring for local and international boards, plus competitive IELTS/PTE preparation." }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="max-w-4xl space-y-12">
          <SectionHeading
            eyebrow="Countries We Serve"
            title="Global Education, Localized Support"
            description="Aevian connects students from around the world with expert educators. We offer specialized support tailored to the educational standards of your region."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            {regions.map((region) => (
              <div key={region.name} className="flex gap-4 p-6 rounded-lg border border-border bg-card">
                <Globe className="h-6 w-6 text-gold shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-medium text-foreground">{region.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{region.description}</p>
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
