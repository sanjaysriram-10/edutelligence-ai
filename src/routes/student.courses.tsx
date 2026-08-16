import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader } from "@/components/shared/primitives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCourses, getDemoStudent } from "@/lib/mock-data";

export const Route = createFileRoute("/student/courses")({
  head: () => ({
    meta: [
      { title: "My Courses — EduIntelli Student" },
      { name: "description", content: "Enrolled courses with progress, upcoming classes, pending assignments and current grade." },
      { property: "og:title", content: "My Courses — EduIntelli Student" },
      { property: "og:description", content: "Track progress across every enrolled course." },
    ],
  }),
  component: StudentCourses,
});

const META: Record<string, { progress: number; next: string; assignments: number; grade: string }> = {
  "CSE-501": { progress: 78, next: "Monday 09:00 · AI Lab 2", assignments: 2, grade: "A" },
  "CSE-302": { progress: 64, next: "Thursday 10:45 · DB Lab 1", assignments: 1, grade: "B+" },
  "CSE-201": { progress: 71, next: "Wednesday 09:00 · Block B – 008", assignments: 1, grade: "B" },
  "CSE-401": { progress: 48, next: "Friday 09:00 · Block C – 110", assignments: 2, grade: "C+" },
  "MAT-101": { progress: 36, next: "Monday 08:00 · Block A – 101", assignments: 3, grade: "D" },
};

function StudentCourses() {
  const student = getDemoStudent();
  const enrolled = getCourses().filter((c) => student.courses.includes(c.id) || c.id === "CSE-401" || c.id === "MAT-101");

  return (
    <>
      <PageHeader eyebrow="Student portal" title="My Courses" description={`${enrolled.length} active enrolments this semester.`} />
      <div className="grid gap-5 lg:grid-cols-2">
        {enrolled.map((c) => {
          const m = META[c.id] ?? { progress: 50, next: "To be scheduled", assignments: 0, grade: "—" };
          return (
            <Card key={c.id} className="transition-shadow hover:shadow-lift">
              <CardContent className="space-y-4 p-6">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{c.title}</h3>
                    <p className="text-sm text-muted-foreground">{c.instructor}</p>
                  </div>
                  <Badge variant="outline">Grade {m.grade}</Badge>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Course progress</span>
                    <span className="font-semibold text-foreground">{m.progress}%</span>
                  </div>
                  <Progress value={m.progress} className="mt-2 h-2" />
                </div>
                <div className="grid gap-2 text-sm sm:grid-cols-2">
                  <p className="text-muted-foreground">Next class: <span className="text-foreground">{m.next}</span></p>
                  <p className="text-muted-foreground">Pending assignments: <span className="text-foreground">{m.assignments}</span></p>
                </div>
                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link to="/courses/$id" params={{ id: c.id }}>Continue</Link>
                  </Button>
                  <Button variant="outline" onClick={() => toast.info(`Course material for ${c.title} opened.`)}>Material</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
