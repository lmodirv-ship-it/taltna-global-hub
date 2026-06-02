import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { articlesMock } from "@/lib/mock-data";
import { useAuth } from "@/hooks/use-auth";
import { Crown, MapPin, Link as LIcon, Calendar } from "lucide-react";

export const Route = createFileRoute("/profile")({ component: Profile });

function Profile() {
  const { user } = useAuth();
  const name = user?.email?.split("@")[0] ?? "ضيف";
  return (
    <PageShell title="الملف الشخصي" crumbs={[{ label: "الملف الشخصي" }]}>
      <div className="glass rounded-2xl overflow-hidden mb-5">
        <div className="h-40 bg-gradient-to-r from-violet-700 via-indigo-700 to-blue-700" />
        <div className="p-5 -mt-12">
          <div className="flex items-end gap-4 flex-wrap">
            <div className="h-24 w-24 rounded-2xl ring-gold p-[3px]"><div className="h-full w-full rounded-xl bg-card grid place-items-center text-3xl font-extrabold">{name[0]?.toUpperCase()}</div></div>
            <div className="flex-1 mt-12">
              <div className="flex items-center gap-2"><h2 className="text-xl font-extrabold">{name}</h2><Crown className="h-5 w-5 text-gold" /><span className="text-xs px-2 py-0.5 rounded-md bg-success/20 text-success">موثّق ✓</span></div>
              <p className="text-sm text-muted-foreground">@{name} • كاتب ومطوّر</p>
              <div className="flex gap-4 text-xs text-muted-foreground mt-2"><span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> الرياض</span><span className="flex items-center gap-1"><LIcon className="h-3 w-3" /> taltna.global/u</span><span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> انضم يناير 2025</span></div>
            </div>
            <div className="mt-12 flex gap-2"><button className="btn-hero px-4 py-2 rounded-xl text-sm font-bold">متابعة</button><button className="glass px-4 py-2 rounded-xl text-sm">رسالة</button></div>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-5">{[["مقالات","87"],["متابعون","12.4K"],["متابَع","234"],["النقاط","8.5K"]].map(([l,v])=>(<div key={l} className="text-center bg-secondary/40 rounded-xl py-3"><div className="text-xl font-extrabold gradient-text">{v}</div><div className="text-xs text-muted-foreground">{l}</div></div>))}</div>
        </div>
      </div>
      <div className="flex gap-2 mb-4">{["المقالات","الفيديوهات","الأسئلة","النشاط"].map((t,i)=>(<button key={t} className={`px-4 py-2 rounded-xl text-sm ${i===0?"btn-hero":"glass"}`}>{t}</button>))}</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{articlesMock.slice(0,6).map(a=>(<div key={a.id} className="glass rounded-2xl overflow-hidden"><div className={`aspect-video bg-gradient-to-br ${a.gradient} grid place-items-center text-5xl`}>{a.emoji}</div><div className="p-3"><h3 className="font-bold text-sm line-clamp-2">{a.title}</h3></div></div>))}</div>
    </PageShell>
  );
}
