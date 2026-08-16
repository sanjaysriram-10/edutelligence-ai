import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SectionCard } from "@/components/shared/primitives";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { studentAssignments } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/assignments")({
  head: () => ({
    meta: [
      { title: "Assignment Oversight — EduIntelli Admin" },
      { name: "description", content: "Institution-wide assignment list with due dates, maximum marks and submission rates." },
      { property: "og:title", content: "Assignment Oversight — EduIntelli Admin" },
      { property: "og:description", content: "Institution-wide assignment list with due dates, maximum marks and submission rates." },
    ],
  }),
  component: AdminAssignments,
});

function AdminAssignments() {
  return (
    <>
      <PageHeader eyebrow="Administrator portal" title="Assignments" description="Submission compliance across all courses." />
      <SectionCard title="All assignments" description={`${studentAssignments.length} published tasks`}>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Assignment</TableHead><TableHead>Course</TableHead><TableHead>Due</TableHead><TableHead>Max marks</TableHead><TableHead>Submission rate</TableHead></TableRow></TableHeader>
            <TableBody>
              {studentAssignments.map((a) => {
                const rate = Math.round((a.submissions / a.total) * 100);
                return (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium">{a.title}</TableCell>
                    <TableCell className="text-muted-foreground">{a.course}</TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">{a.dueDate}</TableCell>
                    <TableCell>{a.maxMarks}</TableCell>
                    <TableCell className="min-w-40">
                      <div className="flex items-center gap-3">
                        <Progress value={rate} className="h-2 flex-1" />
                        <span className="text-xs text-muted-foreground">{rate}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </>
  );
}
