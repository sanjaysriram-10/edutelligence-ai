import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/shared/primitives";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — EduIntelli" },
      {
        name: "description",
        content:
          "How EduIntelli handles student academic records, attendance data and AI-generated performance insights.",
      },
      { property: "og:title", content: "Privacy Policy — EduIntelli" },
      {
        property: "og:description",
        content: "Data handling for academic records, attendance and AI performance insights.",
      },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  {
    title: "Academic data we process",
    body: "EduIntelli processes enrolment details, attendance records, assignment submissions, examination marks and derived performance metrics for enrolled learners.",
  },
  {
    title: "How AI insights are produced",
    body: "Risk levels, weak-subject detection and recommendations are computed from transparent, rule-based academic analytics. No external language model receives student records, and no automated decision replaces faculty judgement.",
  },
  {
    title: "Access control",
    body: "Students see only their own records. Teachers see learners in their assigned courses. Administrators see institution-level aggregates and manage academic records.",
  },
  {
    title: "Retention",
    body: "Academic records are retained for the statutory period defined by the institution. Derived analytics are recomputed each assessment cycle and are never used for purposes outside academic support.",
  },
  {
    title: "Demo environment",
    body: "This deployment runs on seeded demonstration data stored in the browser session only. No personal information is transmitted or stored on a server.",
  },
];

function PrivacyPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated: August 2026" />
        <div className="mt-8 space-y-4">
          {SECTIONS.map((s) => (
            <Card key={s.title}>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
