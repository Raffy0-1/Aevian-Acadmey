"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { updateBookingStatus } from "@/lib/actions/bookings";
import { BookingStatus } from "@prisma/client";
import {
  Users,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  FilePlus,
  TrendingUp,
  Plus,
  Trash,
  Loader2,
} from "lucide-react";

interface Booking {
  id: string;
  scheduledAt: string;
  status: BookingStatus;
  type: string;
  durationMinutes: number;
  student: {
    id: string;
    user: { name: string; email: string };
  };
  course: { title: string } | null;
}

interface Availability {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

interface TeacherDashboardClientProps {
  teacherProfileId: string;
  initialBookings: Booking[];
  initialAvailability: Availability[];
}

export function TeacherDashboardClient({
  teacherProfileId,
  initialBookings,
  initialAvailability,
}: TeacherDashboardClientProps) {
  const [activeTab, setActiveTab] = useState("classes");
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [availability, setAvailability] = useState<Availability[]>(initialAvailability);

  // Homework Creator State
  const [hwTitle, setHwTitle] = useState("");
  const [hwInstructions, setHwInstructions] = useState("");
  const [creatingHw, setCreatingHw] = useState(false);
  const [hwMsg, setHwMsg] = useState<string | null>(null);

  // Availability Form State
  const [newDay, setNewDay] = useState(1); // Monday
  const [newStart, setNewStart] = useState("09:00");
  const [newEnd, setNewEnd] = useState("12:00");

  // Attendance/Status update
  const handleMarkStatus = async (bookingId: string, status: BookingStatus) => {
    try {
      await updateBookingStatus({
        bookingId,
        status,
        teacherNotes: "Marked by teacher during live class checkout.",
      });

      // Update state
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
      );
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  // Add Availability Slot Handler
  const handleAddAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlot: Availability = {
      id: Math.random().toString(),
      dayOfWeek: newDay,
      startTime: newStart,
      endTime: newEnd,
    };
    setAvailability((prev) => [...prev, newSlot].sort((a, b) => a.dayOfWeek - b.dayOfWeek));
  };

  // Remove Availability Slot Handler
  const handleRemoveAvailability = (id: string) => {
    setAvailability((prev) => prev.filter((a) => a.id !== id));
  };

  // Add Homework Handler
  const handleCreateHomework = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwTitle.trim() || !hwInstructions.trim()) return;
    setCreatingHw(true);
    setHwMsg(null);
    try {
      // Mock homework create call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHwMsg(`Assignment "${hwTitle}" posted to student streams successfully!`);
      setHwTitle("");
      setHwInstructions("");
    } catch (err) {
      setHwMsg("Failed to create assignment.");
    } finally {
      setCreatingHw(false);
    }
  };

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="space-y-8">
      {/* Navigation Tab Bar */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-px font-mono text-xs uppercase tracking-wider">
        {["classes", "homework", "availability"].map((tab) => (
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

      {/* TODAY'S CLASSES & CHECKIN */}
      {activeTab === "classes" && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          <h2 className="font-display text-lg text-foreground flex items-center gap-2">
            <Users className="text-gold" size={20} /> Student Roster & Live Sessions
          </h2>
          <p className="text-sm text-muted-foreground">
            Mark attendance, verify bookings, and update parent checklists.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border font-mono text-xs uppercase text-muted-foreground">
                  <th className="py-2">Student</th>
                  <th className="py-2">Scheduled At</th>
                  <th className="py-2">Class Type</th>
                  <th className="py-2">Status</th>
                  <th className="py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-muted/30">
                    <td className="py-3">
                      <p className="font-medium text-foreground">{b.student.user.name}</p>
                      <p className="text-xs text-muted-foreground">{b.student.user.email}</p>
                    </td>
                    <td className="py-3 font-mono text-xs">
                      {new Date(b.scheduledAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3">
                      <Badge>{b.type}</Badge>
                    </td>
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
                    <td className="py-3 text-right space-x-1">
                      {b.status === BookingStatus.PENDING || b.status === BookingStatus.CONFIRMED ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs text-success hover:bg-success/5 border-success/30"
                            onClick={() => handleMarkStatus(b.id, BookingStatus.COMPLETED)}
                          >
                            Mark Attended
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs text-danger hover:bg-danger/5 border-danger/30"
                            onClick={() => handleMarkStatus(b.id, BookingStatus.NO_SHOW)}
                          >
                            No Show
                          </Button>
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground">Checkout complete</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE HOMEWORK ASSIGNMENT */}
      {activeTab === "homework" && (
        <div className="rounded-xl border border-border bg-card p-6 max-w-xl space-y-6">
          <div>
            <h2 className="font-display text-lg text-foreground flex items-center gap-2">
              <FilePlus className="text-gold" size={20} /> Issue Assignment
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Select standard prompts and target specific modules.
            </p>
          </div>

          <form onSubmit={handleCreateHomework} className="space-y-4">
            {hwMsg && (
              <div className="rounded-md bg-info/10 p-3 text-sm text-info border border-info/20 font-medium">
                {hwMsg}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground">Assignment Title</label>
              <input
                type="text"
                value={hwTitle}
                onChange={(e) => setHwTitle(e.target.value)}
                placeholder="Ex. Equation Balancing Basics"
                required
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground">Instructions & Prompts</label>
              <textarea
                rows={4}
                value={hwInstructions}
                onChange={(e) => setHwInstructions(e.target.value)}
                placeholder="List the problems and due dates..."
                required
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
              />
            </div>

            <Button type="submit" variant="primary" disabled={creatingHw}>
              {creatingHw ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Publishing...
                </>
              ) : (
                "Publish Assignment"
              )}
            </Button>
          </form>
        </div>
      )}

      {/* EDIT AVAILABILITY GRID */}
      {activeTab === "availability" && (
        <div className="grid gap-8 md:grid-cols-3">
          {/* Add Form */}
          <div className="md:col-span-1 rounded-xl border border-border bg-card p-6 space-y-4 h-fit">
            <h2 className="font-display text-lg text-foreground flex items-center gap-1.5">
              <Clock className="text-gold" size={20} /> Add Time Slot
            </h2>
            <form onSubmit={handleAddAvailability} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground">Day of Week</label>
                <select
                  value={newDay}
                  onChange={(e) => setNewDay(parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
                >
                  <option value={1}>Monday</option>
                  <option value={2}>Tuesday</option>
                  <option value={3}>Wednesday</option>
                  <option value={4}>Thursday</option>
                  <option value={5}>Friday</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">Start Time</label>
                <input
                  type="text"
                  value={newStart}
                  onChange={(e) => setNewStart(e.target.value)}
                  placeholder="09:00"
                  className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">End Time</label>
                <input
                  type="text"
                  value={newEnd}
                  onChange={(e) => setNewEnd(e.target.value)}
                  placeholder="12:00"
                  className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
                />
              </div>

              <Button type="submit" variant="gold" className="w-full gap-1.5">
                <Plus size={16} /> Add Slot
              </Button>
            </form>
          </div>

          {/* List display */}
          <div className="md:col-span-2 rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="font-display text-lg text-foreground">Weekly Slots</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {availability.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between rounded-lg border border-border bg-background p-4 text-sm"
                >
                  <div>
                    <p className="font-medium text-foreground">{dayNames[a.dayOfWeek]}</p>
                    <p className="font-mono text-xs text-muted-foreground mt-0.5">
                      {a.startTime} – {a.endTime}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-danger hover:text-danger/90"
                    onClick={() => handleRemoveAvailability(a.id)}
                  >
                    <Trash size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
