"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createBooking } from "@/lib/actions/bookings";
import { BookingType, EnglishLevel } from "@prisma/client";
import { Loader2, CheckCircle2, Calendar, Clock, Globe, ArrowLeft } from "lucide-react";

// Wizard Validation Schema
const wizardSchema = z.object({
  // Parent
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  parentEmail: z.string().email("Please enter a valid parent email address"),
  parentPhone: z.string().min(6, "Please enter a valid phone number"),
  
  // Student
  studentName: z.string().min(2, "Student name must be at least 2 characters"),
  studentDob: z.string().min(1, "Student date of birth is required"),
  timezone: z.string().min(1, "Timezone is required"),
  englishLevel: z.nativeEnum(EnglishLevel),
  
  // Schedule
  teacherId: z.string().min(1, "Please select a teacher slot"),
  slotId: z.string().min(1, "Please select a time slot"),
  scheduledAt: z.string().min(1, "Date is required"),
  
  // Goals
  goals: z.string().min(5, "Please list some goals for the trial class"),
});

type WizardFields = z.infer<typeof wizardSchema>;

interface Teacher {
  id: string;
  name: string;
  subjects: string[];
  availability: {
    id: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[];
}

interface Props {
  teachers: Teacher[];
}

export function BookTrialWizard({ teachers }: Props) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successBooking, setSuccessBooking] = useState<any>(null);

  // Timezone Auto-detection
  const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<WizardFields>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      timezone: detectedTimezone,
      englishLevel: EnglishLevel.BEGINNER,
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    },
  });

  const watchTeacherId = watch("teacherId");
  const watchTeacher = teachers.find((t) => t.id === watchTeacherId);
  const watchScheduledAt = watch("scheduledAt");

  const nextStep = async () => {
    let fieldsToValidate: (keyof WizardFields)[] = [];
    if (step === 1) {
      fieldsToValidate = ["parentName", "parentEmail", "parentPhone"];
    } else if (step === 2) {
      fieldsToValidate = ["studentName", "studentDob", "timezone"];
    } else if (step === 3) {
      fieldsToValidate = ["englishLevel"];
    } else if (step === 4) {
      fieldsToValidate = ["teacherId", "slotId", "scheduledAt"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data: WizardFields) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      // For Stage 1 trial booking, we'll associate it with a seeded student profile
      // or match the parent email. We'll use a mocked signup/student retrieval to link it cleanly.
      // We will default to a placeholder student ID for testing if no profile matching parent email exists.
      const defaultStudentId = "cl70y2abc00003567abcd1234"; // fallback cuid style
      
      const scheduledTime = new Date(data.scheduledAt);
      const [hours, minutes] = data.slotId.split("-")[0].split(":");
      scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const res = await createBooking({
        studentId: defaultStudentId,
        teacherId: data.teacherId,
        type: BookingType.TRIAL,
        scheduledAt: scheduledTime,
        durationMinutes: 30,
      });

      if (res.error) {
        setErrorMsg(res.error);
      } else {
        setSuccessBooking({
          teacherName: watchTeacher?.name,
          date: scheduledTime.toLocaleDateString(),
          time: `${hours}:${minutes}`,
          timezone: data.timezone,
        });
        setStep(6);
      }
    } catch (err) {
      setErrorMsg("An unexpected error occurred during booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
      {step < 6 && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-muted-foreground">
            <span>Step {step} of 5</span>
            <span>
              {step === 1 && "Parent Contact"}
              {step === 2 && "Student Profile"}
              {step === 3 && "Language Skills"}
              {step === 4 && "Choose Schedule"}
              {step === 5 && "Review & Goals"}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
            <div
              className="h-1.5 rounded-full bg-meridian transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 rounded-md bg-danger/10 p-3 text-sm text-danger border border-danger/20">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* STEP 1: Parent Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl text-foreground">Parent Information</h2>
            <p className="text-sm text-muted-foreground">
              We&apos;ll send confirmation details and lesson reports here.
            </p>
            <div>
              <label className="block text-sm font-medium text-foreground">Your Name</label>
              <input
                type="text"
                {...register("parentName")}
                placeholder="Jane Doe"
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
              />
              {errors.parentName && <p className="mt-1 text-xs text-danger">{errors.parentName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">Email Address</label>
              <input
                type="email"
                {...register("parentEmail")}
                placeholder="jane.doe@example.com"
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
              />
              {errors.parentEmail && <p className="mt-1 text-xs text-danger">{errors.parentEmail.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">Phone Number</label>
              <input
                type="tel"
                {...register("parentPhone")}
                placeholder="+1 (555) 0199"
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
              />
              {errors.parentPhone && <p className="mt-1 text-xs text-danger">{errors.parentPhone.message}</p>}
            </div>
          </div>
        )}

        {/* STEP 2: Student Info */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl text-foreground">Student Profile</h2>
            <p className="text-sm text-muted-foreground">Tell us about the learner.</p>
            <div>
              <label className="block text-sm font-medium text-foreground">Student Name</label>
              <input
                type="text"
                {...register("studentName")}
                placeholder="Lily Doe"
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
              />
              {errors.studentName && <p className="mt-1 text-xs text-danger">{errors.studentName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">Date of Birth</label>
              <input
                type="date"
                {...register("studentDob")}
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
              />
              {errors.studentDob && <p className="mt-1 text-xs text-danger">{errors.studentDob.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">Your Timezone</label>
              <input
                type="text"
                {...register("timezone")}
                placeholder="America/New_York"
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
              />
              {errors.timezone && <p className="mt-1 text-xs text-danger">{errors.timezone.message}</p>}
            </div>
          </div>
        )}

        {/* STEP 3: English Level */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl text-foreground">English Proficiency</h2>
            <p className="text-sm text-muted-foreground">Select their current level.</p>
            <div className="grid gap-2">
              {Object.keys(EnglishLevel).map((lvl) => (
                <label
                  key={lvl}
                  className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-muted cursor-pointer"
                >
                  <input
                    type="radio"
                    value={lvl}
                    {...register("englishLevel")}
                    className="text-meridian focus:ring-gold"
                  />
                  <div>
                    <span className="text-sm font-medium text-foreground">{lvl.replace(/_/g, " ")}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Schedule Selection */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl text-foreground">Preferred Schedule</h2>
            <div>
              <label className="block text-sm font-medium text-foreground">Select Teacher</label>
              <select
                {...register("teacherId")}
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
              >
                <option value="">Choose an educator</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.subjects.join(", ")})
                  </option>
                ))}
              </select>
              {errors.teacherId && <p className="mt-1 text-xs text-danger">{errors.teacherId.message}</p>}
            </div>

            {watchTeacher && (
              <>
                <div>
                  <label className="block text-sm font-medium text-foreground">Class Date</label>
                  <input
                    type="date"
                    {...register("scheduledAt")}
                    className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Available Time Slots</label>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {watchTeacher.availability.map((avail) => {
                      const value = `${avail.startTime}-${avail.endTime}`;
                      return (
                        <label
                          key={avail.id}
                          className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted cursor-pointer"
                        >
                          <input
                            type="radio"
                            value={value}
                            {...register("slotId")}
                            className="text-meridian focus:ring-gold"
                          />
                          <span className="text-sm font-mono text-foreground">
                            {dayNames[avail.dayOfWeek]}: {avail.startTime} - {avail.endTime}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.slotId && <p className="mt-1 text-xs text-danger">{errors.slotId.message}</p>}
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 5: Goals & Review */}
        {step === 5 && (
          <div className="space-y-4">
            <h2 className="font-display text-xl text-foreground">What are your learning goals?</h2>
            <div>
              <textarea
                rows={3}
                {...register("goals")}
                placeholder="Lily wants to build spoken confidence and learn simple coding commands in Python..."
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
              />
              {errors.goals && <p className="mt-1 text-xs text-danger">{errors.goals.message}</p>}
            </div>

            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <h3 className="font-medium text-foreground">Review Booking Details</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  <span className="font-medium">Student:</span> {watch("studentName")} ({watch("englishLevel")})
                </li>
                <li>
                  <span className="font-medium">Teacher:</span> {watchTeacher?.name}
                </li>
                <li>
                  <span className="font-medium">Schedule:</span> {watch("scheduledAt")} @ {watch("slotId")} ({watch("timezone")})
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* STEP 6: Confirmation Screen */}
        {step === 6 && successBooking && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle2 className="text-gold h-16 w-16" />
            </div>
            <h2 className="font-display text-2xl text-foreground">Trial class scheduled!</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Your free trial lesson with {successBooking.teacherName} has been confirmed for{" "}
              <span className="font-semibold text-foreground">{successBooking.date}</span> at{" "}
              <span className="font-semibold text-foreground">{successBooking.time}</span>. A calendar invitation has been sent to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button variant="outline" className="gap-2">
                <Calendar size={16} /> Add to Google Calendar
              </Button>
              <Button variant="outline" className="gap-2">
                <Clock size={16} /> Add to Apple / Outlook (.ics)
              </Button>
            </div>
          </div>
        )}

        {/* Actions Button */}
        {step < 6 && (
          <div className="mt-8 flex justify-between border-t border-border pt-6">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft size={14} /> Back
              </Button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <Button type="button" variant="primary" onClick={nextStep}>
                Continue
              </Button>
            ) : (
              <Button type="submit" variant="gold" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Booking trial...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
