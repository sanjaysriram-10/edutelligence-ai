import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, ClipboardList, GraduationCap, Target } from "lucide-react";

import { AIInsightCard } from "@/components/shared/AIInsightCard";
import { PerformanceChart, SubjectBarChart } from "@/components/shared/charts";
import { PageHeader, SectionCard, StatCard } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { analyzeStudent } from "@/lib/ai";
import { getDemoStudent, studentAssignments } from "@/lib/mock-data";

export const Route = createFileRoute("/student/")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — EduIntelli" },
      { name: "description", content: "Attendance, average score, assignments and AI academic intelligence for the logged-in student." },
      { property: "og:title", content: "Student Dashboard — EduIntelli" },
      { property: "og:description", content: "Personal academic overview with AI performance analysis." },
    ],
  }),
  component: StudentDashboard,
});

function StudentDashboard() {
  const student = getDemoStudent();
  const insight = analyzeStudent(student);
  const submitted = studentAssignments.filter((a) => a.status !== "Pending").length;
  const weakest = [...student.subjects].sort((a, b) => a.score - b.score)[0];

  return (
    <>
      <PageHeader
        eyebrow="Student portal"
        title={`Welcome back, ${student.name.split(" ")[0]}`}
        description="Here's your academic overview."
        actions={
          <Button asChild>
            <Link to="/student/ai-insights">Open AI Insights</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Attendance" value={`${student.attendance}%`} hint="Minimum required: 75%" icon={CalendarCheck} progress={student.attendance} />
        <StatCard label="Average Score" value={`${student.averageScore}%`} hint="Across all subjects" icon={Target} tone="ai" progress={student.averageScore} />
        <StatCard label="Assignments" value={`${submitted} / ${studentAssignments.length}`} hint="Submitted or evaluated" icon={ClipboardList} tone="warning" progress={(submitted / studentAssignments.length) * 100} />
        <StatCard label="Overall Grade" value="A-" hint="GPA 8.2 / 10" icon={GraduationCap} tone="success" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Performance trend" description="Monthly attendance, assignment and examination performance">
          <PerformanceChart data={student.history} />
        </SectionCard>
        <SectionCard
          title="Subject performance"
          description={`AI detected ${weakest?.subject} as the weakest subject (${weakest?.score}%)`}
        >
          <SubjectBarChart data={student.subjects.map((s) => ({ subject: s.subject, score: s.score }))} />
        </SectionCard>
      </div>

      <AIInsightCard student={student} insight={insight} />
    </>
  );
}
