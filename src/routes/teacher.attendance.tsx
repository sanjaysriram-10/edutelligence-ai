import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader, SectionCard } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { classSessions, getCourses, getStudents } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/attendance")({
  head: () => ({
    meta: [
      { title: "Mark Attendance — EduIntelli Teacher" },
      { name: "description", content: "Select course, class and date, mark students present or absent and save attendance for the session." },
      { property: "og:title", content: "Mark Attendance — EduIntelli Teacher" },
      { property: "og:description", content: "Select course, class and date, mark students present or absent and save attendance for the session." },
    ],
  }),
  component: TeacherAttendance,
});

function TeacherAttendance() {
  const courses = getCourses();
  const students = getStudents();
  const [course, setCourse] = useState(courses[0]?.id ?? "");
  const [section, setSection] = useState(classSessions[0]?.section ?? "");
  const [date, setDate] = useState("2026-08-17");
  const [present, setPresent] = useState<Record<string, boolean>>(
    Object.fromEntries(students.map((s) => [s.id, true])),
  );

  const markAll = () => {
    setPresent(Object.fromEntries(students.map((s) => [s.id, true])));
    toast.success("All students marked present.");
  };

  const presentCount = Object.values(present).filter(Boolean).length;

  return (
    <>
      <PageHeader eyebrow="Teacher portal" title="Attendance" description="Record attendance for a class session." />
      <SectionCard title="Session" description="Choose the course, class and date">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Course</Label>
            <Select value={course} onValueChange={setCourse}>
              <SelectTrigger><SelectValue placeholder="Course" /></SelectTrigger>
              <SelectContent>{courses.map((c) => (<SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>))}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Class</Label>
            <Select value={section} onValueChange={setSection}>
              <SelectTrigger><SelectValue placeholder="Class" /></SelectTrigger>
              <SelectContent>{classSessions.map((c) => (<SelectItem key={c.id} value={c.section}>{c.section} · {c.room}</SelectItem>))}</SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Students"
        description={`${presentCount} of ${students.length} marked present`}
        action={<div className="flex gap-2"><Button variant="outline" onClick={markAll}>Mark All Present</Button><Button onClick={() => toast.success("Attendance saved successfully.")}>Save Attendance</Button></div>}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {students.map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.rollNo}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${present[s.id] ? "text-success" : "text-destructive"}`}>{present[s.id] ? "Present" : "Absent"}</span>
                <Switch checked={Boolean(present[s.id])} onCheckedChange={(v) => setPresent((p) => ({ ...p, [s.id]: v }))} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
