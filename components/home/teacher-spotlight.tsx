import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";

const teachers = [
  { name: "Nadia Farooq", subject: "Mathematics", years: "7 yrs teaching" },
  { name: "James Whitfield", subject: "English", years: "6 yrs teaching" },
  { name: "Aravind Rao", subject: "Computer Science", years: "5 yrs teaching" },
  { name: "Elena Marchetti", subject: "Physics", years: "9 yrs teaching" },
];

export function TeacherSpotlight() {
  return (
    <section className="border-y border-border bg-card py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Teachers"
          title="Every teacher is interviewed, observed, and reviewed by families"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((teacher) => (
            <div key={teacher.name} className="rounded-lg border border-border bg-background p-6">
              <div className="h-14 w-14 rounded-full bg-meridian/10" aria-hidden="true" />
              <h3 className="mt-4 text-base">{teacher.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{teacher.subject}</p>
              <Badge className="mt-3">{teacher.years}</Badge>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
