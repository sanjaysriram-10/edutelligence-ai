import { createFileRoute } from "@tanstack/react-router";
import { Brain, CalendarClock } from "lucide-react";

import { PerformanceChart, SubjectBarChart } from "@/components/shared/charts";
import { AIBadge, PageHeader, ProgressCard, RecommendationCard, RiskBadge, SectionCard, StatCard, TrendPill } from "@/components/shared/primitives";
import { Card, CardContent } from "@/components/ui/card";
import { analyzeStudent, generateStudyPlan } from "@/lib/ai";
import { getDemoStudent } from "@/lib/mock-data";

export const Route = createFileRoute("/student/ai-insights")({
  head: () => ({
    meta: [
      { title: "AI Insights — EduIntelli Student" },
      { name: "description", content: "AI performance score, academic risk, weak subjects, trends, attendance analysis, recommendations and a weekly study plan." },
      { property: "og:title", content: "AI Insights — EduIntelli Student" },
      { property: "og:description", content: "Explainable academic intelligence and a personalized weekly study plan." },
    ],
  }),
  component: StudentAIInsights,
});

function StudentAIInsights() {
  const student = getDemoStudent();
  const insight = analyzeStudent(student);
  const plan = generateStudyPlan(student);

  return (
    <>
      <PageHeader eyebrow="AI academic intelligence" title="AI Insights" description="Generated from attendance, assignments, examinations and historical trends." actions={<AIBadge />} />

      <Card className="relative overflow-hidden border-ai/25">
        <div className="gradient-ai-subtle pointer-events-none absolute inset-0" aria-hidden />
        <CardContent className="relative grid gap-6 p-6 lg:grid-cols-[220px_1fr]">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-ai/30 bg-card/70 p-6">
            <span className="rounded-2xl bg-ai/15 p-3 text-ai"><Brain className="h-6 w-6" /></span>
            <p className="mt-4 text-5xl font-semibold text-foreground">{insight.score}</p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">AI performance score</p>
            <p className="mt-3 text-sm font-semibold text-foreground">{insight.status}</p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <RiskBadge level={insight.risk} />
              <TrendPill trend={insight.trend} />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{insight.analysis}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard label="Attendance" value={`${student.attendance}%`} progress={student.attendance} />
              <StatCard label="Assignments" value={`${student.assignmentScore}%`} progress={student.assignmentScore} tone="warning" />
              <StatCard label="Examinations" value={`${student.examScore}%`} progress={student.examScore} tone="ai" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Weak subject detection" description="Subjects scoring below the 50% risk threshold are flagged first">
          <SubjectBarChart data={student.subjects.map((s) => ({ subject: s.subject, score: s.score }))} />
          <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/8 p-3 text-sm text-foreground">
            Detected weak subject{insight.weakSubjects.length > 1 ? "s" : ""}: <strong>{insight.weakSubjects.join(", ")}</strong>
          </p>
        </SectionCard>
        <SectionCard title="Performance trends" description="Recent assessments compared against the previous cycle">
          <PerformanceChart data={student.history} />
        </SectionCard>
      </div>

      <SectionCard title="Attendance analysis" description="Subject-level attendance risk">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {student.subjects.map((s) => (
            <ProgressCard key={s.subject} label={s.subject} value={s.attendance} warn={s.attendance < 75} caption={s.attendance < 75 ? "Attendance risk detected" : "Within safe range"} />
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Personalized recommendations" description="Derived from detected academic conditions">
          <RecommendationCard items={insight.recommendations} />
        </SectionCard>
        <SectionCard title="AI weekly study plan" description="Time allocated by subject weakness">
          <div className="space-y-2.5">
            {plan.map((p) => (
              <div key={p.day} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <span className="rounded-lg bg-primary/10 p-2 text-primary"><CalendarClock className="h-4 w-4" /></span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{p.day} · {p.focus}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.reason}</p>
                </div>
                <span className="whitespace-nowrap text-sm font-semibold text-foreground">{p.minutes} min</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
