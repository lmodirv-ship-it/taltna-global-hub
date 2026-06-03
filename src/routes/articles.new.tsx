import { createFileRoute, useNavigate, Navigate } from "@tanstack/react-router";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { PageShell } from "@/components/site/PageShell";
import { categoriesQuery, createArticle } from "@/lib/articles";
import { useAuth } from "@/hooks/use-auth";
import { Send } from "lucide-react";

export const Route = createFileRoute("/articles/new")({
  loader: ({ context }) => context.queryClient.ensureQueryData(categoriesQuery),
  component: NewArticle,
});

function NewArticle() {
  const { user, loading } = useAuth();
  const { data: categories } = useSuspenseQuery(categoriesQuery);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [publish, setPublish] = useState(true);

  const m = useMutation({
    mutationFn: createArticle,
    onSuccess: (d) => {
      toast.success(publish ? "تم نشر المقال" : "تم حفظ المسودة");
      qc.invalidateQueries({ queryKey: ["articles"] });
      navigate({ to: "/articles/$slug", params: { slug: d.slug } });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (loading) return <PageShell title="..." />;
  if (!user) return <Navigate to="/auth" />;

  const submit = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("العنوان والمحتوى مطلوبان");
      return;
    }
    m.mutate({
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      category_id: categoryId || null,
      publish,
    });
  };

  return (
    <PageShell title="إنشاء مقال جديد" subtitle="شارك معرفتك مع آلاف القراء"
      crumbs={[{ label: "المقالات", to: "/articles" }, { label: "إنشاء" }]}
      actions={
        <button onClick={submit} disabled={m.isPending} className="btn-hero px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 disabled:opacity-50">
          <Send className="h-4 w-4" /> {m.isPending ? "جارٍ النشر..." : publish ? "نشر" : "حفظ"}
        </button>
      }>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="عنوان المقال الجذاب..." className="w-full bg-transparent border-0 text-3xl font-extrabold p-3 outline-none placeholder:text-muted-foreground" />
          <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="مقدمة قصيرة (مهمة لمحركات البحث)" className="w-full bg-secondary/40 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50" />
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="ابدأ الكتابة..." className="w-full glass rounded-2xl p-5 min-h-[500px] outline-none focus:ring-2 focus:ring-primary/50 leading-loose" />
        </div>
        <aside className="col-span-12 lg:col-span-4 space-y-4">
          <div className="glass rounded-2xl p-5">
            <h3 className="font-bold mb-3">إعدادات النشر</h3>
            <label className="block text-xs text-muted-foreground mb-1">التصنيف</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full bg-secondary rounded-xl px-3 py-2 text-sm mb-3">
              <option value="">— بدون —</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.id}>{c.parent_id ? "  ↳ " : ""}{c.name_ar}</option>
              ))}
            </select>
            <label className="flex items-center gap-2 text-sm mt-2">
              <input type="checkbox" checked={publish} onChange={(e) => setPublish(e.target.checked)} /> نشر فوراً
            </label>
            <p className="text-xs text-muted-foreground mt-2">إذا ألغيت التحديد، سيُحفظ كمسودة.</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="font-bold mb-2">نصائح للكتابة</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pr-4">
              <li>عنوان واضح وجذاب</li>
              <li>مقدمة تشد القارئ</li>
              <li>عناوين فرعية كل ٣ فقرات</li>
            </ul>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
