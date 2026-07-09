import { AuthCard } from "@/components/auth/auth-card";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <AuthCard
      title="Verify your email"
      subtitle="We've sent a verification link to your email address."
    >
      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          Please click the link in that email to confirm your account and activate
          your dashboard access.
        </p>
        <div className="pt-4">
          <Link
            href="/login"
            className="inline-flex h-11 items-center justify-center rounded-md bg-meridian px-6 text-sm font-medium text-meridian-foreground transition-colors hover:bg-meridian/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Go to login
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
