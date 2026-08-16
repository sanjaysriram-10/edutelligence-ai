import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SectionCard, StatCard, StatusBadge } from "@/components/shared/primitives";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { examinations } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/examinations")({
  head: () => ({
    meta: [
      { title: "Examination Management — EduIntelli Admin" },
      { name: "description", content: "Examination calendar, durations, maximum marks and completion status across subjects." },
      { property: "og:title", content: "Examination Management — EduIntelli Admin" },
      { property: "og:description", content: "Examination calendar, durations, maximum marks and completion status across subjects." },
    ],
  }),
  component: AdminExaminations,
});

function AdminExaminations() {
  const upcoming = examinations.filter((e) => e.status === "Upcoming").length;
  return (
    <>
      <PageHeader eyebrow="Administrator portal" title="Examinations" description="Assessment calendar for the current semester." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Scheduled" value={examinations.length} />
        <StatCard label="Upcoming" value={upcoming} tone="warning" />
        <StatCard label="Completed" value={examinations.length - upcoming} tone="success" />
      </div>
      <SectionCard title="Examination schedule" description="All subjects">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Subject</TableHead><TableHead>Date</TableHead><TableHead>Duration</TableHead><TableHead>Max marks</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {examinations.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.subject}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{e.date}</TableCell>
                  <TableCell className="text-muted-foreground">{e.duration}</TableCell>
                  <TableCell>{e.maxMarks}</TableCell>
                  <TableCell><StatusBadge status={e.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </>
  );
}
