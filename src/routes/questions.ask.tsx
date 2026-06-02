import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Send } from "lucide-react";

export const Route = createFileRoute("/questions/ask")({ component: AskQuestion });

function AskQuestion() {
  return (
    <PageShell title="اطرح سؤالاً" subtitle="اكتب سؤالاً واضحاً لتحصل على أفضل الإجابات" crumbs={[{ label: "الأسئلة", to: "/questions" }, { label: "سؤال جديد" }]}>
      <div className="glass rounded-2xl p-5 space-y-4 max-w-3xl">
        <div><label className="block text-sm font-bold mb-1">العنوان</label><input placeholder="مثال: كيف أحسّن أداء استعلام SQL بطيء؟" className="w-full bg-secondary/40 rounded-xl px-4 py-3 outline-none" /></div>
        <div><label className="block text-sm font-bold mb-1">التفاصيل</label><textarea placeholder="اشرح ما حاولت، وما النتيجة المتوقعة، وما الذي يحدث فعلاً..." className="w-full bg-secondary/40 rounded-xl p-3 min-h-[300px] outline-none" /></div>
        <div><label className="block text-sm font-bold mb-1">الوسوم</label><input placeholder="postgres, performance, indexing" className="w-full bg-secondary/40 rounded-xl px-4 py-2 outline-none" /></div>
        <button className="btn-hero px-6 py-3 rounded-xl font-bold flex items-center gap-2"><Send className="h-4 w-4" /> نشر السؤال</button>
      </div>
    </PageShell>
  );
}
