"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Briefcase,
  Layers,
  Search,
  CheckCircle,
  Clock,
  Sparkles,
  ChevronRight,
  TrendingDown,
  Percent,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  source: string;
  status: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface AdminDashboardClientProps {
  stats: { label: string; value: number }[];
  initialLeads: Lead[];
  initialUsers: User[];
}

export function AdminDashboardClient({
  stats,
  initialLeads,
  initialUsers,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState("analytics");
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");

  // CRM status change handler
  const handleUpdateLeadStatus = (leadId: string, status: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status } : l))
    );
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Navigation Tab Bar */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-px font-mono text-xs uppercase tracking-wider">
        {["analytics", "crm", "users", "discounts"].map((tab) => (
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

      {/* ANALYTICS TAB */}
      {activeTab === "analytics" && (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-6">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-display text-3xl text-foreground font-medium">
                    {s.value.toLocaleString()}
                  </span>
                  <span className="text-xs text-success font-medium flex items-center gap-0.5">
                    <TrendingUp size={12} /> +12.4%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pure CSS Performance Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Revenue Curves */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <h3 className="font-display text-lg text-foreground">Monthly Enrollment Revenue</h3>
              <div className="flex items-end gap-2 h-48 pt-6">
                {[
                  { month: "Jan", val: "30%" },
                  { month: "Feb", val: "45%" },
                  { month: "Mar", val: "40%" },
                  { month: "Apr", val: "65%" },
                  { month: "May", val: "85%" },
                  { month: "Jun", val: "95%" },
                ].map((bar, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div
                      className="w-full bg-meridian rounded-t transition-all duration-500 hover:opacity-90 cursor-pointer"
                      style={{ height: bar.val }}
                    />
                    <span className="font-mono text-[10px] text-muted-foreground">{bar.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Curves */}
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <h3 className="font-display text-lg text-foreground">New Registrations Growth</h3>
              <div className="flex items-end gap-2 h-48 pt-6">
                {[
                  { month: "Jan", val: "20%" },
                  { month: "Feb", val: "35%" },
                  { month: "Mar", val: "50%" },
                  { month: "Apr", val: "45%" },
                  { month: "May", val: "70%" },
                  { month: "Jun", val: "88%" },
                ].map((bar, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div
                      className="w-full bg-gold rounded-t transition-all duration-500 hover:opacity-90 cursor-pointer"
                      style={{ height: bar.val }}
                    />
                    <span className="font-mono text-[10px] text-muted-foreground">{bar.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CRM LEADS BOARD */}
      {activeTab === "crm" && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          <h2 className="font-display text-lg text-foreground flex items-center gap-2">
            <Briefcase className="text-gold" size={20} /> Lead Pipeline & CRM Board
          </h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            {["NEW", "CONTACTED", "QUALIFIED"].map((stage) => (
              <div key={stage} className="rounded-lg border border-border bg-background p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <h3 className="text-xs font-mono font-medium text-foreground">{stage}</h3>
                  <Badge>{leads.filter((l) => l.status === stage).length}</Badge>
                </div>
                <div className="space-y-2">
                  {leads
                    .filter((l) => l.status === stage)
                    .map((lead) => (
                      <div
                        key={lead.id}
                        className="rounded-lg border border-border bg-card p-3 text-xs space-y-2"
                      >
                        <div>
                          <p className="font-medium text-foreground">{lead.name}</p>
                          <p className="text-muted-foreground">{lead.email}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-[10px] text-muted-foreground">
                            {lead.source}
                          </span>
                          {stage === "NEW" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-1.5 text-[10px] gap-0.5"
                              onClick={() => handleUpdateLeadStatus(lead.id, "CONTACTED")}
                            >
                              Contact <ChevronRight size={10} />
                            </Button>
                          )}
                          {stage === "CONTACTED" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-1.5 text-[10px] gap-0.5"
                              onClick={() => handleUpdateLeadStatus(lead.id, "QUALIFIED")}
                            >
                              Qualify <ChevronRight size={10} />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* USER LISTS */}
      {activeTab === "users" && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="font-display text-lg text-foreground flex items-center gap-2">
              <Users className="text-gold" size={20} /> User Accounts Directory
            </h2>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-4 text-xs text-foreground focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border font-mono text-xs uppercase text-muted-foreground">
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/30">
                    <td className="py-3 font-medium text-foreground">{u.name}</td>
                    <td className="py-3">{u.email}</td>
                    <td className="py-3">
                      <Badge>{u.role}</Badge>
                    </td>
                    <td className="py-3 font-mono text-xs">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DISCOUNT CODES */}
      {activeTab === "discounts" && (
        <div className="rounded-xl border border-border bg-card p-6 space-y-6">
          <h2 className="font-display text-lg text-foreground flex items-center gap-2">
            <Percent className="text-gold" size={20} /> Tuition Discounts & Coupons
          </h2>

          <div className="space-y-3">
            {[
              { code: "AEVIAN50", discount: "50% off", type: "First month tuition", status: "Active" },
              { code: "PYTHONSTART", discount: "$25 off", type: "Intro Coding modules", status: "Active" },
            ].map((d) => (
              <div
                key={d.code}
                className="flex items-center justify-between rounded-lg border border-border p-4 text-sm"
              >
                <div>
                  <h3 className="font-semibold text-foreground">{d.code}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {d.discount} · {d.type}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-success/10 text-success border-success/20">{d.status}</Badge>
                  <Button variant="ghost" size="sm" className="h-8">
                    Deactivate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
