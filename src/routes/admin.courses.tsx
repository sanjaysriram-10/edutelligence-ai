import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader, SectionCard } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCourses } from "@/lib/mock-data";
import type { Course } from "@/types";

export const Route = createFileRoute("/admin/courses")({
  head: () => ({
    meta: [
      { title: "Course Management — EduIntelli Admin" },
      { name: "description", content: "Add, edit and remove courses, assign faculty and review enrolled students." },
      { property: "og:title", content: "Course Management — EduIntelli Admin" },
      { property: "og:description", content: "Add, edit and remove courses, assign faculty and review enrolled students." },
    ],
  }),
  component: AdminCourses,
});

function AdminCourses() {
  const [rows, setRows] = useState<Course[]>(getCourses());
  return (
    <>
      <PageHeader
        eyebrow="Administrator portal"
        title="Course management"
        description={`${rows.length} active courses`}
        actions={<Button onClick={() => toast.success("Course created successfully.")}>Add Course</Button>}
      />
      <SectionCard title="Catalogue" description="Assign faculty and monitor enrolment">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Course</TableHead><TableHead>Category</TableHead><TableHead>Instructor</TableHead><TableHead>Students</TableHead><TableHead>Average</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {rows.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <p className="font-medium">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.code}</p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{c.category}</TableCell>
                  <TableCell className="text-muted-foreground">{c.instructor}</TableCell>
                  <TableCell>{c.students}</TableCell>
                  <TableCell className={c.averageScore < 60 ? "font-semibold text-destructive" : ""}>{c.averageScore}%</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button size="sm" variant="outline" onClick={() => toast.success(`Faculty assigned to ${c.title}.`)}>Assign Teacher</Button>
                    <Button size="sm" variant="outline" onClick={() => toast.info(`${c.students} students enrolled in ${c.title}.`)}>View Students</Button>
                    <Button size="sm" variant="destructive" onClick={() => { setRows((p) => p.filter((x) => x.id !== c.id)); toast.success("Course deleted."); }}>Delete</Button>
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
