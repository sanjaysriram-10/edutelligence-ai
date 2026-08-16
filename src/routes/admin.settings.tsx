import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader, SectionCard } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Institution Settings — EduIntelli Admin" },
      { name: "description", content: "Configure academic thresholds, attendance minimums and AI risk detection parameters." },
      { property: "og:title", content: "Institution Settings — EduIntelli Admin" },
      { property: "og:description", content: "Configure academic thresholds, attendance minimums and AI risk detection parameters." },
    ],
  }),
  component: AdminSettings,
});

function AdminSettings() {
  const toggles = [
    { id: "risk", label: "Enable AI risk detection", desc: "Flag high and moderate risk learners automatically each cycle." },
    { id: "alerts", label: "Attendance alerts", desc: "Notify mentors when attendance drops below the configured minimum." },
    { id: "plans", label: "AI study plans", desc: "Generate weekly study plans for students with weak subjects." },
  ];
  return (
    <>
      <PageHeader eyebrow="Administrator portal" title="Settings" description="Academic thresholds and AI engine configuration." />
      <SectionCard title="Academic thresholds" description="Used by the AI intelligence engine">
        <form
          className="grid gap-4 sm:grid-cols-3"
          onSubmit={(e) => { e.preventDefault(); toast.success("Settings saved successfully."); }}
        >
          <div className="space-y-2"><Label htmlFor="att">Minimum attendance (%)</Label><Input id="att" type="number" defaultValue="75" /></div>
          <div className="space-y-2"><Label htmlFor="weak">Weak subject threshold (%)</Label><Input id="weak" type="number" defaultValue="50" /></div>
          <div className="space-y-2"><Label htmlFor="risk">High-risk score cutoff (%)</Label><Input id="risk" type="number" defaultValue="45" /></div>
          <div className="sm:col-span-3"><Button type="submit">Save settings</Button></div>
        </form>
      </SectionCard>
      <SectionCard title="AI engine" description="Feature toggles">
        <div className="space-y-3">
          {toggles.map((t) => (
            <div key={t.id} className="flex items-start justify-between gap-4 rounded-xl border border-border p-4">
              <div>
                <p className="text-sm font-medium text-foreground">{t.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
              </div>
              <Switch defaultChecked onCheckedChange={() => toast.success("Preference updated.")} />
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
