"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetFields = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFields>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetFields) => {
    setLoading(true);
    setSuccessMsg(null);
    try {
      // TODO(stage-3): Wire to real Supabase session reset confirmation.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMsg(
        "Password has been reset successfully! Redirecting you to login..."
      );
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      // Ignored for Stage 1/2
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create new password"
      subtitle="Enter a new, strong password to secure your account."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {successMsg && (
          <div className="rounded-md bg-success/10 p-3 text-sm text-success border border-success/20 font-medium">
            {successMsg}
          </div>
        )}

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-foreground"
          >
            New password
          </label>
          <input
            id="password"
            type="password"
            disabled={loading}
            {...register("password")}
            placeholder="••••••••"
            className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-meridian focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-danger">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-foreground"
          >
            Confirm new password
          </label>
          <input
            id="confirmPassword"
            type="password"
            disabled={loading}
            {...register("confirmPassword")}
            placeholder="••••••••"
            className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-meridian focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-danger">
              {errors.confirmPassword.message}
            </p>
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
              Resetting password...
            </>
          ) : (
            "Reset password"
          )}
        </Button>
      </form>
    </AuthCard>
  );
}
