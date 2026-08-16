import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/shared/primitives";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact the EduIntelli Academic Office" },
      {
        name: "description",
        content:
          "Reach the EduIntelli academic office for admissions, portal access, faculty coordination or institutional onboarding support.",
      },
      { property: "og:title", content: "Contact the EduIntelli Academic Office" },
      {
        property: "og:description",
        content: "Admissions, portal access and institutional onboarding enquiries.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    toast.success("Message sent successfully.", {
      description: "The academic office typically responds within one working day.",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const details = [
    { icon: Mail, label: "Email", value: "academics@eduintelli.edu.in" },
    { icon: Phone, label: "Phone", value: "+91 44 4000 1248" },
    { icon: MapPin, label: "Campus", value: "EduIntelli Institute, Taramani, Chennai 600113" },
  ];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Contact"
          title="Talk to the academic office"
          description="Questions about admissions, portal access or institutional onboarding? Send a message."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card>
            <CardContent className="p-6">
              <form className="grid gap-4 sm:grid-cols-2" onSubmit={submit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Sanjay Sriram"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cemail">Email</Label>
                  <Input
                    id="cemail"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Portal access for our department"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what you need…"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit">Send message</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {details.map((d) => (
              <Card key={d.label}>
                <CardContent className="flex items-start gap-3 p-5">
                  <span className="rounded-xl bg-primary/10 p-2.5 text-primary">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{d.label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">{d.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="border-ai/25">
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-foreground">Office hours</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Monday – Friday, 09:00 – 17:00 IST. Examination cell open until 19:00 during
                  assessment weeks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
