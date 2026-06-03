import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/site/PageShell";
import { articleBySlugQuery, authorInitial, authorName, timeAgo } from "@/lib/articles";
import { useAuth } from "@/hooks/use-auth";
import { Heart, MessageSquare, Bookmark, Share2, Eye, Clock } from "lucide-react";

export const Route = createFileRoute("/articles/$slug")({
  loader: async ({ params, context }) => {
    const data = await context.queryClient.ensureQueryData(articleBySlugQuery(params.slug));
    if (!data) throw notFound();
    return data;
  },
  component: ArticleRead,
  errorComponent: ({ error }) => (
    <PageShell title="خطأ" crumbs={[{ label: "المقالات", to: "/articles" }]}>
      <div className="glass rounded-2xl p-6 text-sm text-destructive">{error.message}</div>
    </PageShell>
  ),
  notFoundComponent: () => (
    <PageShell title="غير موجود" crumbs={[{ label: "المقالات", to: "/articles" }]}>
      <div className="glass rounded-2xl p-10 text-center">
        <p className="text-muted-foreground mb-4">المقال غير موجود.</p>
        <Link to="/articles" className="btn-hero px-4 py-2 rounded-xl">العودة للمقالات</Link>
      </div>
    </PageShell>
  ),
});

function ArticleRead() {
  const { slug } = Route.useParams();
  const { data: a } = useSuspenseQuery(articleBySlugQuery(slug));
  const { user } = useAuth();
  if (!a) return null;

  const isOwner = user?.id === a.author_id;

  return (
    <PageShell title={a.title} crumbs={[{ label: "المقالات", to: "/articles" }, { label: a.categories?.name_ar ?? "مقال" }]}
      actions={isOwner ? <Link to="/articles/$slug/edit" params={{ slug: a.slug }} className="px-3 py-2 rounded-xl glass text-sm">تعديل</Link> : null}>
      <article className="glass rounded-2xl overflow-hidden">
        <div className="aspect-[21/9] bg-gradient-to-br from-indigo-600 to-blue-700 grid place-items-center relative overflow-hidden">
          {a.cover_url ? (
            <img src={a.cover_url} alt={a.title} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <span className="text-9xl">{a.categories?.emoji ?? "📝"}</span>
          )}
        </div>
        <div className="p-6 md:p-10 space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full ring-gold p-[2px]">
                {a.profiles?.avatar_url ? (
                  <img src={a.profiles.avatar_url} alt="" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <div className="h-full w-full rounded-full bg-card grid place-items-center font-bold">{authorInitial(a)}</div>
                )}
              </div>
              <div><p className="text-foreground font-bold">{authorName(a)}</p><p className="text-xs">{timeAgo(a.published_at ?? a.created_at)}</p></div>
            </div>
            <span className="flex items-center gap-3"><Clock className="h-3 w-3 inline" /> {a.reading_minutes}د • <Eye className="h-3 w-3 inline" /> {a.reads}</span>
          </div>
          {a.excerpt && <p className="text-lg leading-loose text-muted-foreground">{a.excerpt}</p>}
          <div className="prose-invert text-foreground/90 leading-loose space-y-4 whitespace-pre-wrap">
            {a.content}
          </div>
          <div className="flex items-center gap-2 pt-6 border-t border-border">
            <button className="btn-hero px-4 py-2 rounded-xl text-sm flex items-center gap-2"><Heart className="h-4 w-4" /> إعجاب</button>
            <button className="glass px-4 py-2 rounded-xl text-sm flex items-center gap-2"><MessageSquare className="h-4 w-4" /> تعليق</button>
            <button className="glass px-4 py-2 rounded-xl text-sm flex items-center gap-2"><Bookmark className="h-4 w-4" /> حفظ</button>
            <button className="glass px-4 py-2 rounded-xl text-sm flex items-center gap-2"><Share2 className="h-4 w-4" /> مشاركة</button>
          </div>
        </div>
      </article>
    </PageShell>
  );
}
