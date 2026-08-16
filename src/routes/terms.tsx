import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/shared/primitives";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — EduIntelli" },
      {
        name: "description",
        content:
          "Terms governing use of the EduIntelli education management portal, its academic records and AI academic intelligence features.",
      },
      { property: "og:title", content: "Terms of Use — EduIntelli" },
      {
        property: "og:description",
        content: "Acceptable use of academic records, portals and AI insight features.",
      },
    ],
  }),
  component: TermsPage,
});

const SECTIONS = [
  {
    title: "Portal access",
    body: "Accounts are issued by the institution and are personal. Sharing credentials or accessing records belonging to another learner is prohibited.",
  },
  {
    title: "Academic integrity",
    body: "Assignment submissions must be original work. Detected malpractice is escalated to the examination cell as per institutional policy.",
  },
  {
    title: "Nature of AI insights",
    body: "AI academic intelligence is advisory. Risk levels and recommendations support faculty decisions; they do not constitute official academic determinations or final grades.",
  },
  {
    title: "Availability",
    body: "Scheduled maintenance is announced in advance. Examination-period downtime is avoided wherever operationally possible.",
  },
  {
    title: "Demonstration use",
    body: "This build is a demonstration of the platform using seeded academic data and is not intended for production record keeping.",
  },
];

function TermsPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <PageHeader eyebrow="Legal" title="Terms of Use" description="Last updated: August 2026" />
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
