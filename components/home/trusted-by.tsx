import { Container } from "@/components/ui/container";

const marks = [
  "The British School",
  "Roots International",
  "Beaconhouse Network",
  "Learning Alliance",
  "Crescent Academy",
];

export function TrustedBy() {
  return (
    <div className="border-b border-border bg-card py-10">
      <Container>
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-wide text-muted-foreground">
          Trusted by families and schools in 40+ countries
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {marks.map((mark) => (
            <span key={mark} className="font-display text-lg text-muted-foreground">
              {mark}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}
