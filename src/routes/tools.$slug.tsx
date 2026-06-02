import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { toolsMock } from "@/lib/mock-data";
import { Zap } from "lucide-react";

export const Route = createFileRoute("/tools/$slug")({ component: ToolPage });

function ToolPage() {
  const { slug } = Route.useParams();
  const t = toolsMock.find(x => x.slug === slug) ?? toolsMock[0];
  return (
    <PageShell title={t.name} subtitle={t.desc} crumbs={[{ label: "الأدوات", to: "/tools" }, { label: t.name }]}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8 glass rounded-2xl p-6 min-h-[500px]">
          <div className="text-7xl text-center mb-6">{t.icon}</div>
          <div className="space-y-4 max-w-2xl mx-auto">
            <textarea placeholder="ألصق المحتوى هنا أو اسحب الملف..." className="w-full bg-secondary/40 rounded-xl p-4 min-h-[200px] outline-none" />
            <div className="grid grid-cols-2 gap-3">
              <select className="bg-secondary rounded-xl px-3 py-2.5"><option>اللغة العربية</option><option>English</option><option>Français</option></select>
              <select className="bg-secondary rounded-xl px-3 py-2.5"><option>جودة عالية</option><option>سرعة عالية</option></select>
            </div>
            <button className="w-full btn-hero py-3 rounded-xl font-bold flex items-center justify-center gap-2"><Zap className="h-4 w-4" /> تنفيذ الآن</button>
          </div>
        </div>
        <aside className="col-span-12 lg:col-span-4 space-y-4">
          <div className="glass rounded-2xl p-5"><h3 className="font-bold mb-2">عن الأداة</h3><p className="text-sm text-muted-foreground">{t.desc} — تم استخدامها {t.uses} مرة من قبل آلاف المستخدمين حول العالم.</p></div>
          <div className="glass rounded-2xl p-5"><h3 className="font-bold mb-2">أدوات مشابهة</h3><ul className="space-y-2 text-sm">{toolsMock.filter(x=>x.category===t.category && x.slug!==t.slug).slice(0,4).map(x=> <li key={x.slug}>{x.icon} {x.name}</li>)}</ul></div>
        </aside>
      </div>
    </PageShell>
  );
}
