import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { articlesMock } from "@/lib/mock-data";
import { Save, Trash2 } from "lucide-react";

export const Route = createFileRoute("/articles/$slug/edit")({ component: EditArticle });

function EditArticle() {
  const { slug } = Route.useParams();
  const a = articlesMock.find((x) => x.id === slug) ?? articlesMock[0];
  return (
    <PageShell title="تعديل المقال" crumbs={[{ label: "المقالات", to: "/articles" }, { label: "تعديل" }]}
      actions={<>
        <button className="glass px-3 py-2 rounded-xl text-sm flex items-center gap-2 text-destructive"><Trash2 className="h-4 w-4" /> حذف</button>
        <button className="btn-hero px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><Save className="h-4 w-4" /> حفظ</button>
      </>}>
      <div className="glass rounded-2xl p-5 space-y-4">
        <input defaultValue={a.title} className="w-full bg-secondary/40 rounded-xl px-4 py-3 text-xl font-bold outline-none" />
        <textarea defaultValue={a.excerpt} className="w-full bg-secondary/40 rounded-xl p-3 outline-none" rows={3} />
        <textarea defaultValue="محتوى المقال الكامل هنا..." className="w-full bg-secondary/40 rounded-xl p-3 min-h-[400px] outline-none" />
      </div>
    </PageShell>
  );
}
