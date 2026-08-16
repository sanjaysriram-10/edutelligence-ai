import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { EmptyState, PageHeader, SectionCard, StatusBadge } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { studentAssignments } from "@/lib/mock-data";
import type { Assignment } from "@/types";

export const Route = createFileRoute("/student/assignments")({
  head: () => ({
    meta: [
      { title: "Assignments — EduIntelli Student" },
      { name: "description", content: "Track pending, submitted and evaluated assignments with due dates and scores." },
      { property: "og:title", content: "Assignments — EduIntelli Student" },
      { property: "og:description", content: "Submit assignments and review evaluated scores." },
    ],
  }),
  component: StudentAssignments,
});

function StudentAssignments() {
  const [rows, setRows] = useState<Assignment[]>(studentAssignments);

  const submit = (id: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Submitted" } : r)));
    toast.success("Assignment submitted successfully.");
  };

  const pending = rows.filter((r) => r.status === "Pending").length;

  return (
    <>
      <PageHeader eyebrow="Student portal" title="Assignments" description={`${pending} assignment${pending === 1 ? "" : "s"} still pending submission.`} />
      <SectionCard title="All assignments" description="Sorted by due date">
        {rows.length ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Due date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.title}</TableCell>
                    <TableCell className="text-muted-foreground">{r.course}</TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">{r.dueDate}</TableCell>
                    <TableCell><StatusBadge status={r.status} /></TableCell>
                    <TableCell>{r.score !== null ? `${r.score} / ${r.maxMarks}` : "—"}</TableCell>
                    <TableCell className="text-right">
                      {r.status === "Pending" ? (
                        <Button size="sm" onClick={() => submit(r.id)}>Submit Assignment</Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => toast.info(`Submission for "${r.title}" opened.`)}>View</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <EmptyState title="No assignments yet" description="New tasks appear here as soon as faculty publish them." />
        )}
      </SectionCard>
    </>
  );
}
