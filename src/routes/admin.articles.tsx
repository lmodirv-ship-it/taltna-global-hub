import { createFileRoute } from "@tanstack/react-router";
import { articlesMock } from "@/lib/mock-data";
import { Edit, Trash2, Eye } from "lucide-react";
export const Route = createFileRoute("/admin/articles")({ component: AdminArticles });
function AdminArticles() {
  return (
    <>
      <div className="glass rounded-2xl p-4 mb-5"><h1 className="text-xl font-extrabold gradient-text">إدارة المقالات</h1></div>
      <div className="glass rounded-2xl divide-y divide-border">{[...articlesMock,...articlesMock].map((a,i)=>(<div key={i} className="flex items-center gap-3 p-4"><div className={`h-12 w-16 rounded-lg bg-gradient-to-br ${a.gradient} grid place-items-center text-2xl shrink-0`}>{a.emoji}</div><div className="flex-1 min-w-0"><h3 className="font-bold truncate">{a.title}</h3><p className="text-xs text-muted-foreground">{a.author} • {a.reads} قراءة</p></div><div className="flex gap-1"><button className="h-8 w-8 rounded-lg glass grid place-items-center"><Eye className="h-4 w-4" /></button><button className="h-8 w-8 rounded-lg glass grid place-items-center"><Edit className="h-4 w-4" /></button><button className="h-8 w-8 rounded-lg glass grid place-items-center text-destructive"><Trash2 className="h-4 w-4" /></button></div></div>))}</div>
    </>
  );
}
