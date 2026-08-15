"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Send,
  RefreshCw,
  ShieldAlert,
  Sparkles,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Clock,
  Inbox,
  User,
  Mail,
  MessageSquare,
} from "lucide-react";

interface SupportRequest {
  _id: string;
  name: string;
  email: string;
  message: string;
  priority: "Low" | "Medium" | "High";
  category: "Billing" | "Technical" | "Sales" | "General";
  status: "New" | "In-Progress" | "Resolved";
  classificationSource: "AI" | "FALLBACK";
  createdAt: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"submit" | "admin">("submit");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    priority: "Low",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  // Admin Data State
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(false);
  const [filterPriority, setFilterPriority] = useState<string>("All");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

  // Fetch Requests for Admin View
  const fetchRequests = useCallback(async () => {
    setIsLoadingRequests(true);
    try {
      const res = await fetch(`${API_BASE}/requests`);
      const result = await res.json();
      if (result && result.success) {
        setRequests(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch requests", err);
    } finally {
      setIsLoadingRequests(false);
    }
  }, [API_BASE]);

  useEffect(() => {
    if (activeTab === "admin") {
      // Defer calling fetchRequests so it doesn't call setState synchronously
      // from within the effect body (avoids cascading renders warning).
      void Promise.resolve().then(fetchRequests);
    }
  }, [activeTab, fetchRequests]);

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitFeedback(null);

    try {
      const res = await fetch(`${API_BASE}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setSubmitFeedback({
          type: data.isDuplicate ? "info" : "success",
          message: data.message || "Request submitted successfully!",
        });
        if (!data.isDuplicate) {
          setFormData({ name: "", email: "", message: "", priority: "Low" });
        }
      } else {
        setSubmitFeedback({
          type: "error",
          message: data.message || "Failed to submit request.",
        });
      }
    } catch {
      setSubmitFeedback({
        type: "error",
        message: "Server unreachable. Ensure backend is running.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtered requests
  const filteredRequests = requests.filter((req) => {
    const matchPriority =
      filterPriority === "All" || req.priority === filterPriority;
    const matchCategory =
      filterCategory === "All" || req.category === filterCategory;
    return matchPriority && matchCategory;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                eQ
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                AI Support Request Router
              </h1>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Autonomous Ticket Classifier & Triage Pipeline
            </p>
          </div>

          {/* Navigation Toggle */}
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("submit")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === "submit"
                  ? "bg-emerald-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Send className="w-4 h-4" />
              Submit Ticket
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === "admin"
                  ? "bg-emerald-500 text-slate-950 font-semibold shadow-lg shadow-emerald-500/20"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Inbox className="w-4 h-4" />
              Admin Router View
            </button>
          </div>
        </header>

        {/* TAB 1: Submit Form */}
        {activeTab === "submit" && (
          <div className="max-w-xl mx-auto">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white">
                  Create Support Request
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Requests are automatically classified by AI into Technical,
                  Billing, Sales, or General.
                </p>
              </div>

              {submitFeedback && (
                <div
                  className={`p-4 rounded-xl mb-6 text-sm flex items-start gap-3 border ${
                    submitFeedback.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : submitFeedback.type === "info"
                        ? "bg-sky-500/10 border-sky-500/30 text-sky-300"
                        : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                  }`}
                >
                  {submitFeedback.type === "success" && (
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                  )}
                  {submitFeedback.type === "info" && (
                    <Clock className="w-5 h-5 shrink-0" />
                  )}
                  {submitFeedback.type === "error" && (
                    <AlertCircle className="w-5 h-5 shrink-0" />
                  )}
                  <span>{submitFeedback.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="flex text-xs font-medium text-slate-300 mb-1.5 items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Smith"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex text-xs font-medium text-slate-300 mb-1.5 items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> Email
                    Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Priority Level
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High (Immediate Triage)</option>
                  </select>
                </div>

                <div>
                  <label className="flex text-xs font-medium text-slate-300 mb-1.5 items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />{" "}
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your issue or inquiry in detail..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Processing
                      & Classifying...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit Request
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: Admin View */}
        {activeTab === "admin" && (
          <div className="space-y-4">
            {/* Filter & Action Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <label className="text-xs text-slate-400 mr-2">
                    Priority:
                  </label>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200"
                  >
                    <option value="All">All</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-400 mr-2">
                    Category:
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200"
                  >
                    <option value="All">All</option>
                    <option value="Technical">Technical</option>
                    <option value="Billing">Billing</option>
                    <option value="Sales">Sales</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <button
                onClick={fetchRequests}
                disabled={isLoadingRequests}
                className="flex items-center gap-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isLoadingRequests ? "animate-spin" : ""}`}
                />
                Refresh Tickets
              </button>
            </div>

            {/* Table of Requests */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/90 text-slate-400">
                      <th className="p-4">Customer</th>
                      <th className="p-4">Message</th>
                      <th className="p-4">Priority</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Source</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredRequests.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="p-8 text-center text-slate-500"
                        >
                          {isLoadingRequests
                            ? "Loading requests..."
                            : "No requests found."}
                        </td>
                      </tr>
                    ) : (
                      filteredRequests.map((req) => {
                        const isHighPriority = req.priority === "High";
                        return (
                          <tr
                            key={req._id}
                            className={`hover:bg-slate-800/30 transition-colors ${
                              isHighPriority ? "bg-rose-950/10" : ""
                            }`}
                          >
                            <td className="p-4 whitespace-nowrap">
                              <div className="font-medium text-slate-100">
                                {req.name}
                              </div>
                              <div className="text-xs text-slate-400">
                                {req.email}
                              </div>
                            </td>

                            <td className="p-4 max-w-xs">
                              <p className="line-clamp-2 text-slate-300">
                                {req.message}
                              </p>
                            </td>

                            <td className="p-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                  req.priority === "High"
                                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                                    : req.priority === "Medium"
                                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                      : "bg-slate-800 text-slate-300"
                                }`}
                              >
                                {req.priority === "High" && (
                                  <ShieldAlert className="w-3 h-3" />
                                )}
                                {req.priority}
                              </span>
                            </td>

                            <td className="p-4 whitespace-nowrap">
                              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800/80 border border-slate-700 text-slate-200">
                                {req.category}
                              </span>
                            </td>

                            <td className="p-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                                  req.classificationSource === "AI"
                                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                    : "bg-slate-800 text-slate-400 border border-slate-700"
                                }`}
                              >
                                {req.classificationSource === "AI" ? (
                                  <Sparkles className="w-3 h-3 text-purple-400" />
                                ) : (
                                  <Cpu className="w-3 h-3 text-slate-400" />
                                )}
                                {req.classificationSource}
                              </span>
                            </td>

                            <td className="p-4 whitespace-nowrap">
                              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                {req.status}
                              </span>
                            </td>

                            <td className="p-4 whitespace-nowrap text-xs text-slate-400">
                              {new Date(req.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                month: "short",
                                day: "numeric",
                              })}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
