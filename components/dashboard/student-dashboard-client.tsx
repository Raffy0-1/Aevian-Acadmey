"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { submitHomework } from "@/lib/actions/homework";
import { updateProgress } from "@/lib/actions/enrollments";
import {
  BookOpen,
  Video,
  FileText,
  CheckSquare,
  Award,
  Trophy,
  Play,
  Download,
  Loader2,
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  order: number;
  videoUrl: string | null;
  durationMinutes: number;
}

interface Module {
  id: string;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface Enrollment {
  id: string;
  progressPercent: number;
  status: string;
  course: {
    id: string;
    title: string;
    description: string;
    modules: Module[];
  };
}

interface StudentDashboardClientProps {
  studentProfileId: string;
  initialEnrollments: Enrollment[];
}

export function StudentDashboardClient({
  studentProfileId,
  initialEnrollments,
}: StudentDashboardClientProps) {
  const [activeTab, setActiveTab] = useState("courses");
  const [enrollments, setEnrollments] = useState<Enrollment[]>(initialEnrollments);
  
  // Selected course / module / lesson for the Player Tab
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(
    initialEnrollments[0] || null
  );
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(
    initialEnrollments[0]?.course.modules[0]?.lessons[0] || null
  );

  // Homework Form State
  const [homeworkText, setHomeworkText] = useState("");
  const [submittingHw, setSubmittingHw] = useState(false);
  const [hwStatus, setHwStatus] = useState<string | null>(null);

  // Quiz State
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  // Mock quiz questions
  const quizQuestions = [
    {
      id: 1,
      question: "What is the result of multiplying a variable x by itself?",
      options: ["2x", "x²", "x + x", "x/2"],
      correct: 1,
    },
    {
      id: 2,
      question: "If 2y + 5 = 11, then what is y?",
      options: ["2", "3", "4", "6"],
      correct: 1,
    },
  ];

  // Mark Lesson Complete Handler
  const handleMarkComplete = async () => {
    if (!selectedEnrollment) return;
    const currentProgress = selectedEnrollment.progressPercent;
    const newProgress = Math.min(currentProgress + 10, 100);

    try {
      await updateProgress({
        enrollmentId: selectedEnrollment.id,
        progressPercent: newProgress,
      });

      // Update state
      setEnrollments((prev) =>
        prev.map((e) =>
          e.id === selectedEnrollment.id
            ? { ...e, progressPercent: newProgress, status: newProgress === 100 ? "COMPLETED" : e.status }
            : e
        )
      );
      setSelectedEnrollment((prev) =>
        prev ? { ...prev, progressPercent: newProgress, status: newProgress === 100 ? "COMPLETED" : prev.status } : null
      );
      alert("Lesson marked complete! Progress updated.");
    } catch (err) {
      alert("Failed to update progress.");
    }
  };

  // Submit Homework Handler
  const handleHomeworkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeworkText.trim()) return;
    setSubmittingHw(true);
    setHwStatus(null);
    try {
      // Mock homework ID matching the course
      const hwId = "mock-homework-id-123";
      await submitHomework({
        homeworkId: hwId,
        studentId: studentProfileId,
        text: homeworkText,
      });
      setHwStatus("Homework submitted successfully! Ms. Farooq will review it soon.");
      setHomeworkText("");
    } catch (err) {
      setHwStatus("Failed to submit assignment.");
    } finally {
      setSubmittingHw(false);
    }
  };

  // Handle Quiz selection
  const handleAnswerSelect = (qIdx: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 1;
      }
    });
    setQuizScore(score);
  };

  return (
    <div className="space-y-8">
      {/* Navigation Tab Bar */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-px font-mono text-xs uppercase tracking-wider">
        {["courses", "player", "quizzes", "homework", "achievements"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              // Auto select if player tab clicked
              if (tab === "player" && !selectedEnrollment && enrollments[0]) {
                setSelectedEnrollment(enrollments[0]);
                setSelectedLesson(enrollments[0].course.modules[0]?.lessons[0] || null);
              }
            }}
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

      {/* MY COURSES TAB */}
      {activeTab === "courses" && (
        <div className="grid gap-6 sm:grid-cols-2">
          {enrollments.map((e) => (
            <div key={e.id} className="rounded-xl border border-border bg-card p-6 flex flex-col justify-between space-y-6">
              <div>
                <Badge>{e.status}</Badge>
                <h3 className="mt-4 font-display text-xl text-foreground">{e.course.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {e.course.description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{e.progressPercent}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-meridian transition-all"
                      style={{ width: `${e.progressPercent}%` }}
                    />
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => {
                    setSelectedEnrollment(e);
                    setSelectedLesson(e.course.modules[0]?.lessons[0] || null);
                    setActiveTab("player");
                  }}
                >
                  <Play size={15} /> Resume Course
                </Button>
              </div>
            </div>
          ))}
          {enrollments.length === 0 && (
            <p className="text-sm text-muted-foreground">No active course enrollments.</p>
          )}
        </div>
      )}

      {/* LESSON PLAYER TAB */}
      {activeTab === "player" && selectedEnrollment && (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main player side (Left 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video widget container */}
            <div className="aspect-video relative rounded-lg bg-black border border-border flex flex-col items-center justify-center text-chalk p-8 text-center space-y-4 overflow-hidden">
              <Video className="text-gold/60 h-16 w-16" />
              <div>
                <h3 className="font-display text-lg">
                  {selectedLesson ? selectedLesson.title : "Select a lesson to begin"}
                </h3>
                <p className="text-xs text-chalk/60 mt-1">
                  {selectedLesson ? `${selectedLesson.durationMinutes} minutes lesson duration` : ""}
                </p>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/60 backdrop-blur px-4 py-2 rounded text-xs">
                <span>Live recording simulation</span>
                <span className="text-gold">HD Player</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <h2 className="font-display text-xl text-foreground">
                {selectedLesson?.title}
              </h2>
              <Button variant="primary" className="gap-1.5" onClick={handleMarkComplete}>
                <CheckSquare size={16} /> Mark Lesson Complete
              </Button>
            </div>
          </div>

          {/* Syllabus sidebar (Right 1 column) */}
          <div className="lg:col-span-1 rounded-xl border border-border bg-card p-6 space-y-4">
            <h3 className="font-display text-lg text-foreground">Syllabus Outline</h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {selectedEnrollment.course.modules.map((mod) => (
                <div key={mod.id} className="space-y-1">
                  <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    Module {mod.order}: {mod.title}
                  </p>
                  <div className="space-y-1">
                    {mod.lessons.map((les) => (
                      <button
                        key={les.id}
                        onClick={() => setSelectedLesson(les)}
                        className={`w-full text-left p-2 text-xs rounded transition-colors ${
                          selectedLesson?.id === les.id
                            ? "bg-meridian/10 text-meridian font-semibold"
                            : "hover:bg-muted text-muted-foreground"
                        }`}
                      >
                        {les.order}. {les.title} ({les.durationMinutes}m)
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* QUIZZES TAB */}
      {activeTab === "quizzes" && (
        <div className="rounded-xl border border-border bg-card p-8 max-w-xl space-y-6">
          <div>
            <h2 className="font-display text-2xl text-foreground">Variables & Expressions Quiz</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Complete the assessment to verify your conceptual understanding.
            </p>
          </div>

          {quizScore === null ? (
            <form onSubmit={handleQuizSubmit} className="space-y-6">
              {quizQuestions.map((q, idx) => (
                <div key={q.id} className="space-y-3">
                  <h3 className="text-sm font-medium text-foreground">
                    Question {q.id}: {q.question}
                  </h3>
                  <div className="grid gap-2">
                    {q.options.map((opt, optIdx) => (
                      <label
                        key={optIdx}
                        className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted cursor-pointer text-xs"
                      >
                        <input
                          type="radio"
                          name={`q-${idx}`}
                          checked={selectedAnswers[idx] === optIdx}
                          onChange={() => handleAnswerSelect(idx, optIdx)}
                          className="text-meridian focus:ring-gold"
                        />
                        <span className="text-foreground">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <Button type="submit" variant="primary">
                Submit Answers
              </Button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <Award className="h-16 w-16 text-gold mx-auto" />
              <div>
                <h3 className="font-display text-xl text-foreground">Quiz Completed!</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your Score: <span className="font-semibold text-foreground">{quizScore}</span> / {quizQuestions.length}
                </p>
              </div>
              <Button variant="outline" onClick={() => { setQuizScore(null); setSelectedAnswers({}); }}>
                Retry Quiz
              </Button>
            </div>
          )}
        </div>
      )}

      {/* HOMEWORK TAB */}
      {activeTab === "homework" && (
        <div className="rounded-xl border border-border bg-card p-8 max-w-xl space-y-6">
          <div>
            <h2 className="font-display text-2xl text-foreground">Active Homework Assignment</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Introductory Assignment: Complete the exercises on linear variables and expressions.
            </p>
          </div>

          <form onSubmit={handleHomeworkSubmit} className="space-y-4">
            {hwStatus && (
              <div className="rounded-md bg-info/10 p-3 text-sm text-info border border-info/20">
                {hwStatus}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground">Write your response or working</label>
              <textarea
                rows={5}
                value={homeworkText}
                onChange={(e) => setHomeworkText(e.target.value)}
                placeholder="Ex. 1) x = 3. Given equation 2x + 4 = 10..."
                required
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:ring-2 focus:ring-gold"
              />
            </div>

            <div className="rounded border border-border p-4 bg-background flex items-center justify-between text-xs text-muted-foreground">
              <span>PDF / File Attachment (Mocked)</span>
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" type="button">
                <Download size={12} /> Upload File
              </Button>
            </div>

            <Button type="submit" variant="primary" disabled={submittingHw}>
              {submittingHw ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Homework"
              )}
            </Button>
          </form>
        </div>
      )}

      {/* ACHIEVEMENTS TAB */}
      {activeTab === "achievements" && (
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="font-display text-lg text-foreground flex items-center gap-2">
              <Trophy className="text-gold" size={20} /> My Badges & Achievements
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: "First Ascent", desc: "Completed your first live trial class slot.", date: "July 2026" },
                { title: "Code Breaker", desc: "Scored 100% on a Python control flow quiz.", date: "July 2026" },
                { title: "Strict Scholar", desc: "Submitted 3 homework assignments consecutively.", date: "Mocked" },
              ].map((badge, idx) => (
                <div key={idx} className="rounded-lg border border-border bg-background p-4 text-center space-y-2">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">
                    ★
                  </div>
                  <h3 className="font-medium text-foreground text-sm">{badge.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
