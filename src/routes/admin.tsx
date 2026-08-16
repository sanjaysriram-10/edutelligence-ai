import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BookOpen, CalendarCheck, ClipboardList, FileBadge, LayoutDashboard, Settings, Sparkles, Users, ChartLine, FolderOpen, FileText, GraduationCap } from "lucide-react";

import { PortalShell, type NavItem } from "@/components/portal/PortalShell";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const NAV: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/students", label: "Students", icon: Users },
  { to: "/admin/teachers", label: "Teachers", icon: GraduationCap },
  { to: "/admin/courses", label: "Courses", icon: BookOpen },
  { to: "/admin/classes", label: "Classes", icon: CalendarCheck },
  { to: "/admin/assignments", label: "Assignments", icon: ClipboardList },
  { to: "/admin/examinations", label: "Examinations", icon: FileBadge },
  { to: "/admin/records", label: "Academic Records", icon: FolderOpen },
  { to: "/admin/reports", label: "Reports", icon: FileText },
  { to: "/admin/ai-insights", label: "AI Insights", icon: Sparkles },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminLayout() {
  return (
    <PortalShell items={NAV} role="Admin" userName="Registrar Office">
      <Outlet />
    </PortalShell>
  );
}
