import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";

import { SubjectBarChart } from "@/components/shared/charts";
import { AIBadge, PageHeader, RecommendationCard, RiskBadge, SectionCard, StatCard } from "@/components/shared/primitives";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { analyzeCohort } from "@/lib/ai";
import { getStudents } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/ai-insights")({
  head: () => ({
    meta: [
      { title: "Class AI Intelligence — EduIntelli Teacher" },
      { name: "description", content: "AI-detected high and moderate risk students, weak subjects, attendance concerns and performance declines." },
      { property: "og:title", content: "Class AI Intelligence — EduIntelli Teacher" },
      { property: "og:description", content: "AI-detected high and moderate risk students, weak subjects, attendance concerns and performance declines." },
    ],
  }),
  component: TeacherAIInsights,
});

function TeacherAIInsights() {
  const cohort = analyzeCohort(getStudents());
  const recommendations = [
    `Consider organizing an additional ${cohort.weakestSubject} support session.`,
    `${cohort.highRisk.length} students currently show elevated academic risk and need one-to-one review.`,
    "Students with attendance below 70% show significantly lower assessment scores — schedule attendance counselling.",
    `${cohort.declining.length} students show declining performance across recent assessments.`,
    "Publish additional practice assignments for the lowest-scoring subject before the next internal.",
  ];

  return (
    <>
      <PageHeader eyebrow="AI academic intelligence" title="AI-Powered Class Intelligence" description="Cohort-level detection built on explainable academic analytics." actions={<AIBadge />} />

      <Card className="relative overflow-hidden border-ai/25">
        <div className="gradient-ai-subtle pointer-events-none absolute inset-0" aria-hidden />
        <CardContent className="relative p-6">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground"><Brain className="h-4 w-4 text-ai" /> Key insights</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>{cohort.highRisk.length} students currently show elevated academic risk.</li>
            <li>{cohort.weakestSubject} has the lowest average performance in this cohort.</li>
            <li>Students with attendance below 70% score on average 21 points lower in examinations.</li>
          </ul>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="High risk students" value={cohort.highRisk.length} tone="danger" />
        <StatCard label="Medium risk students" value={cohort.moderateRisk.length} tone="warning" />
        <StatCard label="Attendance concerns" value={cohort.attendanceRisk.length} hint="Below 75% attendance" />
        <StatCard label="Performance declines" value={cohort.declining.length} hint="Declining trend detected" tone="ai" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Weak subjects" description="Cohort averages, lowest first">
          <SubjectBarChart data={cohort.subjectAverages.map((s) => ({ subject: s.subject, score: s.average }))} />
        </SectionCard>
        <SectionCard title="AI recommendations" description="Suggested faculty interventions">
          <RecommendationCard items={recommendations} />
        </SectionCard>
      </div>

      <SectionCard title="Students needing intervention" description="Ranked by AI risk and score">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Attendance</TableHead><TableHead>Average</TableHead><TableHead>Weak subject</TableHead><TableHead>Risk</TableHead></TableRow></TableHeader>
            <TableBody>
              {[...cohort.highRisk, ...cohort.moderateRisk].map(({ student, insight }) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className={student.attendance < 75 ? "font-semibold text-destructive" : ""}>{student.attendance}%</TableCell>
                  <TableCell>{student.averageScore}%</TableCell>
                  <TableCell className="text-muted-foreground">{insight.weakSubjects.join(", ")}</TableCell>
                  <TableCell><RiskBadge level={insight.risk} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </>
  );
}
