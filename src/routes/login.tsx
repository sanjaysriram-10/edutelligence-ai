import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { GraduationCap, Shield, Sparkles, UserRound } from "lucide-react";
import { toast } from "sonner";

import { Logo } from "@/components/site/SiteLayout";
import { AIBadge } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEMO_SESSIONS, ROLE_HOME, signIn } from "@/lib/auth";
import type { Role } from "@/types";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — EduIntelli Portal" },
      {
        name: "description",
        content:
          "Sign in to EduIntelli as a student, teacher or administrator, or launch an instant demo portal with realistic academic data.",
      },
      { property: "og:title", content: "Sign in — EduIntelli Portal" },
      {
        property: "og:description",
        content: "Role-based access to student, teacher and administrator academic dashboards.",
      },
    ],
  }),
  component: LoginPage,
});

const DEMOS: { role: Role; label: string; icon: typeof UserRound; caption: string }[] = [
  { role: "student", label: "Continue as Demo Student", icon: UserRound, caption: "Sanjay Sriram · 21CS001" },
  { role: "teacher", label: "Continue as Demo Teacher", icon: GraduationCap, caption: "Dr. Kavitha Narayanan" },
  { role: "admin", label: "Continue as Demo Administrator", icon: Shield, caption: "Registrar Office" },
];

function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("student");
  const [email, setEmail] = useState("sanjay.sriram@eduintelli.edu.in");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);

  const enter = (r: Role, name?: string) => {
    signIn({ ...DEMO_SESSIONS[r], ...(name ? { name } : {}) });
    toast.success(`Signed in as ${r === "admin" ? "Administrator" : r === "teacher" ? "Teacher" : "Student"}`);
    navigate({ to: ROLE_HOME[r] });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Enter both email and password to continue.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      enter(role);
    }, 450);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-border bg-card lg:block">
        <div className="grid-backdrop absolute inset-0 opacity-40" aria-hidden />
        <div className="gradient-ai-subtle absolute inset-0" aria-hidden />
        <div className="relative flex h-full flex-col justify-between p-10">
          <Logo />
          <div>
            <AIBadge label="AI Academic Intelligence" />
            <h1 className="mt-5 max-w-md text-4xl font-semibold leading-tight text-foreground">
              One portal for academics, analytics and academic intelligence.
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Role-based dashboards for students, teachers and administrators — with explainable risk
              detection and personalized recommendations built in.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Weighted performance scoring across attendance, assignments and exams",
                "Automatic weak-subject and academic-risk detection",
                "AI-generated study plans and intervention suggestions",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-ai" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs text-muted-foreground">
            Demo environment — academic data is seeded locally, no backend required.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <Logo />
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-foreground">Sign in to EduIntelli</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Choose your role to open the matching portal.
          </p>

          <Card className="mt-6">
            <CardContent className="p-6">
              <form className="space-y-4" onSubmit={submit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@eduintelli.edu.in"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing in…" : "Login"}
                </Button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Instant demo
                </span>
                <Separator className="flex-1" />
              </div>

              <div className="space-y-2.5">
                {DEMOS.map((d) => (
                  <Button
                    key={d.role}
                    variant="outline"
                    className="h-auto w-full justify-start gap-3 py-3"
                    onClick={() => enter(d.role)}
                  >
                    <span className="rounded-lg bg-primary/10 p-2 text-primary">
                      <d.icon className="h-4 w-4" />
                    </span>
                    <span className="text-left">
                      <span className="block text-sm font-semibold">{d.label}</span>
                      <span className="block text-xs text-muted-foreground">{d.caption}</span>
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
