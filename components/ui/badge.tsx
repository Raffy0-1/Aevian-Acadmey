import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-border bg-muted px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
