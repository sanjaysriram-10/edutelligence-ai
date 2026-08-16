import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarCheck,
  ClipboardList,
  FileBadge,
  GraduationCap,
  LayoutDashboard,
  Sparkles,
  UserRound,
} from "lucide-react";

import { PortalShell, type NavItem } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/student")({
  component: StudentLayout,
});

const NAV: NavItem[] = [
  { to: "/student", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/student/courses", label: "My Courses", icon: BookOpen },
  { to: "/student/assignments", label: "Assignments", icon: ClipboardList },
  { to: "/student/attendance", label: "Attendance", icon: CalendarCheck },
  { to: "/student/examinations", label: "Examinations", icon: FileBadge },
  { to: "/student/grades", label: "Grades", icon: GraduationCap },
  { to: "/student/ai-insights", label: "AI Insights", icon: Sparkles },
  { to: "/student/profile", label: "Profile", icon: UserRound },
];

function StudentLayout() {
  return (
    <PortalShell items={NAV} role="Student" userName="Sanjay Sriram">
      <Outlet />
    </PortalShell>
  );
}
