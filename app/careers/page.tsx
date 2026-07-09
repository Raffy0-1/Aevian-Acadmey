import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock } from "lucide-react";

export default function CareersPage() {
  const jobs = [
    {
      title: "Online Curriculum Designer",
      department: "Product / Academics",
      location: "Remote (UK/Europe)",
      type: "Full-time",
    },
    {
      title: "Full Stack Engineer (Next.js & Supabase)",
      department: "Engineering",
      location: "Remote (Global)",
      type: "Full-time",
    },
    {
      title: "IB Mathematics Teacher (Group Classes)",
      department: "Faculty",
      location: "Remote",
      type: "Part-time / Hourly",
    },
    {
      title: "Customer Support Associate",
      department: "Operations",
      location: "Remote (Asia-Pacific)",
      type: "Full-time",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="space-y-12">
          <SectionHeading
            eyebrow="Join the Faculty"
            title="Help us build education that compounds"
            description="We are a distributed team of engineers, curriculum developers, and elite educators passionate about replacing prerecorded course content with rigorous live classrooms."
          />

          <div className="space-y-4">
            <h2 className="font-display text-xl text-foreground">Open Positions</h2>
            <div className="grid gap-4">
              {jobs.map((job, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border border-border bg-card p-6 gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="text-gold" />
                      <h3 className="text-lg font-medium text-foreground">{job.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
                      <span>{job.department}</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {job.type}
                      </span>
                    </div>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
