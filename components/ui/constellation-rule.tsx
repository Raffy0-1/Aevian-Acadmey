import { cn } from "@/lib/utils";

// A quiet, low-contrast echo of the hero constellation: a horizontal rule
// with three nodes, used between sections in place of a plain <hr> or a
// decorative wave/blob shape.
export function ConstellationRule({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6", className)}>
      <svg
        viewBox="0 0 1200 24"
        className="h-6 w-full text-border"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line x1="0" y1="12" x2="1200" y2="12" stroke="currentColor" strokeWidth="1" />
        <circle cx="120" cy="12" r="3" fill="var(--gold)" />
        <circle cx="600" cy="12" r="3" fill="currentColor" />
        <circle cx="1080" cy="12" r="3" fill="var(--gold)" />
      </svg>
    </div>
  );
}
