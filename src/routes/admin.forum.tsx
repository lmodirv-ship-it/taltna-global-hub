import { createFileRoute } from "@tanstack/react-router";
import { forumsMock } from "@/lib/mock-data";
export const Route = createFileRoute("/admin/forum")({ component: () => (
  <>
    <div className="glass rounded-2xl p-4 mb-5"><h1 className="text-xl font-extrabold gradient-text">إدارة المنتدى</h1></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{forumsMock.map(f=>(<div key={f.slug} className="glass rounded-2xl p-4 flex items-center gap-3"><div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${f.color} grid place-items-center text-2xl`}>{f.emoji}</div><div className="flex-1"><h3 className="font-bold">{f.name}</h3><p className="text-xs text-muted-foreground">{f.topics} موضوع • {f.members}</p></div><button className="text-xs text-primary">تعديل</button></div>))}</div>
  </>
)});
