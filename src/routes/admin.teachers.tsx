import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader, SectionCard } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTeachers } from "@/lib/mock-data";
import type { Teacher } from "@/types";

export const Route = createFileRoute("/admin/teachers")({
  head: () => ({
    meta: [
      { title: "Teacher Management — EduIntelli Admin" },
      { name: "description", content: "Search faculty, add teachers, edit records and review assigned courses." },
      { property: "og:title", content: "Teacher Management — EduIntelli Admin" },
      { property: "og:description", content: "Search faculty, add teachers, edit records and review assigned courses." },
    ],
  }),
  component: AdminTeachers,
});

function AdminTeachers() {
  const [rows, setRows] = useState<Teacher[]>(getTeachers());
  const [query, setQuery] = useState("");
  const filtered = rows.filter((t) => t.name.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <>
      <PageHeader
        eyebrow="Administrator portal"
        title="Teacher management"
        description={`${rows.length} faculty records`}
        actions={<Button onClick={() => toast.success("Teacher added successfully.")}>Add Teacher</Button>}
      />
      <SectionCard title="Faculty" description="Departments, designations and course load">
        <Input className="mb-4 sm:max-w-sm" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search faculty…" />
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Department</TableHead><TableHead>Designation</TableHead><TableHead>Experience</TableHead><TableHead>Rating</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {filtered.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.email}</p>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{t.department}</TableCell>
                  <TableCell className="text-muted-foreground">{t.designation}</TableCell>
                  <TableCell>{t.experience} yrs</TableCell>
                  <TableCell>{t.rating}</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button size="sm" variant="outline" onClick={() => toast.info(`Courses: ${t.courses.join(", ")}`)}>View Courses</Button>
                    <Button size="sm" variant="outline" onClick={() => toast.success("Teacher updated successfully.")}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => { setRows((p) => p.filter((x) => x.id !== t.id)); toast.success("Teacher record deleted."); }}>Delete</Button>
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
