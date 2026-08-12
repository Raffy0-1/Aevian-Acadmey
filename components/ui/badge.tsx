import { cn } from "@/lib/utils";

interface BadgeProps {
  className?: string;
  variant?: "copper" | "navy" | "outline" | "default";
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = "copper",
  children,
}: BadgeProps) {
  const variantStyles = {
    copper: "border-copper/30 bg-copper/10 text-copper font-semibold",
    navy: "border-navy/20 bg-navy text-white font-semibold",
    outline: "border-slate-border bg-white text-navy font-semibold dark:bg-navy dark:text-cream",
    default: "border-slate-border bg-cream-muted text-slate font-medium",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-1 text-xs tracking-wide transition-colors",
        variantStyles[variant] || variantStyles.default,
        className
      )}
    >
      {children}
    </span>
  );
}

