import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarDays, Clock, FileText, GraduationCap, Star, Users } from "lucide-react";
import { toast } from "sonner";

import { SiteLayout } from "@/components/site/SiteLayout";
import { BackLink, SectionCard } from "@/components/shared/primitives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCourse, studentAssignments } from "@/lib/mock-data";

export const Route = createFileRoute("/courses/$id")({
  loader: ({ params }) => {
    const course = getCourse(params.id);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Course unavailable — EduIntelli" }, { name: "robots", content: "noindex" }],
      };
    }
    const { course } = loaderData;
    const description = `${course.title} (${course.code}) taught by ${course.instructor} — ${course.duration}, ${course.credits} credits. Syllabus, schedule, assignments and examinations.`;
    return {
      meta: [
        { title: `${course.title} — EduIntelli` },
        { name: "description", content: description },
        { property: "og:title", content: `${course.title} — EduIntelli` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CourseDetailPage,
  notFoundComponent: CourseNotFound,
});

function CourseNotFound() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Course not found</h1>
        <p className="mt-2 text-muted-foreground">
          This course is no longer part of the catalogue.
        </p>
        <Button className="mt-6" asChild>
          <Link to="/courses">Back to courses</Link>
        </Button>
      </div>
    </SiteLayout>
  );
}

function CourseDetailPage() {
  const { course } = Route.useLoaderData();
  const [enrolled, setEnrolled] = useState(false);

  const courseAssignments = studentAssignments.filter(
    (a) => course.title.includes(a.course) || a.course === course.title,
  );

  const enroll = () => {
    setEnrolled(true);
    toast.success(`Enrolled in ${course.title}`, {
      description: "Course added to your student portal. Open My Courses to continue.",
    });
  };

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="gradient-ai-subtle absolute inset-0" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <BackLink to="/courses" label="Back to courses" />
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{course.difficulty}</Badge>
                <Badge variant="outline">{course.code}</Badge>
              </div>
              <h1 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
                {course.title}
              </h1>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                {course.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" /> {course.instructor}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" /> {course.duration}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Star className="h-4 w-4 fill-warning text-warning" /> {course.rating} rating
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4" /> {course.students} students
                </span>
              </div>
            </div>

            <Card className="h-fit shadow-lift">
              <CardContent className="space-y-4 p-6">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm text-muted-foreground">Credits</p>
                  <p className="text-2xl font-semibold text-foreground">{course.credits}</p>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-sm text-muted-foreground">Class average</p>
                  <p className="text-2xl font-semibold text-foreground">{course.averageScore}%</p>
                </div>
                <Button className="w-full" onClick={enroll} disabled={enrolled}>
                  {enrolled ? "Enrolled ✓" : "Enroll in this course"}
                </Button>
                {enrolled ? (
                  <p className="rounded-lg border border-success/30 bg-success/10 p-3 text-sm text-success">
                    Enrollment confirmed. You can track progress in the student portal.
                  </p>
                ) : null}
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login">Open Student Portal</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Tabs defaultValue="syllabus">
          <TabsList className="flex-wrap">
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="schedule">Weekly schedule</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="exams">Examinations</TabsTrigger>
          </TabsList>

          <TabsContent value="syllabus" className="mt-6">
            <SectionCard title="Syllabus" description="Week-by-week academic plan">
              <div className="space-y-3">
                {course.syllabus.map((s) => (
                  <div
                    key={s.week}
                    className="flex items-center gap-4 rounded-xl border border-border p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                      W{s.week}
                    </span>
                    <p className="flex-1 text-sm font-medium text-foreground">{s.topic}</p>
                    <span className="text-xs text-muted-foreground">{s.hours} hrs</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </TabsContent>

          <TabsContent value="schedule" className="mt-6">
            <SectionCard title="Weekly schedule" description="Lecture and laboratory slots">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {course.schedule.map((s) => (
                  <div key={s.day + s.time} className="rounded-xl border border-border p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
                      <CalendarDays className="h-4 w-4 text-primary" /> {s.day}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{s.time}</p>
                    <p className="text-xs text-muted-foreground">{s.room}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </TabsContent>

          <TabsContent value="assignments" className="mt-6">
            <SectionCard title="Assignments" description="Current assessment tasks for this course">
              <div className="space-y-3">
                {(courseAssignments.length ? courseAssignments : studentAssignments.slice(0, 3)).map(
                  (a) => (
                    <div key={a.id} className="rounded-xl border border-border p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="flex items-center gap-2 font-medium text-foreground">
                          <FileText className="h-4 w-4 text-primary" /> {a.title}
                        </p>
                        <Badge variant="outline">Due {a.dueDate}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{a.description}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Maximum marks: {a.maxMarks}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </SectionCard>
          </TabsContent>

          <TabsContent value="exams" className="mt-6">
            <SectionCard title="Examination information" description="Assessment calendar">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assessment</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Maximum marks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {course.examInfo.map((e) => (
                      <TableRow key={e.type}>
                        <TableCell className="font-medium">{e.type}</TableCell>
                        <TableCell>{e.date}</TableCell>
                        <TableCell className="text-right">{e.maxMarks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>
    </SiteLayout>
  );
}
