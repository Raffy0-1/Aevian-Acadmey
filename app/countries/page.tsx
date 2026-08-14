import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Globe } from "lucide-react";

export default function CountriesPage() {
  const primaryRegions = [
    { name: "United Kingdom", badge: "Primary Focus", description: "Comprehensive 1-on-1 private tuition for UK SATs, GCSE/IGCSE, A-Levels, 11+ Selective Exams, and Cambridge board assessments." },
    { name: "Australia", badge: "Primary Focus", description: "Specialized NAPLAN preparation, ACARA Australian Curriculum tutoring, and selective school entrance exam coaching." },
  ];

  const futureRegions = [
    { name: "USA & North America", badge: "Coming Soon", description: "Standardized test prep (SAT/AP) and American curriculum subject tutoring." },
    { name: "Gulf & Middle East", badge: "Coming Soon", description: "Expatriate international school curriculum support and Quranic foundations." },
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

          <div className="space-y-10">
            <div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Primary Target Markets</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {primaryRegions.map((region) => (
                  <div key={region.name} className="flex gap-4 p-6 rounded-xl border border-meridian/30 bg-card shadow-sm">
                    <Globe className="h-6 w-6 text-copper shrink-0 mt-1" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-medium text-foreground">{region.name}</h3>
                        <span className="text-[10px] font-mono uppercase tracking-wider bg-copper/10 text-copper px-2 py-0.5 rounded-md font-semibold">{region.badge}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{region.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <h2 className="font-display text-xl font-medium text-muted-foreground mb-6">Future Expansion</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {futureRegions.map((region) => (
                  <div key={region.name} className="flex gap-4 p-6 rounded-xl border border-border bg-card/60 opacity-85">
                    <Globe className="h-6 w-6 text-muted-foreground shrink-0 mt-1" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-foreground">{region.name}</h3>
                        <span className="text-[10px] font-mono uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 rounded-md">{region.badge}</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">{region.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </Container>
      </main>
      <Footer />
    </>
  );
}
