import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { TrendingUp, Eye, Heart, MessageSquare, PenLine, Upload, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

function Dashboard() {
  const stats = [
    { label: "إجمالي المشاهدات", value: "248.4K", change: "+12.4%", icon: Eye, color: "text-blue-400" },
    { label: "إعجابات", value: "18.2K", change: "+8.1%", icon: Heart, color: "text-rose-400" },
    { label: "تعليقات", value: "3.4K", change: "+24%", icon: MessageSquare, color: "text-emerald-400" },
    { label: "متابعون جدد", value: "+412", change: "+3.2%", icon: TrendingUp, color: "text-violet-400" },
  ];
  return (
    <PageShell title="لوحة التحكم" subtitle="نظرة عامة على نشاطك ومحتواك" crumbs={[{ label: "لوحة التحكم" }]}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map(s => (
          <div key={s.label} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between"><s.icon className={`h-6 w-6 ${s.color}`} /><span className="text-xs text-success">{s.change}</span></div>
            <p className="text-2xl font-extrabold mt-3">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8 glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="font-bold">الأداء آخر 30 يوم</h3><BarChart3 className="h-5 w-5 text-muted-foreground" /></div>
          <div className="h-64 flex items-end gap-1">{Array.from({length:30}).map((_,i)=>(<div key={i} className="flex-1 rounded-t btn-hero opacity-80" style={{height: `${20 + Math.sin(i/3)*40 + Math.random()*30}%`}} />))}</div>
        </div>
        <aside className="col-span-12 lg:col-span-4 space-y-4">
          <div className="glass rounded-2xl p-5">
            <h3 className="font-bold mb-3">إجراءات سريعة</h3>
            <div className="space-y-2">
              <Link to="/articles/new" className="flex items-center gap-2 glass px-3 py-2.5 rounded-xl text-sm hover:bg-secondary/40"><PenLine className="h-4 w-4" /> مقال جديد</Link>
              <Link to="/videos/upload" className="flex items-center gap-2 glass px-3 py-2.5 rounded-xl text-sm hover:bg-secondary/40"><Upload className="h-4 w-4" /> رفع فيديو</Link>
              <Link to="/questions/ask" className="flex items-center gap-2 glass px-3 py-2.5 rounded-xl text-sm hover:bg-secondary/40"><MessageSquare className="h-4 w-4" /> سؤال جديد</Link>
            </div>
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="font-bold mb-3">آخر النشاط</h3>
            <ul className="text-sm space-y-2">{["نشرت مقال جديد","علّق محمد على مقالك","ربحت 50 نقطة","وصلت للمستوى 22"].map(t=>(<li key={t} className="text-muted-foreground">• {t}</li>))}</ul>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
