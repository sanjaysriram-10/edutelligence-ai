import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { EmptyState, PageHeader, SectionCard, StatusBadge } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getStudents } from "@/lib/mock-data";
import type { Student } from "@/types";

export const Route = createFileRoute("/admin/students")({
  head: () => ({
    meta: [
      { title: "Student Management — EduIntelli Admin" },
      { name: "description", content: "Search, add, edit, view and remove student records with department, year, attendance and performance data." },
      { property: "og:title", content: "Student Management — EduIntelli Admin" },
      { property: "og:description", content: "Search, add, edit, view and remove student records with department, year, attendance and performance data." },
    ],
  }),
  component: AdminStudents,
});

const EMPTY = { name: "", email: "", department: "Computer Science", year: "3" };

function AdminStudents() {
  const [rows, setRows] = useState<Student[]>(getStudents());
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("all");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const departments = Array.from(new Set(getStudents().map((s) => s.department)));

  const filtered = useMemo(
    () =>
      rows.filter((s) => {
        const q = query.trim().toLowerCase();
        if (q && !s.name.toLowerCase().includes(q) && !s.email.toLowerCase().includes(q) && !s.rollNo.toLowerCase().includes(q)) return false;
        if (dept !== "all" && s.department !== dept) return false;
        return true;
      }),
    [rows, query, dept],
  );

  const add = () => {
    if (!form.name || !form.email) {
      toast.error("Name and email are required.");
      return;
    }
    setRows((prev) => [
      {
        id: `STU-${Date.now()}`,
        name: form.name,
        email: form.email,
        rollNo: "NEW-000",
        department: form.department,
        year: Number(form.year) || 1,
        attendance: 80,
        assignmentScore: 70,
        examScore: 68,
        averageScore: 70,
        status: "Active",
        courses: [],
        subjects: [],
        history: [],
      },
      ...prev,
    ]);
    setForm(EMPTY);
    setOpen(false);
    toast.success("Student added successfully.");
  };

  return (
    <>
      <PageHeader
        eyebrow="Administrator portal"
        title="Student management"
        description={`${rows.length} student records`}
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button>Add Student</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Add student</DialogTitle></DialogHeader>
              <div className="grid gap-4">
                <div className="space-y-2"><Label htmlFor="n">Full name</Label><Input id="n" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div className="space-y-2"><Label htmlFor="e">Email</Label><Input id="e" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2"><Label htmlFor="dp">Department</Label><Input id="dp" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} /></div>
                  <div className="space-y-2"><Label htmlFor="y">Year</Label><Input id="y" type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} /></div>
                </div>
              </div>
              <DialogFooter><Button onClick={add}>Add student</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <SectionCard title="Records" description={`${filtered.length} shown`}>
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email or roll no…" />
          <Select value={dept} onValueChange={setDept}>
            <SelectTrigger><SelectValue placeholder="Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {departments.map((d) => (<SelectItem key={d} value={d}>{d}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        {filtered.length ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Department</TableHead><TableHead>Year</TableHead><TableHead>Attendance</TableHead><TableHead>Performance</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {filtered.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="text-muted-foreground">{s.email}</TableCell>
                    <TableCell className="text-muted-foreground">{s.department}</TableCell>
                    <TableCell>{s.year}</TableCell>
                    <TableCell className={s.attendance < 75 ? "font-semibold text-destructive" : ""}>{s.attendance}%</TableCell>
                    <TableCell>{s.averageScore}%</TableCell>
                    <TableCell><StatusBadge status={s.status} /></TableCell>
                    <TableCell className="space-x-2 text-right">
                      <Button size="sm" variant="outline" onClick={() => toast.info(`${s.name} · ${s.rollNo} · ${s.department}`)}>View</Button>
                      <Button size="sm" variant="outline" onClick={() => toast.success("Student updated successfully.")}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => { setRows((prev) => prev.filter((x) => x.id !== s.id)); toast.success("Student record deleted."); }}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <EmptyState title="No students found" description="Try another search term or department." />
        )}
      </SectionCard>
    </>
  );
}
