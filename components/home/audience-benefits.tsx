import { Container } from "@/components/ui/container";
import { ConstellationRule } from "@/components/ui/constellation-rule";

const parent = [
  "See attendance, homework, and grades in one dashboard",
  "Get written feedback from the teacher after every class",
  "Reschedule or pause classes without contacting support",
  "Download invoices and receipts anytime",
];

const student = [
  "Join live classes from any device, no software to install",
  "Track your own progress and unlock the next module",
  "Earn certificates tied to real curriculum outcomes",
  "Message your teacher directly between classes",
];

export function AudienceBenefits() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">
              For parents
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Clarity, without checking in constantly
            </h2>
            <ul className="mt-8 space-y-4">
              {parent.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-meridian" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-gold">
              For students
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              A path you can actually see yourself on
            </h2>
            <ul className="mt-8 space-y-4">
              {student.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
      <div className="mt-20">
        <ConstellationRule />
      </div>
    </section>
  );
}
