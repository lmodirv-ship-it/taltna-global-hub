import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";

const allArticlesQuery = queryOptions({
  queryKey: ["admin", "articles", "all"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("articles")
      .select("id, slug, title, status, reads, created_at, author_id, profiles:profiles!articles_author_id_fkey(display_name, username)")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw error;
    return data ?? [];
  },
});

export const Route = createFileRoute("/admin/articles")({
  loader: ({ context }) => context.queryClient.ensureQueryData(allArticlesQuery),
  component: AdminArticles,
  errorComponent: ({ error }) => <div className="glass rounded-2xl p-6 text-destructive">{error.message}</div>,
});

function AdminArticles() {
  const { data: articles } = useSuspenseQuery(allArticlesQuery);
  const qc = useQueryClient();

  const toggle = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const next = status === "published" ? "draft" : "published";
      const { error } = await supabase
        .from("articles")
        .update({ status: next, published_at: next === "published" ? new Date().toISOString() : null })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "articles"] }); qc.invalidateQueries({ queryKey: ["articles"] }); toast.success("تم التحديث"); },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin", "articles"] }); qc.invalidateQueries({ queryKey: ["articles"] }); toast.success("تم الحذف"); },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <>
      <div className="glass rounded-2xl p-4 mb-5 flex items-center justify-between">
        <h1 className="text-xl font-extrabold gradient-text">إدارة المقالات ({articles.length})</h1>
      </div>
      {articles.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center text-muted-foreground">لا توجد مقالات بعد.</div>
      ) : (
        <div className="glass rounded-2xl divide-y divide-border">
          {articles.map((a: any) => (
            <div key={a.id} className="flex items-center gap-3 p-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{a.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {a.profiles?.display_name || a.profiles?.username || "—"} • {a.reads} قراءة •{" "}
                  <span className={a.status === "published" ? "text-emerald-400" : "text-amber-400"}>{a.status}</span>
                </p>
              </div>
              <div className="flex gap-1">
                <Link to="/articles/$slug" params={{ slug: a.slug }} className="h-8 w-8 rounded-lg glass grid place-items-center"><Eye className="h-4 w-4" /></Link>
                <button onClick={() => toggle.mutate({ id: a.id, status: a.status })} className="h-8 w-8 rounded-lg glass grid place-items-center" title={a.status === "published" ? "إلغاء النشر" : "نشر"}>
                  {a.status === "published" ? <EyeOff className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                </button>
                <button onClick={() => { if (confirm("حذف نهائي؟")) remove.mutate(a.id); }} className="h-8 w-8 rounded-lg glass grid place-items-center text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
