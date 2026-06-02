import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
export const Route = createFileRoute("/admin/reports")({ component: () => {
  const reports = [
    { id: 4892, type: "تعليق مسيء", target: "نقاش #t2", reporter: "محمد ع.", time: "منذ 10 د" },
    { id: 4891, type: "محتوى مكرر", target: "مقال \"7 عادات\"", reporter: "نور", time: "منذ ساعة" },
    { id: 4889, type: "انتحال هوية", target: "حساب @fake_dev", reporter: "Ahmed", time: "منذ 3 ساعات" },
    { id: 4888, type: "محتوى غير لائق", target: "فيديو v4", reporter: "Lina", time: "أمس" },
  ];
  return (
    <>
      <div className="glass rounded-2xl p-4 mb-5"><h1 className="text-xl font-extrabold gradient-text">البلاغات</h1></div>
      <div className="glass rounded-2xl divide-y divide-border">{reports.map(r=>(<div key={r.id} className="p-4 flex items-center gap-3"><div className="flex-1"><div className="flex items-center gap-2"><span className="text-xs px-2 py-0.5 rounded bg-destructive/15 text-destructive">{r.type}</span><span className="text-xs text-muted-foreground">#{r.id}</span></div><p className="mt-1">{r.target}</p><p className="text-xs text-muted-foreground">بلّغ بواسطة {r.reporter} • {r.time}</p></div><button className="h-8 w-8 rounded-lg bg-success/20 text-success grid place-items-center"><Check className="h-4 w-4" /></button><button className="h-8 w-8 rounded-lg bg-destructive/20 text-destructive grid place-items-center"><X className="h-4 w-4" /></button></div>))}</div>
    </>
  );
}});
