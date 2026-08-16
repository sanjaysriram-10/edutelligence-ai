import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SectionCard } from "@/components/shared/primitives";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { classSessions } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/classes")({
  head: () => ({
    meta: [
      { title: "Class Management — EduIntelli Admin" },
      { name: "description", content: "Scheduled classes with course, section, room, timing and student strength." },
      { property: "og:title", content: "Class Management — EduIntelli Admin" },
      { property: "og:description", content: "Scheduled classes with course, section, room, timing and student strength." },
    ],
  }),
  component: AdminClasses,
});

function AdminClasses() {
  return (
    <>
      <PageHeader eyebrow="Administrator portal" title="Class management" description={`${classSessions.length} sessions scheduled this week.`} />
      <SectionCard title="Timetable" description="All departments">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Course</TableHead><TableHead>Section</TableHead><TableHead>Day</TableHead><TableHead>Time</TableHead><TableHead>Room</TableHead><TableHead className="text-right">Strength</TableHead></TableRow></TableHeader>
            <TableBody>
              {classSessions.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.course}</TableCell>
                  <TableCell>{c.section}</TableCell>
                  <TableCell className="text-muted-foreground">{c.day}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{c.time}</TableCell>
                  <TableCell className="text-muted-foreground">{c.room}</TableCell>
                  <TableCell className="text-right">{c.strength}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </>
  );
}
