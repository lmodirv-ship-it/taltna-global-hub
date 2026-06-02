import { createFileRoute } from "@tanstack/react-router";
import { usersMock } from "@/lib/mock-data";
import { UserPlus, Shield } from "lucide-react";
export const Route = createFileRoute("/admin/moderators")({ component: () => {
  const mods = usersMock.filter(u=>u.role==="Moderator"||u.role==="Admin");
  return (
    <>
      <div className="glass rounded-2xl p-4 mb-5 flex justify-between items-center"><h1 className="text-xl font-extrabold gradient-text">نظام المشرفين</h1><button className="btn-hero px-3 py-2 rounded-xl text-sm flex items-center gap-1"><UserPlus className="h-4 w-4" /> إضافة مشرف</button></div>
      <div className="glass rounded-2xl divide-y divide-border">{mods.map(m=>(<div key={m.username} className="p-4 flex items-center gap-3"><div className="h-10 w-10 rounded-full ring-gold p-[2px]"><div className="h-full w-full rounded-full bg-card grid place-items-center font-bold">{m.name[0]}</div></div><div className="flex-1"><p className="font-bold flex items-center gap-1">{m.name} <Shield className="h-3 w-3 text-primary" /></p><p className="text-xs text-muted-foreground">@{m.username} • {m.role}</p></div><button className="text-xs text-destructive">إزالة</button></div>))}</div>
    </>
  );
}});
