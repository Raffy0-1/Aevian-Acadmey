import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 select-none cursor-pointer",
  {
    variants: {
      variant: {
        copper: "bg-copper text-white hover:bg-copper-hover shadow-sm hover:shadow-md copper-glow",
        navy: "bg-navy text-white hover:bg-navy-light shadow-sm hover:shadow-md",
        primary: "bg-copper text-white hover:bg-copper-hover shadow-sm copper-glow",
        gold: "bg-copper text-white hover:bg-copper-hover shadow-sm copper-glow",
        outline:
          "border border-slate-border bg-transparent hover:bg-muted text-navy dark:text-cream hover:border-copper/40",
        ghost: "hover:bg-muted text-navy dark:text-cream",
        link: "text-copper underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-6 text-sm",
        sm: "h-9 px-4 text-xs font-semibold",
        lg: "h-12 px-8 text-base font-semibold",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "copper",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-current" />
            <span>Processing...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

