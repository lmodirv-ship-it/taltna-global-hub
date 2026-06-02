import { createFileRoute } from "@tanstack/react-router";
import { toolsMock } from "@/lib/mock-data";
import { Plus } from "lucide-react";
export const Route = createFileRoute("/admin/tools")({ component: () => (
  <>
    <div className="glass rounded-2xl p-4 mb-5 flex items-center justify-between"><h1 className="text-xl font-extrabold gradient-text">إدارة الأدوات</h1><button className="btn-hero px-3 py-2 rounded-xl text-sm flex items-center gap-1"><Plus className="h-4 w-4" /> أداة جديدة</button></div>
    <div className="glass rounded-2xl divide-y divide-border">{toolsMock.map(t=>(<div key={t.slug} className="flex items-center gap-3 p-4"><div className="text-3xl">{t.icon}</div><div className="flex-1"><h3 className="font-bold">{t.name}</h3><p className="text-xs text-muted-foreground">{t.desc}</p></div><span className="text-xs px-2 py-0.5 rounded bg-primary/15 text-primary">{t.uses}</span></div>))}</div>
  </>
)});
