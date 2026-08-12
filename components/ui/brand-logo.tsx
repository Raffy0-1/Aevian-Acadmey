import React from "react";

interface BrandLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ className = "", iconOnly = false, size = "md" }: BrandLogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon: Geometric continuous 'A' path from moodboard */}
      <svg
        className={iconSizes[size]}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Aevian Academy Icon"
      >
        {/* Left Loop Path - Deep Slate Navy */}
        <path
          d="M 50 15 
             C 42 15, 22 45, 18 68 
             C 15 82, 32 90, 42 78 
             L 56 58 
             C 62 50, 52 38, 44 46 
             L 34 58"
          stroke="#1C2A38"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Right Leg & Intersecting Path - Terracotta Rust/Warm Copper */}
        <path
          d="M 46 28 
             L 76 75 
             C 80 82, 88 84, 92 84"
          stroke="#C86D51"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Inner Connecting Accent Line */}
        <path
          d="M 32 62 
             L 66 62"
          stroke="#C86D51"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span className={`font-display font-bold tracking-tight text-navy dark:text-cream ${textSizes[size]}`}>
            Aevian
          </span>
          <span className="font-display font-medium text-[0.65em] tracking-[0.18em] uppercase text-copper -mt-0.5">
            Academy
          </span>
        </div>
      )}
    </div>
  );
}
