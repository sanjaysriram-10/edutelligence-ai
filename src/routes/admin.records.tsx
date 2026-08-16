import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, RiskBadge, SectionCard } from "@/components/shared/primitives";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { analyzeStudent } from "@/lib/ai";
import { getStudents } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/records")({
  head: () => ({
    meta: [
      { title: "Academic Records — EduIntelli Admin" },
      { name: "description", content: "Consolidated academic records: attendance, assignment and examination performance with AI score and risk level." },
      { property: "og:title", content: "Academic Records — EduIntelli Admin" },
      { property: "og:description", content: "Consolidated academic records: attendance, assignment and examination performance with AI score and risk level." },
    ],
  }),
  component: AdminRecords,
});

function AdminRecords() {
  const rows = getStudents().map((s) => ({ student: s, insight: analyzeStudent(s) }));
  return (
    <>
      <PageHeader eyebrow="Administrator portal" title="Academic records" description="Consolidated performance record per student." />
      <SectionCard title="Records" description={`${rows.length} students`}>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Attendance</TableHead><TableHead>Assignments</TableHead><TableHead>Examinations</TableHead><TableHead>AI score</TableHead><TableHead>Status</TableHead><TableHead>Risk</TableHead></TableRow></TableHeader>
            <TableBody>
              {rows.map(({ student, insight }) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.rollNo} · {student.department}</p>
                  </TableCell>
                  <TableCell className={student.attendance < 75 ? "font-semibold text-destructive" : ""}>{student.attendance}%</TableCell>
                  <TableCell>{student.assignmentScore}%</TableCell>
                  <TableCell>{student.examScore}%</TableCell>
                  <TableCell className="font-semibold">{insight.score}</TableCell>
                  <TableCell className="text-muted-foreground">{insight.status}</TableCell>
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
