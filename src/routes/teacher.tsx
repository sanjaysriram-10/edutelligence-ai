import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BookOpen, CalendarCheck, ClipboardList, FileBadge, LayoutDashboard, Settings, Sparkles, Users, ChartLine, FolderOpen, FileText, GraduationCap } from "lucide-react";

import { PortalShell, type NavItem } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/teacher")({
  component: TeacherLayout,
});

const NAV: NavItem[] = [
  { to: "/teacher", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/teacher/courses", label: "My Courses", icon: BookOpen },
  { to: "/teacher/classes", label: "Classes", icon: GraduationCap },
  { to: "/teacher/attendance", label: "Attendance", icon: CalendarCheck },
  { to: "/teacher/assignments", label: "Assignments", icon: ClipboardList },
  { to: "/teacher/examinations", label: "Examinations", icon: FileBadge },
  { to: "/teacher/students", label: "Students", icon: Users },
  { to: "/teacher/performance", label: "Performance", icon: ChartLine },
  { to: "/teacher/ai-insights", label: "AI Insights", icon: Sparkles },
];

function TeacherLayout() {
  return (
    <PortalShell items={NAV} role="Teacher" userName="Dr. Kavitha Narayanan">
      <Outlet />
    </PortalShell>
  );
}
