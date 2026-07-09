import React from "react";
import Link from "next/link";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
}

export function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="text-center">
          <Link
            href="/"
            className="font-display text-3xl font-semibold tracking-tight text-foreground hover:opacity-90 transition-opacity"
          >
            Aevian
          </Link>
          <h2 className="mt-6 font-display text-2xl font-medium tracking-tight text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className="mt-8">{children}</div>

        {footerText && footerLinkText && footerLinkHref && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {footerText}{" "}
            <Link
              href={footerLinkHref}
              className="font-medium text-meridian hover:underline hover:text-meridian/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded"
            >
              {footerLinkText}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
