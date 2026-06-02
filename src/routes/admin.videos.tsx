import { createFileRoute } from "@tanstack/react-router";
import { videosMock } from "@/lib/mock-data";
import { Eye, Trash2 } from "lucide-react";
export const Route = createFileRoute("/admin/videos")({ component: () => (
  <>
    <div className="glass rounded-2xl p-4 mb-5"><h1 className="text-xl font-extrabold gradient-text">إدارة الفيديوهات</h1></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{[...videosMock,...videosMock].map((v,i)=>(<div key={i} className="glass rounded-2xl overflow-hidden flex"><div className={`w-32 aspect-video bg-gradient-to-br ${v.gradient} grid place-items-center text-4xl shrink-0`}>{v.emoji}</div><div className="flex-1 p-3 min-w-0"><h3 className="font-bold text-sm line-clamp-2">{v.title}</h3><p className="text-xs text-muted-foreground mt-1">{v.channel} • {v.views}</p><div className="flex gap-1 mt-2"><button className="h-7 w-7 rounded-lg glass grid place-items-center"><Eye className="h-3 w-3" /></button><button className="h-7 w-7 rounded-lg glass grid place-items-center text-destructive"><Trash2 className="h-3 w-3" /></button></div></div></div>))}</div>
  </>
)});
