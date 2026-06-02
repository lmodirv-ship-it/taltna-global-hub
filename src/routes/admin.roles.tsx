import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
export const Route = createFileRoute("/admin/roles")({ component: () => {
  const perms = ["إنشاء مقال","نشر مباشر","حذف تعليقات","حظر مستخدم","إدارة المشرفين","الوصول للإعدادات","إدارة المالية"];
  const roles = [["Admin",[true,true,true,true,true,true,true]],["Moderator",[true,true,true,true,false,false,false]],["Creator",[true,false,false,false,false,false,false]],["User",[true,false,false,false,false,false,false]]];
  return (
    <>
      <div className="glass rounded-2xl p-4 mb-5"><h1 className="text-xl font-extrabold gradient-text">الصلاحيات والأدوار</h1></div>
      <div className="glass rounded-2xl overflow-x-auto"><table className="w-full text-sm"><thead className="text-xs border-b border-border"><tr><th className="text-right p-3">الصلاحية</th>{roles.map(([r])=>(<th key={r as string} className="p-3">{r}</th>))}</tr></thead><tbody>{perms.map((p,i)=>(<tr key={p} className="border-b border-border/50"><td className="p-3 font-medium">{p}</td>{roles.map(([r,arr]:any)=>(<td key={r} className="p-3 text-center">{arr[i]?<Check className="h-4 w-4 text-success mx-auto" />:<X className="h-4 w-4 text-muted-foreground mx-auto" />}</td>))}</tr>))}</tbody></table></div>
    </>
  );
}});
