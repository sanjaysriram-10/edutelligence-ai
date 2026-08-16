import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader, SectionCard } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { studentAssignments } from "@/lib/mock-data";
import type { Assignment } from "@/types";

export const Route = createFileRoute("/teacher/assignments")({
  head: () => ({
    meta: [
      { title: "Assignments — EduIntelli Teacher" },
      { name: "description", content: "Create, edit and delete assignments, and review submission counts for every course." },
      { property: "og:title", content: "Assignments — EduIntelli Teacher" },
      { property: "og:description", content: "Create, edit and delete assignments, and review submission counts for every course." },
    ],
  }),
  component: TeacherAssignments,
});

const EMPTY = { title: "", course: "", description: "", dueDate: "", maxMarks: "20" };

function TeacherAssignments() {
  const [rows, setRows] = useState<Assignment[]>(studentAssignments);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const create = () => {
    if (!form.title || !form.course || !form.dueDate) {
      toast.error("Title, course and due date are required.");
      return;
    }
    setRows((prev) => [
      {
        id: `ASG-${Date.now()}`,
        title: form.title,
        course: form.course,
        description: form.description,
        dueDate: form.dueDate,
        maxMarks: Number(form.maxMarks) || 20,
        status: "Pending",
        score: null,
        submissions: 0,
        total: 48,
      },
      ...prev,
    ]);
    setForm(EMPTY);
    setOpen(false);
    toast.success("Assignment created successfully.");
  };

  const remove = (id: string) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
    toast.success("Assignment deleted.");
  };

  return (
    <>
      <PageHeader
        eyebrow="Teacher portal"
        title="Assignments"
        description="Publish new tasks and track submissions."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button>Create Assignment</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Create assignment</DialogTitle></DialogHeader>
              <div className="grid gap-4">
                <div className="space-y-2"><Label htmlFor="t">Title</Label><Input id="t" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div className="space-y-2"><Label htmlFor="c">Course</Label><Input id="c" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} placeholder="Machine Learning" /></div>
                <div className="space-y-2"><Label htmlFor="d">Description</Label><Textarea id="d" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2"><Label htmlFor="dd">Due date</Label><Input id="dd" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} /></div>
                  <div className="space-y-2"><Label htmlFor="mm">Maximum marks</Label><Input id="mm" type="number" value={form.maxMarks} onChange={(e) => setForm({ ...form, maxMarks: e.target.value })} /></div>
                </div>
              </div>
              <DialogFooter><Button onClick={create}>Create</Button></DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <SectionCard title="Published assignments" description={`${rows.length} assignments`}>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assignment</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.title}</TableCell>
                  <TableCell className="text-muted-foreground">{r.course}</TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{r.dueDate}</TableCell>
                  <TableCell>{r.submissions} / {r.total}</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Button size="sm" variant="outline" onClick={() => toast.info(`${r.submissions} submissions for "${r.title}".`)}>Submissions</Button>
                    <Button size="sm" variant="outline" onClick={() => toast.success("Assignment updated.")}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => remove(r.id)}>Delete</Button>
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
