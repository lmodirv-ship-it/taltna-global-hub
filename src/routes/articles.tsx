import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { articlesMock } from "@/lib/mock-data";
import { Clock, Eye, PenLine, Filter } from "lucide-react";

export const Route = createFileRoute("/articles")({
  head: () => ({ meta: [{ title: "المقالات — Taltna Global" }] }),
  component: ArticlesPage,
});

function ArticlesPage() {
  const tags = ["الكل", "تكنولوجيا", "أعمال", "تطوير الذات", "برمجة", "تصميم", "صحة", "ريادة"];
  return (
    <PageShell title="المقالات" subtitle="آلاف المقالات من مبدعين عرب وعالميين" crumbs={[{ label: "المقالات" }]}
      actions={<Link to="/articles/new" className="btn-hero px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><PenLine className="h-4 w-4" /> اكتب مقالاً</Link>}>
      <div className="glass rounded-2xl p-4 mb-5 flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {tags.map((t, i) => (
          <button key={t} className={`px-3 py-1.5 rounded-full text-xs font-medium ${i === 0 ? "btn-hero" : "bg-secondary hover:bg-secondary/70"}`}>{t}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...articlesMock, ...articlesMock].map((a, i) => (
          <Link key={i} to="/articles/$slug" params={{ slug: a.id }} className="glass rounded-2xl overflow-hidden hover:border-primary/50 transition group">
            <div className={`relative aspect-video bg-gradient-to-br ${a.gradient} grid place-items-center`}>
              <span className="text-6xl">{a.emoji}</span>
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-background/80 text-[10px] font-bold">{a.tag}</span>
            </div>
            <div className="p-4 space-y-3">
              <h3 className="font-bold leading-snug line-clamp-2 group-hover:text-primary">{a.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{a.excerpt}</p>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border">
                <span>{a.author}</span>
                <span className="flex items-center gap-3"><Clock className="h-3 w-3 inline" /> {a.time} <Eye className="h-3 w-3 inline" /> {a.reads}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
