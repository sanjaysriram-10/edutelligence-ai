import { useEffect, useState, type ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Skeleton } from "@/components/ui/skeleton";

/** Charts are browser-only: render a skeleton during SSR to avoid hydration drift. */
function ChartFrame({ height = 288, children }: { height?: number; children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <Skeleton className="w-full rounded-xl" style={{ height }} />;
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        {children as never}
      </ResponsiveContainer>
    </div>
  );
}

const axis = {
  stroke: "var(--color-muted-foreground)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  contentStyle: {
    background: "var(--color-card)",
    border: "1px solid var(--color-border)",
    borderRadius: "12px",
    fontSize: "12px",
    color: "var(--color-card-foreground)",
  },
} as const;

export function PerformanceChart({
  data,
  height = 300,
}: {
  data: { month: string; attendance: number; assignments: number; exams: number }[];
  height?: number;
}) {
  return (
    <ChartFrame height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="month" {...axis} tickFormatter={(v: string) => v.slice(0, 3)} />
        <YAxis domain={[0, 100]} {...axis} />
        <Tooltip {...tooltipStyle} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Line
          type="monotone"
          dataKey="attendance"
          name="Attendance"
          stroke="var(--color-primary)"
          strokeWidth={2.5}
          dot={{ r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="assignments"
          name="Assignments"
          stroke="var(--color-ai)"
          strokeWidth={2.5}
          dot={{ r: 3 }}
        />
        <Line
          type="monotone"
          dataKey="exams"
          name="Exams"
          stroke="var(--color-warning)"
          strokeWidth={2.5}
          dot={{ r: 3 }}
        />
      </LineChart>
    </ChartFrame>
  );
}

export function SubjectBarChart({
  data,
  height = 300,
  threshold = 50,
}: {
  data: { subject: string; score: number }[];
  height?: number;
  threshold?: number;
}) {
  return (
    <ChartFrame height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="subject" {...axis} interval={0} tick={{ fontSize: 10 }} />
        <YAxis domain={[0, 100]} {...axis} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="score" name="Score" radius={[8, 8, 0, 0]}>
          {data.map((d) => (
            <Cell
              key={d.subject}
              fill={
                d.score < threshold
                  ? "var(--color-destructive)"
                  : d.score < 65
                    ? "var(--color-warning)"
                    : "var(--color-primary)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ChartFrame>
  );
}

export function AttendanceAreaChart({
  data,
  height = 260,
}: {
  data: { month: string; attendance: number }[];
  height?: number;
}) {
  return (
    <ChartFrame height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="month" {...axis} tickFormatter={(v: string) => v.slice(0, 3)} />
        <YAxis domain={[50, 100]} {...axis} />
        <Tooltip {...tooltipStyle} />
        <Area
          type="monotone"
          dataKey="attendance"
          name="Attendance %"
          stroke="var(--color-primary)"
          strokeWidth={2.5}
          fill="url(#attGrad)"
        />
      </AreaChart>
    </ChartFrame>
  );
}

export function GradeDistributionChart({
  data,
  height = 280,
}: {
  data: { grade: string; students: number }[];
  height?: number;
}) {
  return (
    <ChartFrame height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="grade" {...axis} />
        <YAxis {...axis} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="students" name="Students" fill="var(--color-ai)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ChartFrame>
  );
}

export function RiskPieChart({
  data,
  height = 260,
}: {
  data: { name: string; value: number }[];
  height?: number;
}) {
  const colors = ["var(--color-success)", "var(--color-warning)", "var(--color-destructive)"];
  return (
    <ChartFrame height={height}>
      <PieChart>
        <Tooltip {...tooltipStyle} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
          {data.map((d, i) => (
            <Cell key={d.name} fill={colors[i % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartFrame>
  );
}

export function CoursePerformanceChart({
  data,
  height = 300,
}: {
  data: { course: string; average: number }[];
  height?: number;
}) {
  return (
    <ChartFrame height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} {...axis} />
        <YAxis type="category" dataKey="course" width={140} {...axis} tick={{ fontSize: 11 }} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="average" name="Average score" radius={[0, 8, 8, 0]}>
          {data.map((d) => (
            <Cell
              key={d.course}
              fill={d.average < 60 ? "var(--color-destructive)" : "var(--color-primary)"}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartFrame>
  );
}

export function EnrollmentChart({
  data,
  height = 280,
}: {
  data: { month: string; students: number; newAdmissions: number }[];
  height?: number;
}) {
  return (
    <ChartFrame height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
        <defs>
          <linearGradient id="enrGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-ai)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-ai)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
        <XAxis dataKey="month" {...axis} tickFormatter={(v: string) => v.slice(0, 3)} />
        <YAxis {...axis} />
        <Tooltip {...tooltipStyle} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Area
          type="monotone"
          dataKey="students"
          name="Total students"
          stroke="var(--color-ai)"
          strokeWidth={2.5}
          fill="url(#enrGrad)"
        />
        <Line type="monotone" dataKey="newAdmissions" name="New admissions" stroke="var(--color-primary)" />
      </AreaChart>
    </ChartFrame>
  );
}
