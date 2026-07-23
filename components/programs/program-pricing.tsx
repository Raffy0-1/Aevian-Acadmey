"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CurrencySwitcher, Currency } from "@/components/ui/currency-switcher";
import { PricingPackage } from "@/lib/data/programs";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";

export function ProgramPricing({ pricing, courseId }: { pricing: PricingPackage[], courseId: string }) {
  const [currency, setCurrency] = useState<Currency>("GBP");

  const symbols = {
    GBP: "£",
    USD: "$",
    PKR: "Rs ",
  };

  return (
    <div className="sticky top-24 rounded-lg border border-border bg-card p-6 shadow-sm space-y-6">
      <div className="flex justify-between items-start">
        <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
          Tuition Packages
        </p>
        <CurrencySwitcher currency={currency} onChange={setCurrency} />
      </div>

      <div className="space-y-4">
        {pricing.map((pkg, idx) => {
          let displayPrice = "";
          if (currency === "GBP") displayPrice = typeof pkg.priceGBP === "number" ? `${symbols.GBP}${pkg.priceGBP}` : pkg.priceGBP.toString();
          if (currency === "USD") displayPrice = typeof pkg.priceUSD === "number" ? `${symbols.USD}${pkg.priceUSD}` : pkg.priceUSD.toString();
          if (currency === "PKR") displayPrice = typeof pkg.pricePKR === "number" ? `${symbols.PKR}${pkg.pricePKR.toLocaleString()}` : pkg.pricePKR.toString();

          return (
            <div key={idx} className="rounded-md border border-border bg-background p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">{pkg.name}</span>
                <span className="font-display text-xl">{displayPrice}</span>
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-meridian mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Includes all materials, worksheets, and parent reports.
      </p>

      <div className="space-y-3 pt-4">
        <Link href={`/book-trial?course=${courseId}`} className="block w-full">
          <Button variant="gold" size="lg" className="w-full">
            Book Free Trial Class
          </Button>
        </Link>
      </div>

      <div className="border-t border-border pt-4 text-xs text-muted-foreground space-y-2">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-gold" />
          <span>Flexible Package Terms</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-gold" />
          <span>Timezone-aware scheduling</span>
        </div>
      </div>
    </div>
  );
}
