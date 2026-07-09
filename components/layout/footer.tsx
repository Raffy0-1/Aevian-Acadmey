import Link from "next/link";
import { Container } from "@/components/ui/container";

const columns = [
  {
    title: "Learn",
    links: [
      { href: "/courses", label: "Courses" },
      { href: "/teachers", label: "Teachers" },
      { href: "/pricing", label: "Pricing" },
      { href: "/book-trial", label: "Book Free Trial" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Programs",
    links: [
      { href: "/scholarships", label: "Scholarship Program" },
      { href: "/affiliates", label: "Affiliate Program" },
      { href: "/refer", label: "Refer a Friend" },
      { href: "/success-stories", label: "Student Success Stories" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms" },
      { href: "/cookies", label: "Cookie Policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <p className="font-display text-xl">Aevian</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Live online classes with real teachers, built around curricula
              designed to compound.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Aevian. All rights reserved.</p>
          <p>Made for students in over 40 countries.</p>
        </div>
      </Container>
    </footer>
  );
}
