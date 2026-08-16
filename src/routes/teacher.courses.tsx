import { createFileRoute } from "@tanstack/react-router";

import { CourseCard } from "@/components/shared/CourseCard";
import { PageHeader } from "@/components/shared/primitives";
import { getCourses } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/courses")({
  head: () => ({
    meta: [
      { title: "My Courses — EduIntelli Teacher" },
      { name: "description", content: "Courses assigned to the faculty member with enrolment counts, ratings and class averages." },
      { property: "og:title", content: "My Courses — EduIntelli Teacher" },
      { property: "og:description", content: "Courses assigned to the faculty member with enrolment counts, ratings and class averages." },
    ],
  }),
  component: TeacherCourses,
});

function TeacherCourses() {
  const courses = getCourses().slice(0, 4);
  return (
    <>
      <PageHeader eyebrow="Teacher portal" title="My Courses" description={`${courses.length} courses assigned this semester.`} />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {courses.map((c) => (<CourseCard key={c.id} course={c} />))}
      </div>
    </>
  );
}
