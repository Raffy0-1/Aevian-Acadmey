"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFields = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFields>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFields) => {
    setLoading(true);
    setSuccessMsg(null);
    try {
      // TODO(stage-3): Store support ticket or trigger auto email campaigns.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMsg("Thank you! Your message has been received. We will get back to you shortly.");
    } catch (err) {
      // Ignored
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background py-16">
        <Container className="grid gap-12 lg:grid-cols-2">
          {/* Info Side */}
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Contact Us"
              title="Get in touch with Aevian"
              description="Have questions about matching teachers, syllabus contents, trial bookings, or pricing tiers? Drop us a line and we will reply within 12 hours."
            />

            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="text-gold h-5 w-5" />
                <span>support@aevian.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-gold h-5 w-5" />
                <span>+1 (800) 555-0199</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-gold h-5 w-5" />
                <span>London, United Kingdom</span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {successMsg && (
                <div className="rounded-md bg-success/10 p-3 text-sm text-success border border-success/20 font-medium">
                  {successMsg}
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  disabled={loading}
                  {...register("name")}
                  placeholder="Jane Doe"
                  className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-meridian focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-danger">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email Address
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

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  disabled={loading}
                  {...register("message")}
                  placeholder="Tell us what you're looking for..."
                  className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-meridian focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50"
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-danger">{errors.message.message}</p>
                )}
              </div>

              <Button type="submit" variant="primary" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending message...
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
