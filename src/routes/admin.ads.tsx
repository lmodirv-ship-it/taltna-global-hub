import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
export const Route = createFileRoute("/admin/ads")({ component: () => {
  const ads = [
    { name: "بانر الصفحة الرئيسية", impressions: "248K", clicks: "12.4K", ctr: "5.0%", status: "نشط" },
    { name: "إعلان بين المقالات", impressions: "184K", clicks: "8.2K", ctr: "4.4%", status: "نشط" },
    { name: "Sidebar Premium", impressions: "92K", clicks: "3.1K", ctr: "3.4%", status: "متوقف" },
  ];
  return (
    <>
      <div className="glass rounded-2xl p-4 mb-5 flex items-center justify-between"><h1 className="text-xl font-extrabold gradient-text">إدارة الإعلانات</h1><button className="btn-hero px-3 py-2 rounded-xl text-sm flex items-center gap-1"><Plus className="h-4 w-4" /> إعلان جديد</button></div>
      <div className="glass rounded-2xl overflow-x-auto"><table className="w-full text-sm"><thead className="text-xs text-muted-foreground border-b border-border"><tr><th className="text-right p-3">الإعلان</th><th>الظهور</th><th>النقرات</th><th>CTR</th><th>الحالة</th></tr></thead><tbody>{ads.map(a=>(<tr key={a.name} className="border-b border-border/50"><td className="p-3 font-bold">{a.name}</td><td className="text-center">{a.impressions}</td><td className="text-center">{a.clicks}</td><td className="text-center">{a.ctr}</td><td className="text-center"><span className={`text-xs ${a.status==="نشط"?"text-success":"text-muted-foreground"}`}>{a.status}</span></td></tr>))}</tbody></table></div>
    </>
  );
}});
