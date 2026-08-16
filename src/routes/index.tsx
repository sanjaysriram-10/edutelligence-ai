import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CalendarCheck,
  ChartLine,
  CheckCircle2,
  GaugeCircle,
  GraduationCap,
  Layers,
  Lightbulb,
  Search,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { CourseCard } from "@/components/shared/CourseCard";
import { AIBadge } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getFeaturedCourses } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduIntelli — Smart Education Management Portal" },
      {
        name: "description",
        content:
          "Manage academics, understand performance and improve student outcomes with AI-powered academic intelligence for students, teachers and administrators.",
      },
      { property: "og:title", content: "EduIntelli — Smart Education Management Portal" },
      {
        property: "og:description",
        content:
          "Academic management, performance analytics, risk detection and personalized AI recommendations in one modern portal.",
      },
    ],
  }),
  component: LandingPage,
});

const STATS = [
  { value: "1,248+", label: "Students", icon: Users },
  { value: "64+", label: "Teachers", icon: GraduationCap },
  { value: "38+", label: "Courses", icon: BookOpen },
  { value: "95%", label: "Engagement", icon: GaugeCircle },
];

const FEATURES = [
  {
    icon: Layers,
    title: "Academic Management",
    body: "Manage courses, classes, assignments, examinations and complete academic records from one place.",
  },
  {
    icon: CalendarCheck,
    title: "Smart Attendance",
    body: "Track attendance per subject and automatically surface attendance-related academic risks.",
  },
  {
    icon: ChartLine,
    title: "Performance Analytics",
    body: "Analyze assignments, examinations, grades and month-over-month academic progress.",
  },
  {
    icon: Sparkles,
    title: "AI Recommendations",
    body: "Generate personalized, explainable recommendations that improve academic performance.",
  },
];

const AI_FLOW = [
  { icon: Search, title: "Analyze", body: "Attendance, assignments, exam marks, subject scores and historical trends." },
  { icon: ShieldAlert, title: "Detect", body: "Weak subjects, academic risk levels and declining performance patterns." },
  { icon: Lightbulb, title: "Recommend", body: "Personalized study actions, practice plans and intervention suggestions." },
  { icon: TrendingUp, title: "Improve", body: "Measurable outcome improvement tracked across every assessment cycle." },
];

const STEPS = [
  { n: "01", title: "Manage Academic Data", body: "Students, courses, attendance, assignments and examinations stay structured and current." },
  { n: "02", title: "Analyze Performance", body: "Weighted scoring blends attendance, assignments and exams into one comparable metric." },
  { n: "03", title: "Identify Academic Risks", body: "Explainable rules flag high and moderate risk learners before results slip." },
  { n: "04", title: "Improve Student Outcomes", body: "Targeted recommendations and study plans close the identified gaps." },
];

function HeroVisual() {
  const bars = [
    { label: "Machine Learning", value: 86 },
    { label: "DBMS", value: 78 },
    { label: "Data Structures", value: 72 },
    { label: "Networks", value: 64 },
    { label: "Mathematics", value: 48 },
  ];
  return (
    <Card className="relative overflow-hidden shadow-lift">
      <div className="gradient-ai-subtle pointer-events-none absolute inset-0" aria-hidden />
      <CardContent className="relative space-y-5 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Student Overview
            </p>
            <p className="text-lg font-semibold text-foreground">Sanjay Sriram · 21CS001</p>
          </div>
          <AIBadge />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { k: "Attendance", v: "82%" },
            { k: "Avg. Score", v: "76%" },
            { k: "Grade", v: "A-" },
          ].map((s) => (
            <div key={s.k} className="rounded-xl border border-border bg-card/80 p-3">
              <p className="text-[11px] text-muted-foreground">{s.k}</p>
              <p className="mt-1 text-xl font-semibold text-foreground">{s.v}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3 rounded-xl border border-border bg-card/80 p-4">
          {bars.map((b) => (
            <div key={b.label}>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{b.label}</span>
                <span className={b.value < 50 ? "font-semibold text-destructive" : "font-semibold text-foreground"}>
                  {b.value}
                </span>
              </div>
              <Progress value={b.value} className="mt-1.5 h-1.5" />
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-ai/30 bg-ai/10 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Brain className="h-4 w-4 text-ai" /> AI Insight
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Mathematics detected as weakest subject · Risk level Moderate · 5 personalized
            recommendations generated.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function LandingPage() {
  const featured = getFeaturedCourses();

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid-backdrop absolute inset-0 opacity-40" aria-hidden />
        <div className="gradient-ai-subtle absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <AIBadge label="AI-powered academic intelligence" />
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl lg:text-6xl">
              Smart Education <span className="text-gradient-brand">Management Portal</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Manage academics, understand performance, and improve student outcomes with AI-powered
              academic intelligence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/courses">
                  Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Get Started</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              {["Students", "Academic Data", "AI Intelligence", "Better Outcomes"].map((s, i) => (
                <span key={s} className="flex items-center gap-3">
                  <span className="rounded-full border border-border bg-card px-3 py-1.5 font-medium text-foreground">
                    {s}
                  </span>
                  {i < 3 ? <ArrowRight className="h-4 w-4 text-primary" /> : null}
                </span>
              ))}
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <span className="rounded-2xl bg-primary/10 p-3 text-primary">
                <s.icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-2xl font-semibold text-foreground sm:text-3xl">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Core capabilities
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
            Everything an institution needs, in one portal
          </h2>
          <p className="mt-3 text-muted-foreground">
            Purpose-built modules for academic operations, connected to a shared analytics and
            intelligence layer.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <Card key={f.title} className="h-full transition-all hover:-translate-y-0.5 hover:shadow-lift">
              <CardContent className="p-6">
                <span className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* AI Academic Intelligence */}
      <section className="relative overflow-hidden border-y border-border bg-card">
        <div className="grid-backdrop absolute inset-0 opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <AIBadge label="AI Academic Intelligence" />
            <h2 className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
              An explainable intelligence engine for academics
            </h2>
            <p className="mt-3 text-muted-foreground">
              No black boxes. Every risk level, weak-subject flag and recommendation is derived from
              transparent academic performance analytics.
            </p>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-4">
            {AI_FLOW.map((step, i) => (
              <div key={step.title} className="relative">
                <Card className="h-full border-ai/25">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <span className="rounded-xl bg-ai/15 p-2.5 text-ai">
                        <step.icon className="h-5 w-5" />
                      </span>
                      <p className="text-lg font-semibold text-foreground">{step.title}</p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </CardContent>
                </Card>
                {i < AI_FLOW.length - 1 ? (
                  <ArrowRight className="absolute -bottom-3 left-1/2 h-5 w-5 -translate-x-1/2 rotate-90 text-primary lg:-right-5 lg:bottom-auto lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:rotate-0" />
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">The engine analyzes</h3>
                <ul className="mt-4 space-y-2.5">
                  {[
                    "Attendance across every enrolled subject",
                    "Assignment submission and evaluation performance",
                    "Examination marks and internal assessments",
                    "Subject-wise comparative performance",
                    "Historical monthly trends",
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {x}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-ai/25">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">And generates</h3>
                <ul className="mt-4 space-y-2.5">
                  {[
                    "Weak subject detection with thresholds",
                    "Academic risk levels (Low / Moderate / High)",
                    "Performance trends: Improving, Stable, Declining",
                    "Personalized recommendations per student",
                    "AI weekly study plans",
                  ].map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Target className="mt-0.5 h-4 w-4 shrink-0 text-ai" />
                      {x}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Featured courses
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
              Programs students are enrolling in
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/courses">
              Browse all courses <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">How it works</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="surface p-6">
                <p className="text-3xl font-semibold text-primary/30">{s.n}</p>
                <h3 className="mt-3 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="gradient-brand relative overflow-hidden rounded-3xl px-6 py-14 text-center shadow-lift sm:px-12">
          <div className="grid-backdrop absolute inset-0 opacity-20" aria-hidden />
          <h2 className="relative text-3xl font-semibold text-brand-foreground sm:text-4xl">
            Turn Academic Data Into Actionable Insights.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-brand-foreground/80">
            Launch the demo portals and follow one student from attendance to AI-generated study plan.
          </p>
          <div className="relative mt-8 flex justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/login">Start Learning</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
