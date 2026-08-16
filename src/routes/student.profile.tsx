import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader, SectionCard } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDemoStudent } from "@/lib/mock-data";

export const Route = createFileRoute("/student/profile")({
  head: () => ({
    meta: [
      { title: "Profile — EduIntelli Student" },
      { name: "description", content: "Student profile details: roll number, department, year, contact information and academic summary." },
      { property: "og:title", content: "Profile — EduIntelli Student" },
      { property: "og:description", content: "Manage student profile and contact details." },
    ],
  }),
  component: StudentProfile,
});

function StudentProfile() {
  const student = getDemoStudent();
  const fields = [
    { id: "name", label: "Full name", value: student.name },
    { id: "roll", label: "Roll number", value: student.rollNo },
    { id: "email", label: "Email", value: student.email },
    { id: "dept", label: "Department", value: student.department },
    { id: "year", label: "Year of study", value: String(student.year) },
    { id: "phone", label: "Phone", value: "+91 98400 21248" },
  ];

  return (
    <>
      <PageHeader eyebrow="Student portal" title="Profile" description="Your academic identity and contact details." />
      <SectionCard title="Personal details" description="Update and save your information">
        <form
          className="grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Profile updated successfully.");
          }}
        >
          {fields.map((f) => (
            <div key={f.id} className="space-y-2">
              <Label htmlFor={f.id}>{f.label}</Label>
              <Input id={f.id} defaultValue={f.value} />
            </div>
          ))}
          <div className="sm:col-span-2">
            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </SectionCard>
      <SectionCard title="Academic summary" description="Current standing">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { k: "Attendance", v: `${student.attendance}%` },
            { k: "Average score", v: `${student.averageScore}%` },
            { k: "Enrolled courses", v: String(student.courses.length) },
          ].map((s) => (
            <div key={s.k} className="rounded-xl border border-border p-4">
              <p className="text-sm text-muted-foreground">{s.k}</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
