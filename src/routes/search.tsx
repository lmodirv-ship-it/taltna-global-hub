import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { articlesMock, videosMock, questionsMock } from "@/lib/mock-data";
import { Search as SIcon } from "lucide-react";

export const Route = createFileRoute("/search")({ component: SearchPage });

function SearchPage() {
  return (
    <PageShell title="البحث" subtitle="ابحث في مقالات، فيديوهات، أسئلة، وأعضاء" crumbs={[{ label: "البحث" }]}>
      <div className="glass rounded-2xl p-4 mb-5 relative">
        <SIcon className="absolute right-7 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input autoFocus placeholder="ابحث عن أي شيء..." className="w-full bg-secondary rounded-xl pr-12 py-3 text-lg outline-none" />
      </div>
      <div className="flex gap-2 mb-5">{["الكل","مقالات","فيديوهات","أسئلة","أعضاء"].map((t,i)=>(<button key={t} className={`px-4 py-2 rounded-xl text-sm ${i===0?"btn-hero":"glass"}`}>{t}</button>))}</div>
      <h3 className="font-bold mb-3">المقالات</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">{articlesMock.slice(0,3).map(a=>(<Link key={a.id} to="/articles/$slug" params={{slug:a.id}} className="glass rounded-2xl p-4 hover:border-primary/50"><div className={`h-24 rounded-xl bg-gradient-to-br ${a.gradient} grid place-items-center text-4xl mb-2`}>{a.emoji}</div><h4 className="font-bold text-sm line-clamp-2">{a.title}</h4></Link>))}</div>
      <h3 className="font-bold mb-3">الفيديوهات</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">{videosMock.slice(0,3).map(v=>(<Link key={v.id} to="/videos/$id" params={{id:v.id}} className="glass rounded-2xl p-4 hover:border-primary/50"><div className={`h-24 rounded-xl bg-gradient-to-br ${v.gradient} grid place-items-center text-4xl mb-2`}>{v.emoji}</div><h4 className="font-bold text-sm line-clamp-2">{v.title}</h4></Link>))}</div>
      <h3 className="font-bold mb-3">الأسئلة</h3>
      <div className="glass rounded-2xl divide-y divide-border">{questionsMock.slice(0,3).map(q=>(<Link key={q.id} to="/questions/$id" params={{id:q.id}} className="block p-4 hover:bg-secondary/30"><h4 className="font-bold text-sm">{q.title}</h4><p className="text-xs text-muted-foreground mt-1">{q.answers} إجابات</p></Link>))}</div>
    </PageShell>
  );
}
