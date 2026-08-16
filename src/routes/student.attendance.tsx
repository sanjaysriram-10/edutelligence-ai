import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle } from "lucide-react";

import { AttendanceAreaChart } from "@/components/shared/charts";
import { PageHeader, ProgressCard, SectionCard, StatCard } from "@/components/shared/primitives";
import { getDemoStudent } from "@/lib/mock-data";

export const Route = createFileRoute("/student/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance — EduIntelli Student" },
      { name: "description", content: "Overall and subject-wise attendance with low-attendance alerts and a monthly trend chart." },
      { property: "og:title", content: "Attendance — EduIntelli Student" },
      { property: "og:description", content: "Subject-wise attendance tracking with risk highlighting." },
    ],
  }),
  component: StudentAttendance,
});

function StudentAttendance() {
  const student = getDemoStudent();
  const low = student.subjects.filter((s) => s.attendance < 75);

  return (
    <>
      <PageHeader eyebrow="Student portal" title="Attendance" description="Subjects below 75% are highlighted as academic risk." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Overall attendance" value={`${student.attendance}%`} hint="Institutional minimum 75%" progress={student.attendance} />
        <StatCard label="Subjects at risk" value={low.length} hint={low.map((l) => l.subject).join(", ") || "None"} tone="danger" />
        <StatCard label="Classes attended" value="164 / 200" hint="Current semester" tone="success" />
      </div>

      {low.length ? (
        <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/8 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <p className="text-sm text-foreground">
            Attendance in <strong>{low.map((l) => l.subject).join(", ")}</strong> is below the 75% requirement. Continued shortfall can block examination eligibility.
          </p>
        </div>
      ) : null}

      <SectionCard title="Subject-wise attendance" description="Current semester">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {student.subjects.map((s) => (
            <ProgressCard key={s.subject} label={s.subject} value={s.attendance} warn={s.attendance < 75} caption={s.attendance < 75 ? "Below minimum requirement" : "Meets requirement"} />
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Attendance trend" description="Monthly attendance percentage">
        <AttendanceAreaChart data={student.history.map((h) => ({ month: h.month, attendance: h.attendance }))} />
      </SectionCard>
    </>
  );
}
