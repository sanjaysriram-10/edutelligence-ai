import { createFileRoute } from "@tanstack/react-router";

import { CoursePerformanceChart, GradeDistributionChart, SubjectBarChart } from "@/components/shared/charts";
import { PageHeader, SectionCard, StatCard } from "@/components/shared/primitives";
import { analyzeCohort } from "@/lib/ai";
import { getCourses, getStudents, gradeDistribution } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/performance")({
  head: () => ({
    meta: [
      { title: "Performance Analytics — EduIntelli Teacher" },
      { name: "description", content: "Subject averages, course comparison and grade distribution across the taught cohort." },
      { property: "og:title", content: "Performance Analytics — EduIntelli Teacher" },
      { property: "og:description", content: "Subject averages, course comparison and grade distribution across the taught cohort." },
    ],
  }),
  component: TeacherPerformance,
});

function TeacherPerformance() {
  const cohort = analyzeCohort(getStudents());
  const courses = getCourses();
  return (
    <>
      <PageHeader eyebrow="Teacher portal" title="Performance analytics" description="Where the cohort is strong, and where it is not." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Cohort average" value={`${cohort.averageScore}%`} progress={cohort.averageScore} />
        <StatCard label="Average attendance" value={`${cohort.averageAttendance}%`} progress={cohort.averageAttendance} tone="success" />
        <StatCard label="Weakest subject" value={cohort.weakestSubject} hint="Lowest cohort average" tone="danger" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Subject averages" description="Across all monitored students">
          <SubjectBarChart data={cohort.subjectAverages.map((s) => ({ subject: s.subject, score: s.average }))} />
        </SectionCard>
        <SectionCard title="Course performance" description="Average score per course">
          <CoursePerformanceChart data={courses.map((c) => ({ course: c.title, average: c.averageScore }))} />
        </SectionCard>
      </div>
      <SectionCard title="Grade distribution" description="Institution-wide result spread">
        <GradeDistributionChart data={gradeDistribution} />
      </SectionCard>
    </>
  );
}
