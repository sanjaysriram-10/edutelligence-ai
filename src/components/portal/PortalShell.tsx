import { useState, type ComponentType, type ReactNode } from "react";
import { Link, useNavigate, type LinkProps } from "@tanstack/react-router";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import { toast } from "sonner";

import { Logo } from "@/components/site/SiteLayout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { signOut } from "@/lib/auth";
import { cn } from "@/lib/utils";

export interface NavItem {
  to: LinkProps["to"];
  label: string;
  icon: ComponentType<{ className?: string }>;
  exact?: boolean;
}

function NavList({ items, onNavigate }: { items: NavItem[]; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => (
        <Link
          key={String(item.to)}
          to={item.to}
          activeOptions={{ exact: item.exact ?? false }}
          onClick={onNavigate}
          activeProps={{ className: "bg-primary/10 text-primary font-semibold" }}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <item.icon className="h-4 w-4 shrink-0" />
          <span className="truncate">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export function PortalShell({
  items,
  role,
  userName,
  children,
}: {
  items: NavItem[];
  role: string;
  userName: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    toast.success("Signed out successfully.");
    navigate({ to: "/login" });
  };

  const initials = userName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  const sidebarInner = (onNavigate?: () => void) => (
    <div className="flex h-full flex-col gap-6 p-4">
      <Logo />
      <div className="rounded-xl border border-border bg-secondary/50 p-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {role} Portal
        </p>
        <p className="mt-0.5 truncate text-sm font-semibold text-foreground">{userName}</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <NavList items={items} onNavigate={onNavigate} />
      </div>
      <Button variant="outline" className="justify-start gap-3" onClick={logout}>
        <LogOut className="h-4 w-4" /> Logout
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-card lg:block">
        {sidebarInner()}
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-xl sm:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetTitle className="sr-only">{role} navigation</SheetTitle>
              {sidebarInner(() => setOpen(false))}
            </SheetContent>
          </Sheet>

          <div className="relative hidden max-w-xs flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search students, courses…" className="pl-9" />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              onClick={() => toast.info("3 new academic alerts in AI Insights.")}
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className={cn("mx-auto max-w-7xl space-y-6 p-4 pb-24 sm:p-6 lg:p-8")}>{children}</main>

        <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-border bg-card/95 px-2 py-2 backdrop-blur lg:hidden">
          {items.slice(0, 5).map((item) => (
            <Link
              key={String(item.to)}
              to={item.to}
              activeOptions={{ exact: item.exact ?? false }}
              activeProps={{ className: "text-primary" }}
              className="flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-medium text-muted-foreground"
            >
              <item.icon className="h-4 w-4" />
              <span className="max-w-[64px] truncate">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
