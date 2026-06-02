import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { CreditCard, Download } from "lucide-react";

export const Route = createFileRoute("/subscriptions")({ component: Subs });

function Subs() {
  return (
    <PageShell title="اشتراكاتي" crumbs={[{ label: "الاشتراكات" }]}>
      <div className="glass rounded-2xl p-5 mb-4 flex items-center justify-between flex-wrap gap-3">
        <div><p className="text-sm text-muted-foreground">الخطة الحالية</p><h2 className="text-2xl font-extrabold gradient-text">Pro</h2><p className="text-xs text-muted-foreground mt-1">تتجدد في 15 مارس 2026</p></div>
        <div className="flex gap-2"><button className="glass px-4 py-2 rounded-xl text-sm">تغيير الخطة</button><button className="px-4 py-2 rounded-xl text-sm text-destructive">إلغاء</button></div>
      </div>
      <div className="glass rounded-2xl p-5 mb-4">
        <h3 className="font-bold mb-3 flex items-center gap-2"><CreditCard className="h-4 w-4" /> وسائل الدفع</h3>
        <div className="flex items-center gap-3 bg-secondary/40 rounded-xl p-3"><div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-purple-600" /><div><p className="text-sm font-bold">•••• 4242</p><p className="text-xs text-muted-foreground">ينتهي 12/27</p></div></div>
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="font-bold mb-3">سجل الفواتير</h3>
        <ul className="divide-y divide-border">{Array.from({length:6}).map((_,i)=>(<li key={i} className="flex justify-between py-3"><span className="text-sm">فاتورة #{2026-i*1000+i} • {15-i}/02/2026</span><span className="flex items-center gap-3 text-sm"><span className="text-muted-foreground">$29.00</span><button className="text-primary"><Download className="h-4 w-4" /></button></span></li>))}</ul>
      </div>
    </PageShell>
  );
}
