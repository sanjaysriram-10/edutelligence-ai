import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader, SectionCard, StatusBadge } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { examinations, getStudents } from "@/lib/mock-data";
import type { Examination } from "@/types";

export const Route = createFileRoute("/teacher/examinations")({
  head: () => ({
    meta: [
      { title: "Examinations — EduIntelli Teacher" },
      { name: "description", content: "Create examinations, enter marks and review results for each subject." },
      { property: "og:title", content: "Examinations — EduIntelli Teacher" },
      { property: "og:description", content: "Create examinations, enter marks and review results for each subject." },
    ],
  }),
  component: TeacherExaminations,
});

function TeacherExaminations() {
  const [rows, setRows] = useState<Examination[]>(examinations);
  const [form, setForm] = useState({ subject: "", date: "", duration: "3 hours", maxMarks: "100" });
  const [marks, setMarks] = useState<Record<string, string>>({});
  const students = getStudents().slice(0, 6);

  const create = () => {
    if (!form.subject || !form.date) {
      toast.error("Subject and date are required.");
      return;
    }
    setRows((prev) => [
      { id: `EXM-${Date.now()}`, subject: form.subject, date: form.date, duration: form.duration, maxMarks: Number(form.maxMarks) || 100, status: "Upcoming", score: null },
      ...prev,
    ]);
    setForm({ subject: "", date: "", duration: "3 hours", maxMarks: "100" });
    toast.success("Examination created successfully.");
  };

  return (
    <>
      <PageHeader eyebrow="Teacher portal" title="Examinations" description="Schedule assessments and record results." />
      <SectionCard title="Create examination" description="Subject, date, duration and maximum marks">
        <div className="grid gap-4 md:grid-cols-5">
          <div className="space-y-2 md:col-span-2"><Label htmlFor="s">Subject</Label><Input id="s" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Mathematics" /></div>
          <div className="space-y-2"><Label htmlFor="d">Date</Label><Input id="d" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
          <div className="space-y-2"><Label htmlFor="du">Duration</Label><Input id="du" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} /></div>
          <div className="space-y-2"><Label htmlFor="mm">Max marks</Label><Input id="mm" type="number" value={form.maxMarks} onChange={(e) => setForm({ ...form, maxMarks: e.target.value })} /></div>
          <div className="md:col-span-5"><Button onClick={create}>Create examination</Button></div>
        </div>
      </SectionCard>

      <SectionCard title="Examination schedule" description={`${rows.length} examinations`}>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Subject</TableHead><TableHead>Date</TableHead><TableHead>Duration</TableHead><TableHead>Max marks</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>
              {rows.map((e) => (
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

      <SectionCard title="Enter marks" description="Machine Learning · Internal Assessment II" action={<Button onClick={() => toast.success("Marks saved successfully.")}>Save marks</Button>}>
        <div className="grid gap-3 sm:grid-cols-2">
          {students.map((s) => (
            <div key={s.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.rollNo}</p>
              </div>
              <Input className="w-24" type="number" placeholder="/ 50" value={marks[s.id] ?? ""} onChange={(e) => setMarks((m) => ({ ...m, [s.id]: e.target.value }))} />
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
