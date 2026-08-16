import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SectionCard, StatCard } from "@/components/shared/primitives";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDemoStudent, grades } from "@/lib/mock-data";

export const Route = createFileRoute("/student/grades")({
  head: () => ({
    meta: [
      { title: "Grades — EduIntelli Student" },
      { name: "description", content: "Subject-wise assignment, internal and examination marks with final grades, GPA and weakest subject." },
      { property: "og:title", content: "Grades — EduIntelli Student" },
      { property: "og:description", content: "Consolidated academic grade sheet with GPA summary." },
    ],
  }),
  component: StudentGrades;
});

function StudentGrades() {
  const student = getDemoStudent();
  const sorted = [...student.subjects].sort((a, b) => b.score - a.score);
  const average = Math.round(sorted.reduce((a, s) => a + s.score, 0) / sorted.length);

  return (
    <>
      <PageHeader eyebrow="Student portal" title="Grades" description="Consolidated grade sheet for the current semester." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="GPA" value="8.2" hint="Out of 10" tone="success" />
        <StatCard label="Average" value={`${average}%`} hint="All subjects" progress={average} />
        <StatCard label="Highest subject" value={sorted[0]?.subject ?? "—"} hint={`${sorted[0]?.score}%`} tone="ai" />
        <StatCard label="Weakest subject" value={sorted[sorted.length - 1]?.subject ?? "—"} hint={`${sorted[sorted.length - 1]?.score}% — needs attention`} tone="danger" />
      </div>
      <SectionCard title="Grade sheet" description="Assignment (20) · Internal (50) · Examination (100)">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Internal</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead className="text-right">Final grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades.map((g) => (
                <TableRow key={g.subject}>
                  <TableCell className="font-medium">{g.subject}</TableCell>
                  <TableCell>{g.assignment} / 20</TableCell>
                  <TableCell>{g.internal} / 50</TableCell>
                  <TableCell>{g.exam} / 100</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={["D", "F"].includes(g.grade) ? "destructive" : "secondary"}>{g.grade}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </>
  );
}
