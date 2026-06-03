import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock, Eye } from "lucide-react";
import { articlesListQuery, authorName } from "@/lib/articles";

const GRADIENTS = ["from-indigo-600 to-blue-700","from-emerald-600 to-teal-700","from-rose-600 to-pink-700","from-amber-600 to-orange-700","from-violet-600 to-purple-700","from-sky-600 to-cyan-700"];
const grad = (id: string) => { let h = 0; for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0; return GRADIENTS[h % GRADIENTS.length]; };

export function LatestArticles() {
  const { data, isLoading } = useQuery(articlesListQuery(3));
  const articles = data ?? [];

  return (
    <section className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">أحدث المقالات</h2>
        <Link to="/articles" className="text-xs text-muted-foreground hover:text-foreground">عرض الكل</Link>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="aspect-video rounded-xl bg-secondary/30 animate-pulse" />)}
        </div>
      ) : articles.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">لا توجد مقالات بعد. <Link to="/articles/new" className="text-primary font-bold">اكتب الأول!</Link></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {articles.map((a) => (
            <Link key={a.id} to="/articles/$slug" params={{ slug: a.slug }} className="rounded-xl overflow-hidden bg-secondary/30 border border-border hover:border-primary/50 transition group">
              <div className={`relative aspect-video bg-gradient-to-br ${grad(a.id)} grid place-items-center overflow-hidden`}>
                {a.cover_url ? <img src={a.cover_url} alt={a.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" /> : <span className="text-6xl">{a.categories?.emoji ?? "📝"}</span>}
                {a.categories && <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur text-[10px] font-bold">{a.categories.name_ar}</span>}
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-bold leading-snug line-clamp-2 group-hover:text-primary transition">{a.title}</h3>
                <p className="text-xs text-muted-foreground">{authorName(a)}</p>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {a.reading_minutes}د</span>
                  <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {a.reads}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
