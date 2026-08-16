import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, CalendarCheck, GraduationCap, Users } from "lucide-react";

import { AttendanceAreaChart, CoursePerformanceChart, EnrollmentChart, GradeDistributionChart, RiskPieChart } from "@/components/shared/charts";
import { PageHeader, SectionCard, StatCard } from "@/components/shared/primitives";
import { analyzeCohort } from "@/lib/ai";
import { attendanceTrend, enrollmentTrend, getCourses, getStudents, gradeDistribution } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Administrator Dashboard — EduIntelli" },
      { name: "description", content: "Institution-wide statistics, enrolment trend, attendance, grade distribution, course performance and academic risk distribution." },
      { property: "og:title", content: "Administrator Dashboard — EduIntelli" },
      { property: "og:description", content: "Institution-wide statistics, enrolment trend, attendance, grade distribution, course performance and academic risk distribution." },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const cohort = analyzeCohort(getStudents());
  const courses = getCourses();
  return (
    <>
      <PageHeader eyebrow="Administrator portal" title="Institutional overview" description="Academic operations and analytics across the institution." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Students" value="1,248" hint="Across 6 departments" icon={Users} />
        <StatCard label="Teachers" value="64" hint="Full-time faculty" icon={GraduationCap} tone="ai" />
        <StatCard label="Courses" value="38" hint="Active this semester" icon={BookOpen} tone="success" />
        <StatCard label="Classes" value="72" hint="Weekly scheduled sessions" icon={CalendarCheck} tone="warning" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Student enrollment" description="Total students and new admissions">
          <EnrollmentChart data={enrollmentTrend} />
        </SectionCard>
        <SectionCard title="Attendance trend" description="Institution-wide monthly attendance">
          <AttendanceAreaChart data={attendanceTrend} />
        </SectionCard>
        <SectionCard title="Grade distribution" description="Semester results">
          <GradeDistributionChart data={gradeDistribution} />
        </SectionCard>
        <SectionCard title="Academic risk distribution" description="AI-detected risk levels">
          <RiskPieChart data={[
            { name: "Low risk", value: getStudents().length - cohort.highRisk.length - cohort.moderateRisk.length },
            { name: "Moderate risk", value: cohort.moderateRisk.length },
            { name: "High risk", value: cohort.highRisk.length },
          ]} />
        </SectionCard>
      </div>
      <SectionCard title="Course performance" description="Average score per course">
        <CoursePerformanceChart data={courses.map((c) => ({ course: c.title, average: c.averageScore }))} height={380} />
      </SectionCard>
    </>
  );
}
