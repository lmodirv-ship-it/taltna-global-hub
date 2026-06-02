import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { questionsMock } from "@/lib/mock-data";
import { ChevronUp, ChevronDown, Check } from "lucide-react";

export const Route = createFileRoute("/questions/$id")({ component: QuestionPage });

function QuestionPage() {
  const { id } = Route.useParams();
  const q = questionsMock.find(x => x.id === id) ?? questionsMock[0];
  return (
    <PageShell title={q.title} crumbs={[{ label: "الأسئلة", to: "/questions" }, { label: "سؤال" }]}>
      <article className="glass rounded-2xl p-5 mb-4 flex gap-4">
        <div className="flex flex-col items-center gap-1 text-xs shrink-0">
          <button className="hover:text-primary"><ChevronUp className="h-6 w-6" /></button>
          <span className="font-bold text-lg">{q.votes}</span>
          <button className="hover:text-destructive"><ChevronDown className="h-6 w-6" /></button>
        </div>
        <div className="flex-1">
          <p className="leading-loose">تفاصيل السؤال: أحاول فهم الفرق العملي بين هذين المفهومين خصوصاً في سياق تطبيقات الإنتاج. هل يمكن لأحد مشاركة مثال واقعي؟ شكراً مقدماً.</p>
          <div className="flex gap-1 mt-3 flex-wrap">{q.tags.map(t => <span key={t} className="px-2 py-0.5 rounded-md bg-primary/15 text-primary text-xs">{t}</span>)}</div>
          <p className="text-xs text-muted-foreground mt-3">سُئل {q.time} بواسطة {q.author}</p>
        </div>
      </article>
      <h2 className="font-bold text-lg mb-3">{q.answers} إجابات</h2>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="glass rounded-2xl p-5 mb-3 flex gap-4">
          <div className="flex flex-col items-center gap-1 text-xs shrink-0">
            <ChevronUp className="h-6 w-6" /><span className="font-bold">{42 - i * 10}</span><ChevronDown className="h-6 w-6" />
            {i === 0 && <Check className="h-5 w-5 text-success mt-1" />}
          </div>
          <div className="flex-1">
            <p className="leading-loose">إجابة مفصلة تشرح الفرق بأمثلة عملية ومراجع لوثائق رسمية. هذه النقاط الرئيسية: (١) التوقيت، (٢) التزامن، (٣) الأداء، (٤) حالات الاستخدام.</p>
            <p className="text-xs text-muted-foreground mt-3">مجاب من خبير #{i+1}</p>
          </div>
        </div>
      ))}
      <div className="glass rounded-2xl p-5 mt-4">
        <h3 className="font-bold mb-2">إجابتك</h3>
        <textarea className="w-full bg-secondary/40 rounded-xl p-3 min-h-32 outline-none" placeholder="اكتب إجابتك..." />
        <button className="btn-hero px-4 py-2 rounded-xl text-sm font-bold mt-2">نشر الإجابة</button>
      </div>
    </PageShell>
  );
}
