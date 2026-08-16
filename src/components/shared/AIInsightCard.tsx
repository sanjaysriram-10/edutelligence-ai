import { Brain, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RecommendationCard, RiskBadge, TrendPill } from "@/components/shared/primitives";
import type { AIInsight, Student } from "@/types";

export function AIInsightCard({
  student,
  insight,
  compact = false,
}: {
  student: Student;
  insight: AIInsight;
  compact?: boolean;
}) {
  const facts = [
    { label: "Performance Status", value: insight.status },
    { label: "Risk Level", value: insight.risk },
    { label: "Weak Subject", value: insight.weakSubjects.join(", ") || "None" },
    { label: "Attendance", value: `${student.attendance}%` },
    { label: "Average Score", value: `${student.averageScore}%` },
    { label: "AI Score", value: `${insight.score}/100` },
  ];

  return (
    <Card className="relative overflow-hidden border-ai/25">
      <div className="gradient-ai-subtle pointer-events-none absolute inset-0" aria-hidden />
      <CardContent className="relative p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="rounded-2xl bg-ai/15 p-2.5 text-ai">
              <Brain className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-semibold text-foreground">AI Academic Intelligence</h3>
              <p className="text-xs text-muted-foreground">
                Explainable analytics on attendance, assignments and examinations
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendPill trend={insight.trend} />
            <RiskBadge level={insight.risk} />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f.label} className="rounded-xl border border-border/70 bg-card/70 p-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {f.label}
              </p>
              <p className="mt-1 truncate text-sm font-semibold text-foreground">{f.value}</p>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sparkles className="h-4 w-4 text-ai" /> AI Analysis
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{insight.analysis}</p>
        </div>

        <div className="mt-6">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sparkles className="h-4 w-4 text-ai" /> Personalized Recommendations
          </p>
          <RecommendationCard
            items={compact ? insight.recommendations.slice(0, 3) : insight.recommendations}
          />
        </div>
      </CardContent>
    </Card>
  );
}
