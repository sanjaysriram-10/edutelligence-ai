import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SectionCard, StatCard, StatusBadge } from "@/components/shared/primitives";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { examinations } from "@/lib/mock-data";

export const Route = createFileRoute("/student/examinations")({
  head: () => ({
    meta: [
      { title: "Examinations — EduIntelli Student" },
      { name: "description", content: "Upcoming and completed examinations with dates, duration and scored marks." },
      { property: "og:title", content: "Examinations — EduIntelli Student" },
      { property: "og:description", content: "Examination calendar and past results." },
    ],
  }),
  component: StudentExaminations,
});

function ExamTable({ rows }: { rows: typeof examinations }) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((e) => (
            <TableRow key={e.id}>
              <TableCell className="font-medium">{e.subject}</TableCell>
              <TableCell className="whitespace-nowrap text-muted-foreground">{e.date}</TableCell>
              <TableCell className="text-muted-foreground">{e.duration}</TableCell>
              <TableCell><StatusBadge status={e.status} /></TableCell>
              <TableCell className="text-right">{e.score !== null ? `${e.score} / ${e.maxMarks}` : "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function StudentExaminations() {
  const upcoming = examinations.filter((e) => e.status === "Upcoming");
  const previous = examinations.filter((e) => e.status === "Completed");
  const best = Math.max(...previous.map((p) => p.score ?? 0));

  return (
    <>
      <PageHeader eyebrow="Student portal" title="Examinations" description="Assessment calendar and previous results." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Upcoming exams" value={upcoming.length} hint={`Next: ${upcoming[0]?.subject ?? "—"}`} />
        <StatCard label="Completed exams" value={previous.length} hint="This academic year" tone="success" />
        <StatCard label="Best score" value={`${best}`} hint="Highest examination mark" tone="ai" />
      </div>
      <SectionCard title="Upcoming examinations" description="Prepare using the AI study plan">
        <ExamTable rows={upcoming} />
      </SectionCard>
      <SectionCard title="Previous examinations" description="Evaluated results">
        <ExamTable rows={previous} />
      </SectionCard>
    </>
  );
}
