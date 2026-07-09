"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateProfile, updateParentProfile } from "@/lib/actions/profiles";
import { updateBookingStatus } from "@/lib/actions/bookings";
import { BookingStatus } from "@prisma/client";
import {
  User,
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  MessageSquare,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

interface Child {
  id: string;
  user: { name: string; email: string };
  gradeLevel: string | null;
  englishLevel: string;
  enrollments: {
    id: string;
    progressPercent: number;
    status: string;
    course: { title: string };
  }[];
  bookings: {
    id: string;
    scheduledAt: string;
    status: BookingStatus;
    type: string;
    durationMinutes: number;
    teacherNotes: string | null;
    teacher: { user: { name: string } };
    course: { title: string } | null;
  }[];
}

interface ParentDashboardClientProps {
  parentUser: {
    id: string;
    name: string;
    email: string;
    parentProfile: { id: string; phone: string | null; country: string | null } | null;
  };
  childrenList: Child[];
}

export function ParentDashboardClient({
  parentUser,
  childrenList,
}: ParentDashboardClientProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [children, setChildren] = useState<Child[]>(childrenList);
  const [parentName, setParentName] = useState(parentUser.name);
  const [parentPhone, setParentPhone] = useState(parentUser.parentProfile?.phone || "");
  const [parentCountry, setParentCountry] = useState(parentUser.parentProfile?.country || "");
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<string | null>(null);

  // Profile Update Handler
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingProfile(true);
    setProfileMsg(null);
    try {
      const resBase = await updateProfile({
        userId: parentUser.id,
        name: parentName,
      });

      if (parentUser.parentProfile) {
        await updateParentProfile({
          parentProfileId: parentUser.parentProfile.id,
          phone: parentPhone,
          country: parentCountry,
        });
      }

      if (resBase.error) {
        setProfileMsg("Error: " + resBase.error);
      } else {
        setProfileMsg("Profile updated successfully!");
      }
    } catch (err) {
      setProfileMsg("Failed to update profile details.");
    } finally {
      setUpdatingProfile(false);
    }
  };

  // Cancel Booking Handler
  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this class slot?")) return;
    try {
      await updateBookingStatus({
        bookingId,
        status: BookingStatus.CANCELLED,
      });
      // Update local state
      setChildren((prev) =>
        prev.map((c) => ({
          ...c,
          bookings: c.bookings.map((b) =>
            b.id === bookingId ? { ...b, status: BookingStatus.CANCELLED } : b
          ),
        }))
      );
    } catch (err) {
      alert("Failed to cancel slot.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Navigation Tab Bar */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-px font-mono text-xs uppercase tracking-wider">
        {["overview", "attendance", "billing", "settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 border-b-2 font-medium transition-colors ${
              activeTab === tab
                ? "border-gold text-foreground font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            {children.map((child) => (
              <div key={child.id} className="rounded-xl border border-border bg-card p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-display text-xl text-foreground">{child.user.name}</h2>
                    <p className="mt-1 font-mono text-xs uppercase text-muted-foreground">
                      {child.gradeLevel || "Middle School"} · {child.englishLevel}
                    </p>
                  </div>
                  <Badge>Active Scholar</Badge>
                </div>

                {/* Progress Indicators */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <TrendingUp size={16} className="text-gold" /> Course Progress
                  </h3>
                  {child.enrollments.map((e) => (
                    <div key={e.id} className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{e.course.title}</span>
                        <span>{e.progressPercent}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-meridian transition-all duration-300"
                          style={{ width: `${e.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  {child.enrollments.length === 0 && (
                    <p className="text-xs text-muted-foreground">No active enrollments yet.</p>
                  )}
                </div>

                {/* Class Schedule */}
                <div className="space-y-3 border-t border-border pt-4">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <Calendar size={16} className="text-gold" /> Upcoming Classes
                  </h3>
                  <div className="space-y-2">
                    {child.bookings
                      .filter((b) => b.status === BookingStatus.CONFIRMED || b.status === BookingStatus.PENDING)
                      .slice(0, 3)
                      .map((b) => (
                        <div
                          key={b.id}
                          className="flex items-center justify-between rounded-lg bg-background p-3 text-xs border border-border"
                        >
                          <div>
                            <p className="font-medium text-foreground">
                              {b.type} Session with {b.teacher.user.name}
                            </p>
                            <p className="text-muted-foreground mt-0.5">
                              {new Date(b.scheduledAt).toLocaleString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                          {b.status === BookingStatus.CONFIRMED && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-danger hover:text-danger/90"
                              onClick={() => handleCancelBooking(b.id)}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      ))}
                    {child.bookings.filter(
                      (b) => b.status === BookingStatus.CONFIRMED || b.status === BookingStatus.PENDING
                    ).length === 0 && (
                      <p className="text-xs text-muted-foreground">No upcoming classes booked.</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ATTENDANCE & REPORT TAB */}
      {activeTab === "attendance" && (
        <div className="space-y-6">
          {children.map((child) => (
            <div key={child.id} className="rounded-xl border border-border bg-card p-6 space-y-4">
              <h2 className="font-display text-lg text-foreground">{child.user.name}&apos;s Class Ledger</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border font-mono text-xs uppercase text-muted-foreground">
                      <th className="py-2">Date</th>
                      <th className="py-2">Teacher</th>
                      <th className="py-2">Type</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">Teacher Reports</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {child.bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-muted/30">
                        <td className="py-3">
                          {new Date(b.scheduledAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 font-medium text-foreground">{b.teacher.user.name}</td>
                        <td className="py-3">{b.type}</td>
                        <td className="py-3">
                          <span className="inline-flex items-center gap-1">
                            {b.status === BookingStatus.COMPLETED ? (
                              <CheckCircle size={14} className="text-success" />
                            ) : b.status === BookingStatus.CANCELLED ? (
                              <XCircle size={14} className="text-danger" />
                            ) : (
                              <Clock size={14} className="text-warning" />
                            )}
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3 text-muted-foreground max-w-xs truncate">
                          {b.teacherNotes || "No notes submitted yet."}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BILLING TAB */}
      {activeTab === "billing" && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          <h2 className="font-display text-lg text-foreground flex items-center gap-2">
            <CreditCard className="text-gold" size={20} /> Invoices & Tuition Ledger
          </h2>
          <p className="text-sm text-muted-foreground">
            View past payments, download PDF statements, and update billing details.
          </p>

          <div className="space-y-3">
            {[
              { id: "INV-001", date: "July 1, 2026", amount: 29900, status: "Paid", course: "Algebra Foundations" },
              { id: "INV-002", date: "June 1, 2026", amount: 24900, status: "Paid", course: "Spoken English Fluency" },
            ].map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between rounded-lg border border-border p-4 text-sm"
              >
                <div>
                  <h3 className="font-semibold text-foreground">{inv.course}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {inv.id} · Issued {inv.date}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono font-medium">${(inv.amount / 100).toFixed(2)}</span>
                  <Badge className="bg-success/10 text-success border-success/20">{inv.status}</Badge>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <FileText size={14} /> PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === "settings" && (
        <div className="rounded-xl border border-border bg-card p-6 max-w-xl">
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <h2 className="font-display text-lg text-foreground flex items-center gap-2">
              <User className="text-gold" size={20} /> Parent Profile Settings
            </h2>

            {profileMsg && (
              <div className="rounded-md bg-info/10 p-3 text-sm text-info border border-info/20 font-medium">
                {profileMsg}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground">Your Name</label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                Phone Number
              </label>
              <input
                type="tel"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                placeholder="+1 (555) 0199"
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                Country
              </label>
              <input
                type="text"
                value={parentCountry}
                onChange={(e) => setParentCountry(e.target.value)}
                placeholder="United States"
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
              />
            </div>

            <Button type="submit" variant="primary" disabled={updatingProfile}>
              {updatingProfile ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
