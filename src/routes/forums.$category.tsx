import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { forumsMock, topicsMock } from "@/lib/mock-data";
import { Plus, Pin } from "lucide-react";

export const Route = createFileRoute("/forums/$category")({ component: ForumCategory });

function ForumCategory() {
  const { category } = Route.useParams();
  const f = forumsMock.find((x) => x.slug === category) ?? forumsMock[0];
  return (
    <PageShell title={f.name} subtitle={f.desc} crumbs={[{ label: "المنتديات", to: "/forums" }, { label: f.name }]}
      actions={<Link to="/forums/new" className="btn-hero px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><Plus className="h-4 w-4" /> موضوع جديد</Link>}>
      <div className="glass rounded-2xl divide-y divide-border">
        {[...topicsMock, ...topicsMock].map((t, i) => (
          <Link key={i} to="/forums/topic/$id" params={{ id: t.id }} className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition">
            {i < 2 && <Pin className="h-4 w-4 text-primary" />}
            <div className="h-10 w-10 rounded-full ring-gold p-[2px] shrink-0"><div className="h-full w-full rounded-full bg-card grid place-items-center font-bold text-sm">{t.author[0]}</div></div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold truncate">{t.title}</h3>
              <p className="text-xs text-muted-foreground">{t.author} • {t.time}</p>
            </div>
            <div className="text-center text-xs text-muted-foreground shrink-0">
              <div className="font-bold text-foreground">{t.replies}</div><div>ردود</div>
            </div>
            <div className="text-center text-xs text-muted-foreground shrink-0 hidden sm:block">
              <div className="font-bold text-foreground">{t.views}</div><div>مشاهدة</div>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
