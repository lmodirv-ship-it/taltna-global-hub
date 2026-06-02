import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { forumsMock, topicsMock } from "@/lib/mock-data";
import { Users, MessageSquare, Plus, Flame } from "lucide-react";

export const Route = createFileRoute("/forums")({ component: ForumsPage });

function ForumsPage() {
  return (
    <PageShell title="المنتديات" subtitle="مجتمع نقاشي حقيقي يضم أكثر من 500 ألف عضو" crumbs={[{ label: "المنتديات" }]}
      actions={<Link to="/forums/new" className="btn-hero px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><Plus className="h-4 w-4" /> موضوع جديد</Link>}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {forumsMock.map((f) => (
          <Link key={f.slug} to="/forums/$category" params={{ category: f.slug }} className="glass rounded-2xl p-5 flex items-center gap-4 hover:border-primary/50 transition">
            <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${f.color} grid place-items-center text-3xl shrink-0`}>{f.emoji}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold">{f.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-1">{f.desc}</p>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-1">
                <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {f.topics.toLocaleString()} موضوع</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {f.members}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <section className="glass rounded-2xl p-5">
        <h2 className="font-bold mb-4 flex items-center gap-2"><Flame className="h-5 w-5 text-orange-400" /> النقاشات الأكثر سخونة</h2>
        <ul className="divide-y divide-border">
          {topicsMock.map((t) => (
            <li key={t.id} className="py-3">
              <Link to="/forums/topic/$id" params={{ id: t.id }} className="flex items-center justify-between gap-3 hover:text-primary">
                <span className="font-medium truncate">{t.title}</span>
                <span className="text-xs text-muted-foreground shrink-0">{t.replies} ردود • {t.views}</span>
              </Link>
              <p className="text-xs text-muted-foreground mt-1">بواسطة {t.author} • {t.time}</p>
            </li>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
