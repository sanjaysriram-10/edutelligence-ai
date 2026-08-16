import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, SectionCard } from "@/components/shared/primitives";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { classSessions } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/classes")({
  head: () => ({
    meta: [
      { title: "Classes — EduIntelli Teacher" },
      { name: "description", content: "Weekly class timetable with sections, rooms, timings and class strength." },
      { property: "og:title", content: "Classes — EduIntelli Teacher" },
      { property: "og:description", content: "Weekly class timetable with sections, rooms, timings and class strength." },
    ],
  }),
  component: TeacherClasses,
});

function TeacherClasses() {
  return (
    <>
      <PageHeader eyebrow="Teacher portal" title="Classes" description="Your weekly teaching timetable." />
      <SectionCard title="Timetable" description={`${classSessions.length} scheduled sessions`}>
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
