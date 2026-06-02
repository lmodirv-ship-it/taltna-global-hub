import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { toolsMock } from "@/lib/mock-data";

export const Route = createFileRoute("/tools/ai")({ component: () => <ToolCategory cat="ai" title="أدوات الذكاء الاصطناعي" /> });

export function ToolCategory({ cat, title }: { cat: string; title: string }) {
  const list = toolsMock.filter(t => t.category === cat);
  return (
    <PageShell title={title} crumbs={[{ label: "الأدوات", to: "/tools" }, { label: title }]}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.concat(list).map((t, i) => (
          <Link key={i} to="/tools/$slug" params={{ slug: t.slug }} className="glass rounded-2xl p-5 hover:border-primary/50 transition flex gap-4">
            <div className="text-4xl">{t.icon}</div>
            <div><h3 className="font-bold">{t.name}</h3><p className="text-xs text-muted-foreground mt-1">{t.desc}</p></div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
