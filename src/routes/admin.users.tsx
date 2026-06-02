import { createFileRoute } from "@tanstack/react-router";
import { usersMock } from "@/lib/mock-data";
import { Search, MoreVertical } from "lucide-react";

export const Route = createFileRoute("/admin/users")({ component: AdminUsers });

function AdminUsers() {
  return (
    <>
      <div className="glass rounded-2xl p-4 mb-5 flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-extrabold gradient-text">إدارة المستخدمين</h1>
        <div className="relative"><Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><input placeholder="بحث..." className="bg-secondary rounded-xl pr-10 py-2 text-sm outline-none" /></div>
      </div>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground border-b border-border"><tr><th className="text-right p-3">المستخدم</th><th className="text-right p-3">الدور</th><th className="text-right p-3">السمعة</th><th className="text-right p-3">المقالات</th><th className="text-right p-3">الحالة</th><th></th></tr></thead>
          <tbody>{[...usersMock,...usersMock].map((u,i)=>(<tr key={i} className="border-b border-border/50 hover:bg-secondary/30"><td className="p-3 flex items-center gap-3"><div className="h-9 w-9 rounded-full ring-gold p-[2px]"><div className="h-full w-full rounded-full bg-card grid place-items-center text-xs font-bold">{u.name[0]}</div></div><div><p className="font-bold">{u.name}</p><p className="text-xs text-muted-foreground">@{u.username}</p></div></td><td className="p-3"><span className="px-2 py-0.5 rounded-md bg-primary/15 text-primary text-xs">{u.role}</span></td><td className="p-3">{u.reputation}</td><td className="p-3">{u.articles}</td><td className="p-3"><span className={`text-xs ${u.status==="نشط"?"text-success":"text-destructive"}`}>{u.status}</span></td><td className="p-3"><button><MoreVertical className="h-4 w-4 text-muted-foreground" /></button></td></tr>))}</tbody>
        </table>
      </div>
    </>
  );
}
