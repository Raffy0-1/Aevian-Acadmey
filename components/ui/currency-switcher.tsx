"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type Currency = "GBP" | "USD" | "PKR";

interface CurrencySwitcherProps {
  currency: Currency;
  onChange: (currency: Currency) => void;
  className?: string;
}

export function CurrencySwitcher({ currency, onChange, className }: CurrencySwitcherProps) {
  const currencies: { code: Currency; label: string; symbol: string }[] = [
    { code: "GBP", label: "GBP (£)", symbol: "£" },
    { code: "USD", label: "USD ($)", symbol: "$" },
    { code: "PKR", label: "PKR (Rs)", symbol: "Rs " },
  ];

  return (
    <div className={cn("inline-flex items-center rounded-md border border-border bg-card p-1", className)}>
      {currencies.map((c) => (
        <button
          key={c.code}
          onClick={() => onChange(c.code)}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-sm transition-colors",
            currency === c.code 
              ? "bg-foreground text-background" 
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
