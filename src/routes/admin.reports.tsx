import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { CoursePerformanceChart, GradeDistributionChart, SubjectBarChart } from "@/components/shared/charts";
import { PageHeader, SectionCard, StatCard } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { analyzeCohort, analyzeStudent } from "@/lib/ai";
import { getCourses, getStudents, gradeDistribution } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({
    meta: [
      { title: "Academic Reports — EduIntelli Admin" },
      { name: "description", content: "Overall performance, attendance, weak subject, risk, course comparison and student progress reports with export and print output." },
      { property: "og:title", content: "Academic Reports — EduIntelli Admin" },
      { property: "og:description", content: "Overall performance, attendance, weak subject, risk, course comparison and student progress reports with export and print output." },
    ],
  }),
  component: AdminReports,
});

function AdminReports() {
  const students = getStudents();
  const cohort = analyzeCohort(students);
  const courses = getCourses();

  const exportCsv = () => {
    const header = "Student,Roll No,Department,Attendance,Average,AI Score,Risk\n";
    const body = students
      .map((s) => {
        const i = analyzeStudent(s);
        return [s.name, s.rollNo, s.department, s.attendance, s.averageScore, i.score, i.risk].join(",");
      })
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "eduintelli-academic-report.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Report exported successfully.");
  };

  return (
    <>
      <PageHeader
        eyebrow="Administrator portal"
        title="Academic reports"
        description="Institution-level reporting generated from current academic data."
        actions={
          <>
            <Button variant="outline" onClick={exportCsv}>Export Report</Button>
            <Button onClick={() => { toast.info("Opening print-friendly report…"); window.print(); }}>Download PDF</Button>
          </>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Overall average" value={`${cohort.averageScore}%`} progress={cohort.averageScore} />
        <StatCard label="Average attendance" value={`${cohort.averageAttendance}%`} progress={cohort.averageAttendance} tone="success" />
        <StatCard label="High risk students" value={cohort.highRisk.length} tone="danger" />
        <StatCard label="Weakest subject" value={cohort.weakestSubject} tone="warning" />
      </div>

      <SectionCard title="Weak subject analysis" description="Cohort averages by subject">
        <SubjectBarChart data={cohort.subjectAverages.map((s) => ({ subject: s.subject, score: s.average }))} />
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Course comparison" description="Average score per course">
          <CoursePerformanceChart data={courses.map((c) => ({ course: c.title, average: c.averageScore }))} />
        </SectionCard>
        <SectionCard title="Grade distribution" description="Semester results">
          <GradeDistributionChart data={gradeDistribution} />
        </SectionCard>
      </div>

      <SectionCard title="Student progress report" description="Attendance, average and AI risk per student">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Department</TableHead><TableHead>Attendance</TableHead><TableHead>Average</TableHead><TableHead>Trend</TableHead><TableHead>Risk</TableHead></TableRow></TableHeader>
            <TableBody>
              {cohort.insights.map(({ student, insight }) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="text-muted-foreground">{student.department}</TableCell>
                  <TableCell>{student.attendance}%</TableCell>
                  <TableCell>{student.averageScore}%</TableCell>
                  <TableCell className="text-muted-foreground">{insight.trend}</TableCell>
                  <TableCell className="text-muted-foreground">{insight.risk}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>
    </>
  );
}
