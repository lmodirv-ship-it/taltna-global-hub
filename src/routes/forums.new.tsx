import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { forumsMock } from "@/lib/mock-data";
import { Send } from "lucide-react";

export const Route = createFileRoute("/forums/new")({ component: NewTopic });

function NewTopic() {
  return (
    <PageShell title="إنشاء موضوع جديد" crumbs={[{ label: "المنتديات", to: "/forums" }, { label: "موضوع جديد" }]}>
      <div className="glass rounded-2xl p-5 space-y-4 max-w-3xl">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">القسم</label>
          <select className="w-full bg-secondary rounded-xl px-3 py-2.5">{forumsMock.map(f => <option key={f.slug}>{f.name}</option>)}</select>
        </div>
        <input placeholder="عنوان الموضوع" className="w-full bg-secondary/40 rounded-xl px-4 py-3 text-lg font-bold outline-none focus:ring-2 focus:ring-primary/50" />
        <textarea placeholder="اشرح موضوعك بالتفصيل..." className="w-full bg-secondary/40 rounded-xl p-3 min-h-[300px] outline-none focus:ring-2 focus:ring-primary/50" />
        <input placeholder="الوسوم (مفصولة بفاصلة)" className="w-full bg-secondary/40 rounded-xl px-4 py-2 outline-none" />
        <button className="btn-hero px-6 py-3 rounded-xl font-bold flex items-center gap-2"><Send className="h-4 w-4" /> نشر الموضوع</button>
      </div>
    </PageShell>
  );
}
