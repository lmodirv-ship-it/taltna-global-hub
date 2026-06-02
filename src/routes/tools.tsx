import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { toolsMock } from "@/lib/mock-data";
import { Sparkles, Image, FileText, Type, Search } from "lucide-react";

export const Route = createFileRoute("/tools")({ component: ToolsPage });

const cats = [
  { slug: "/tools/ai", icon: Sparkles, label: "ذكاء اصطناعي", color: "text-violet-400" },
  { slug: "/tools/image", icon: Image, label: "صور", color: "text-pink-400" },
  { slug: "/tools/pdf", icon: FileText, label: "PDF", color: "text-rose-400" },
  { slug: "/tools/text", icon: Type, label: "نصوص", color: "text-blue-400" },
  { slug: "/tools/seo", icon: Search, label: "SEO", color: "text-emerald-400" },
];

function ToolsPage() {
  return (
    <PageShell title="الأدوات المجانية" subtitle="أكثر من 100 أداة احترافية لاستخدامك اليومي" crumbs={[{ label: "الأدوات" }]}>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {cats.map(c => (
          <Link key={c.slug} to={c.slug} className="glass rounded-2xl p-5 text-center hover:border-primary/50 transition">
            <c.icon className={`h-8 w-8 mx-auto ${c.color}`} />
            <p className="font-bold mt-2 text-sm">{c.label}</p>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {toolsMock.map(t => (
          <Link key={t.slug} to="/tools/$slug" params={{ slug: t.slug }} className="glass rounded-2xl p-5 hover:border-primary/50 transition flex gap-4 items-start">
            <div className="text-4xl">{t.icon}</div>
            <div><h3 className="font-bold">{t.name}</h3><p className="text-xs text-muted-foreground mt-1">{t.desc}</p><p className="text-[10px] text-primary mt-2">{t.uses} استخدام</p></div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
