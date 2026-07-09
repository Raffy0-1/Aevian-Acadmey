"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotFields = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFields>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotFields) => {
    setLoading(true);
    setSuccessMsg(null);
    try {
      // TODO(stage-3): Wire to real Supabase/Resend password reset trigger.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMsg(
        "If an account exists for " +
          data.email +
          ", a password reset link has been sent."
      );
    } catch (err) {
      // Ignored for Stage 1/2 stubbing
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your email address and we'll send you a recovery link."
      footerText="Remembered your password?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {successMsg && (
          <div className="rounded-md bg-success/10 p-3 text-sm text-success border border-success/20 font-medium">
            {successMsg}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            disabled={loading}
            {...register("email")}
            placeholder="you@example.com"
            className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-meridian focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-danger">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending recovery link...
            </>
          ) : (
            "Send recovery link"
          )}
        </Button>
      </form>
    </AuthCard>
  );
}
