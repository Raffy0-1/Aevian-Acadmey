"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { BrandLogo } from "@/components/ui/brand-logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/programs", label: "Programs" },
  { href: "/teachers", label: "Teachers" },
  { href: "/parents", label: "For Parents" },
  { href: "/countries", label: "Countries" },
  { href: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md transition-all">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" aria-label="Aevian Academy Home">
          <BrandLogo size="md" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-copper relative py-1",
                  isActive
                    ? "text-copper font-semibold"
                    : "text-navy/80 dark:text-cream/80"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="text-sm font-semibold text-navy hover:text-copper transition-colors dark:text-cream"
          >
            Log in
          </Link>
          <Link href="/book-trial">
            <Button variant="copper" size="sm" className="gap-1.5 shadow-sm">
              <span>Book Free Trial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg lg:hidden transition-colors hover:bg-muted text-navy dark:text-cream"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {/* Mobile Drawer Menu */}
      <div
        className={cn(
          "grid overflow-hidden border-t border-border bg-background/98 transition-all duration-300 lg:hidden shadow-xl",
          open ? "grid-rows-[1fr] opacity-100 py-4" : "grid-rows-[0fr] opacity-0 py-0"
        )}
      >
        <div className="overflow-hidden">
          <Container className="flex flex-col gap-4 py-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base font-medium py-2 border-b border-border/40 transition-colors",
                  pathname === link.href ? "text-copper font-semibold" : "text-navy dark:text-cream hover:text-copper"
                )}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/login"
                className="text-center py-2.5 text-base font-semibold text-navy border border-border rounded-lg hover:bg-muted dark:text-cream"
                onClick={() => setOpen(false)}
              >
                Log in
              </Link>
              <Link href="/book-trial" onClick={() => setOpen(false)}>
                <Button variant="copper" size="lg" className="w-full justify-center">
                  Book Free Trial
                </Button>
              </Link>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
}

