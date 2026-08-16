import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { EmptyState, PageHeader, RiskBadge, SectionCard } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { analyzeStudent } from "@/lib/ai";
import { getCourses, getStudents } from "@/lib/mock-data";

export const Route = createFileRoute("/teacher/students")({
  head: () => ({
    meta: [
      { title: "Student Monitoring — EduIntelli Teacher" },
      { name: "description", content: "Monitor students by course, attendance, average score and AI-detected academic risk level." },
      { property: "og:title", content: "Student Monitoring — EduIntelli Teacher" },
      { property: "og:description", content: "Monitor students by course, attendance, average score and AI-detected academic risk level." },
    ],
  }),
  component: TeacherStudents,
});

function TeacherStudents() {
  const [query, setQuery] = useState("");
  const [course, setCourse] = useState("all");
  const [risk, setRisk] = useState("all");
  const [attendance, setAttendance] = useState("all");
  const courses = getCourses();

  const rows = useMemo(() => {
    return getStudents()
      .map((s) => ({ student: s, insight: analyzeStudent(s) }))
      .filter(({ student, insight }) => {
        const q = query.trim().toLowerCase();
        if (q && !student.name.toLowerCase().includes(q) && !student.rollNo.toLowerCase().includes(q)) return false;
        if (course !== "all" && !student.courses.includes(course)) return false;
        if (risk !== "all" && insight.risk !== risk) return false;
        if (attendance === "below75" && student.attendance >= 75) return false;
        if (attendance === "below60" && student.attendance >= 60) return false;
        return true;
      })
      .sort((a, b) => a.student.averageScore - b.student.averageScore);
  }, [query, course, risk, attendance]);

  return (
    <>
      <PageHeader eyebrow="Teacher portal" title="Student monitoring" description="Filter by course, risk level and attendance to prioritise intervention." />
      <SectionCard title="Cohort" description={`${rows.length} students match the current filters`}>
        <div className="mb-4 grid gap-3 md:grid-cols-4">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or roll no…" />
          <Select value={course} onValueChange={setCourse}>
            <SelectTrigger><SelectValue placeholder="Course" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All courses</SelectItem>
              {courses.map((c) => (<SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>))}
            </SelectContent>
          </Select>
          <Select value={risk} onValueChange={setRisk}>
            <SelectTrigger><SelectValue placeholder="Risk" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All risk levels</SelectItem>
              <SelectItem value="High">High risk</SelectItem>
              <SelectItem value="Moderate">Moderate risk</SelectItem>
              <SelectItem value="Low">Low risk</SelectItem>
            </SelectContent>
          </Select>
          <Select value={attendance} onValueChange={setAttendance}>
            <SelectTrigger><SelectValue placeholder="Attendance" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any attendance</SelectItem>
              <SelectItem value="below75">Below 75%</SelectItem>
              <SelectItem value="below60">Below 60%</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {rows.length ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Average</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(({ student, insight }) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.rollNo}</p>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{student.department}</TableCell>
                    <TableCell className={student.attendance < 75 ? "font-semibold text-destructive" : ""}>{student.attendance}%</TableCell>
                    <TableCell>{student.averageScore}%</TableCell>
                    <TableCell><RiskBadge level={insight.risk} /></TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" onClick={() => toast.info(`${student.name}: ${insight.recommendations[0]}`)}>AI action</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <EmptyState title="No students match" description="Adjust the filters to widen the cohort." />
        )}
      </SectionCard>
    </>
  );
}
