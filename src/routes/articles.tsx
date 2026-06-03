import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/site/PageShell";
import { articlesListQuery, authorName, timeAgo, type ArticleRow } from "@/lib/articles";
import { Clock, Eye, PenLine, Filter } from "lucide-react";

export const Route = createFileRoute("/articles")({
  head: () => ({ meta: [{ title: "المقالات — Taltna Global" }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(articlesListQuery(60)),
  component: ArticlesPage,
  errorComponent: ({ error }) => (
    <PageShell title="المقالات" crumbs={[{ label: "المقالات" }]}>
      <div className="glass rounded-2xl p-6 text-sm text-destructive">تعذر تحميل المقالات: {error.message}</div>
    </PageShell>
  ),
});

const GRADIENTS = [
  "from-indigo-600 to-blue-700",
  "from-emerald-600 to-teal-700",
  "from-rose-600 to-pink-700",
  "from-amber-600 to-orange-700",
  "from-violet-600 to-purple-700",
  "from-sky-600 to-cyan-700",
];

function pickGradient(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return GRADIENTS[h % GRADIENTS.length];
}

function ArticlesPage() {
  const { data: articles } = useSuspenseQuery(articlesListQuery(60));

  const tags = ["الكل", ...Array.from(new Set(articles.map((a) => a.categories?.name_ar).filter(Boolean) as string[]))].slice(0, 8);

  return (
    <PageShell title="المقالات" subtitle="مقالات حقيقية من مبدعي المنصة" crumbs={[{ label: "المقالات" }]}
      actions={<Link to="/articles/new" className="btn-hero px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><PenLine className="h-4 w-4" /> اكتب مقالاً</Link>}>
      <div className="glass rounded-2xl p-4 mb-5 flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        {tags.map((t, i) => (
          <button key={t} className={`px-3 py-1.5 rounded-full text-xs font-medium ${i === 0 ? "btn-hero" : "bg-secondary hover:bg-secondary/70"}`}>{t}</button>
        ))}
      </div>

      {articles.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center text-muted-foreground">
          لا توجد مقالات منشورة بعد. <Link to="/articles/new" className="text-primary font-bold">كن أول من يكتب!</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a: ArticleRow) => (
            <Link key={a.id} to="/articles/$slug" params={{ slug: a.slug }} className="glass rounded-2xl overflow-hidden hover:border-primary/50 transition group">
              <div className={`relative aspect-video bg-gradient-to-br ${pickGradient(a.id)} grid place-items-center overflow-hidden`}>
                {a.cover_url ? (
                  <img src={a.cover_url} alt={a.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                ) : (
                  <span className="text-6xl">{a.categories?.emoji ?? "📝"}</span>
                )}
                {a.categories && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-background/80 text-[10px] font-bold">{a.categories.name_ar}</span>
                )}
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-bold leading-snug line-clamp-2 group-hover:text-primary">{a.title}</h3>
                {a.excerpt && <p className="text-xs text-muted-foreground line-clamp-2">{a.excerpt}</p>}
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border">
                  <span>{authorName(a)}</span>
                  <span className="flex items-center gap-3"><Clock className="h-3 w-3 inline" /> {a.reading_minutes}د <Eye className="h-3 w-3 inline" /> {a.reads}</span>
                </div>
                <div className="text-[10px] text-muted-foreground">{timeAgo(a.published_at ?? a.created_at)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageShell>
  );
}
