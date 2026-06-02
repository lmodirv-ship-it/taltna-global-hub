import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { questionsMock } from "@/lib/mock-data";
import { Plus, MessageSquare, Eye, ChevronUp } from "lucide-react";

export const Route = createFileRoute("/questions")({ component: QuestionsPage });

function QuestionsPage() {
  return (
    <PageShell title="الأسئلة والأجوبة" subtitle="اسأل المجتمع واحصل على إجابات من الخبراء" crumbs={[{ label: "الأسئلة" }]}
      actions={<Link to="/questions/ask" className="btn-hero px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><Plus className="h-4 w-4" /> اطرح سؤالاً</Link>}>
      <div className="glass rounded-2xl divide-y divide-border">
        {[...questionsMock, ...questionsMock].map((q, i) => (
          <Link key={i} to="/questions/$id" params={{ id: q.id }} className="flex gap-4 p-4 hover:bg-secondary/30 transition">
            <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground shrink-0 min-w-16">
              <div><div className="font-bold text-foreground flex items-center justify-center gap-1"><ChevronUp className="h-3 w-3" /> {q.votes}</div><div>صوت</div></div>
              <div><div className="font-bold text-success">{q.answers}</div><div>إجابة</div></div>
              <div className="flex items-center gap-1"><Eye className="h-3 w-3" /> {q.views}</div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold hover:text-primary line-clamp-2">{q.title}</h3>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {q.tags.map(t => <span key={t} className="px-2 py-0.5 rounded-md bg-primary/15 text-primary text-[10px]">{t}</span>)}
              </div>
              <p className="text-xs text-muted-foreground mt-2">{q.author} سأل {q.time}</p>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
