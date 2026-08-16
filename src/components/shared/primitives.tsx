import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, Inbox, Loader2, TrendingDown, TrendingUp, Minus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { RiskLevel, Trend } from "@/types";

export function PageHeader({
  title,
  description,
  actions,
  eyebrow,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">{title}</h1>
        {description ? (
          <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
  progress,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: React.ComponentType<{ className?: string }>;
  tone?: "default" | "success" | "warning" | "danger" | "ai";
  progress?: number;
}) {
  const tones: Record<string, string> = {
    default: "bg-primary/10 text-primary",
    success: "bg-success/12 text-success",
    warning: "bg-warning/15 text-warning",
    danger: "bg-destructive/12 text-destructive",
    ai: "bg-ai/15 text-ai",
  };
  return (
    <Card className="transition-shadow hover:shadow-lift">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
            {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
          </div>
          {Icon ? (
            <span className={cn("rounded-xl p-2.5", tones[tone])}>
              <Icon className="h-5 w-5" />
            </span>
          ) : null}
        </div>
        {typeof progress === "number" ? (
          <Progress value={progress} className="mt-4 h-1.5" />
        ) : null}
      </CardContent>
    </Card>
  );
}

export function RiskBadge({ level }: { level: RiskLevel }) {
  const map: Record<RiskLevel, string> = {
    Low: "border-success/30 bg-success/12 text-success",
    Moderate: "border-warning/40 bg-warning/15 text-warning",
    High: "border-destructive/30 bg-destructive/12 text-destructive",
  };
  return (
    <Badge variant="outline" className={cn("font-semibold", map[level])}>
      {level} Risk
    </Badge>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Pending: "border-warning/40 bg-warning/15 text-warning",
    Submitted: "border-primary/30 bg-primary/10 text-primary",
    Evaluated: "border-success/30 bg-success/12 text-success",
    Upcoming: "border-primary/30 bg-primary/10 text-primary",
    Completed: "border-success/30 bg-success/12 text-success",
    Active: "border-success/30 bg-success/12 text-success",
    Inactive: "border-border bg-muted text-muted-foreground",
  };
  return (
    <Badge variant="outline" className={cn("font-medium", map[status] ?? "")}>
      {status}
    </Badge>
  );
}

export function TrendPill({ trend }: { trend: Trend }) {
  const config = {
    Improving: { icon: TrendingUp, cls: "bg-success/12 text-success" },
    Stable: { icon: Minus, cls: "bg-primary/10 text-primary" },
    Declining: { icon: TrendingDown, cls: "bg-destructive/12 text-destructive" },
  }[trend];
  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        config.cls,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {trend}
    </span>
  );
}

export function AIBadge({ label = "AI Powered" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ai/30 bg-ai/12 px-2.5 py-1 text-xs font-semibold text-ai">
      <Sparkles className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-14 text-center">
      <span className="rounded-full bg-muted p-3 text-muted-foreground">
        <Inbox className="h-6 w-6" />
      </span>
      <p className="mt-4 font-medium text-foreground">{title}</p>
      {description ? (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function LoadingState({ label = "Loading academic data…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-14 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      {label}
    </div>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-base">{title}</CardTitle>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function RecommendationCard({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li
          key={item}
          className="flex gap-3 rounded-xl border border-border bg-card/60 p-3 text-sm text-foreground transition-colors hover:border-ai/40"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-ai/15 text-xs font-bold text-ai">
            {i + 1}
          </span>
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProgressCard({
  label,
  value,
  caption,
  warn,
}: {
  label: string;
  value: number;
  caption?: string;
  warn?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4",
        warn && "border-destructive/40 bg-destructive/5",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <span
          className={cn(
            "text-sm font-semibold",
            warn ? "text-destructive" : "text-foreground",
          )}
        >
          {value}%
        </span>
      </div>
      <Progress value={value} className="mt-3 h-2" />
      {caption ? <p className="mt-2 text-xs text-muted-foreground">{caption}</p> : null}
    </div>
  );
}

export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="text-sm font-medium text-primary hover:underline">
      ← {label}
    </Link>
  );
}
