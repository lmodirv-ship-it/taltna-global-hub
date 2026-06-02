import { createFileRoute } from "@tanstack/react-router";
import { Check, X, BadgeCheck } from "lucide-react";
export const Route = createFileRoute("/admin/verification")({ component: () => {
  const reqs = [
    { name: "محمد العتيبي", username: "mohamed_o", type: "كاتب", followers: "12.4K", reason: "كاتب نشط ومحتوى تقني عالي الجودة" },
    { name: "Layla Saba7", username: "layla_s", type: "مؤثر", followers: "45K", reason: "ريادة أعمال — تأسيس شركتين ناجحتين" },
    { name: "د. أحمد العلي", username: "dr_ahmed", type: "خبير", followers: "8.2K", reason: "دكتوراه في علوم الحاسوب" },
  ];
  return (
    <>
      <div className="glass rounded-2xl p-4 mb-5"><h1 className="text-xl font-extrabold gradient-text flex items-center gap-2"><BadgeCheck className="h-6 w-6" /> طلبات التوثيق</h1></div>
      <div className="space-y-3">{reqs.map(r=>(<div key={r.username} className="glass rounded-2xl p-5"><div className="flex items-start gap-3"><div className="h-12 w-12 rounded-full ring-gold p-[2px]"><div className="h-full w-full rounded-full bg-card grid place-items-center font-bold">{r.name[0]}</div></div><div className="flex-1"><p className="font-bold">{r.name}</p><p className="text-xs text-muted-foreground">@{r.username} • {r.type} • {r.followers} متابع</p><p className="text-sm mt-2">{r.reason}</p></div><div className="flex gap-1"><button className="h-9 w-9 rounded-lg bg-success/20 text-success grid place-items-center"><Check className="h-4 w-4" /></button><button className="h-9 w-9 rounded-lg bg-destructive/20 text-destructive grid place-items-center"><X className="h-4 w-4" /></button></div></div></div>))}</div>
    </>
  );
}});
