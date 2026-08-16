import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CalendarCheck, ClipboardList, Users } from "lucide-react";

import { AttendanceAreaChart, CoursePerformanceChart, GradeDistributionChart, PerformanceChart } from "@/components/shared/charts";
import { PageHeader, SectionCard, StatCard } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { analyzeCohort } from "@/lib/ai";
import { attendanceTrend, getCourses, getDemoStudent, getStudents, gradeDistribution } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/")({
  head: () => ({
    meta: [
      { title: "Teacher Dashboard — EduIntelli" },
      { name: "description", content: "Class strength, average attendance, pending assignments, at-risk students and performance analytics for faculty." },
      { property: "og:title", content: "Teacher Dashboard — EduIntelli" },
      { property: "og:description", content: "Class strength, average attendance, pending assignments, at-risk students and performance analytics for faculty." },
    ],
  }),
  component: TeacherDashboard,
});

function TeacherDashboard() {
  const cohort = analyzeCohort(getStudents());
  const courses = getCourses().slice(0, 6);

  return (
    <>
      <PageHeader
        eyebrow="Teacher portal"
        title="Class overview"
        description="Performance analytics across your assigned courses."
        actions={<Button asChild><Link to="/teacher/ai-insights">Class AI Insights</Link></Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Students" value={142} hint="Across 4 sections" icon={Users} />
        <StatCard label="Average Attendance" value="84%" hint="Semester to date" icon={CalendarCheck} tone="success" progress={84} />
        <StatCard label="Pending Assignments" value={23} hint="Awaiting evaluation" icon={ClipboardList} tone="warning" />
        <StatCard label="At-Risk Students" value={8} hint={`${cohort.highRisk.length} high risk detected in cohort`} icon={AlertTriangle} tone="danger" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Average class performance" description="Monthly attendance, assignments and examinations">
          <PerformanceChart data={getDemoStudent().history} />
        </SectionCard>
        <SectionCard title="Attendance trend" description="Institution-wide monthly attendance">
          <AttendanceAreaChart data={attendanceTrend} />
        </SectionCard>
        <SectionCard title="Grade distribution" description="Current semester results">
          <GradeDistributionChart data={gradeDistribution} />
        </SectionCard>
        <SectionCard title="Course performance" description="Average score per course">
          <CoursePerformanceChart data={courses.map((c) => ({ course: c.title, average: c.averageScore }))} />
        </SectionCard>
      </div>
    </>
  );
}
