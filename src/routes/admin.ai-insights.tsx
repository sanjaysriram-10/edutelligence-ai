import { createFileRoute } from "@tanstack/react-router";
import { Brain } from "lucide-react";

import { RiskPieChart, SubjectBarChart } from "@/components/shared/charts";
import { AIBadge, PageHeader, RecommendationCard, RiskBadge, SectionCard, StatCard } from "@/components/shared/primitives";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { analyzeCohort } from "@/lib/ai";
import { getStudents } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/ai-insights")({
  head: () => ({
    meta: [
      { title: "Institutional AI Insights — EduIntelli Admin" },
      { name: "description", content: "Academic risk, attendance risk, performance declines, weakest course and AI recommendations for institution-wide intervention." },
      { property: "og:title", content: "Institutional AI Insights — EduIntelli Admin" },
      { property: "og:description", content: "Academic risk, attendance risk, performance declines, weakest course and AI recommendations for institution-wide intervention." },
    ],
  }),
  component: AdminAIInsights,
});

function AdminAIInsights() {
  const students = getStudents();
  const cohort = analyzeCohort(students);
  const scale = Math.round(1248 / students.length);

  const recommendations = [
    "Students with attendance below 70% should receive targeted intervention.",
    `${cohort.weakestSubject} requires additional academic support based on course-level performance.`,
    `${cohort.declining.length * scale} students show declining performance over recent assessments.`,
    "Introduce weekly remedial sessions for high-risk cohorts and track score movement each cycle.",
    "Publish attendance dashboards to department heads for weekly review.",
  ];

  return (
    <>
      <PageHeader eyebrow="AI academic intelligence" title="Institutional AI insights" description="Explainable, institution-wide academic intelligence." actions={<AIBadge />} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Academic risk" value={`${cohort.highRisk.length * scale} students`} tone="danger" />
        <StatCard label="Attendance risk" value={`${cohort.attendanceRisk.length * scale} students`} tone="warning" />
        <StatCard label="Performance decline" value={`${cohort.declining.length * scale} students`} tone="ai" />
        <StatCard label="Weakest course" value={cohort.weakestSubject} hint="Lowest institutional average" />
      </div>

      <Card className="relative overflow-hidden border-ai/25">
        <div className="gradient-ai-subtle pointer-events-none absolute inset-0" aria-hidden />
        <CardContent className="relative p-6">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground"><Brain className="h-4 w-4 text-ai" /> AI recommendations</p>
          <div className="mt-4"><RecommendationCard items={recommendations} /></div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Risk distribution" description="AI-detected academic risk levels">
          <RiskPieChart data={[
            { name: "Low risk", value: students.length - cohort.highRisk.length - cohort.moderateRisk.length },
            { name: "Moderate risk", value: cohort.moderateRisk.length },
            { name: "High risk", value: cohort.highRisk.length },
          ]} />
        </SectionCard>
        <SectionCard title="Subject performance" description="Institution averages, lowest first">
          <SubjectBarChart data={cohort.subjectAverages.map((s) => ({ subject: s.subject, score: s.average }))} />
        </SectionCard>
      </div>

      <SectionCard title="Priority intervention list" description="High and moderate risk learners">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Department</TableHead><TableHead>Attendance</TableHead><TableHead>AI score</TableHead><TableHead>Weak subjects</TableHead><TableHead>Risk</TableHead></TableRow></TableHeader>
            <TableBody>
              {[...cohort.highRisk, ...cohort.moderateRisk].map(({ student, insight }) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="text-muted-foreground">{student.department}</TableCell>
                  <TableCell className={student.attendance < 75 ? "font-semibold text-destructive" : ""}>{student.attendance}%</TableCell>
                  <TableCell>{insight.score}</TableCell>
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
