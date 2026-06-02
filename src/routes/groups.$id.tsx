import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { articlesMock } from "@/lib/mock-data";

export const Route = createFileRoute("/groups/$id")({ component: GroupPage });

function GroupPage() {
  return (
    <PageShell title="مطورو الويب العرب" subtitle="24.5K عضو • نشاط عالي" crumbs={[{ label: "المجموعات", to: "/groups" }, { label: "المجموعة" }]}>
      <div className="glass rounded-2xl p-5 mb-4">
        <h3 className="font-bold mb-2">حول المجموعة</h3>
        <p className="text-sm text-muted-foreground">مجتمع لمطوري الويب العرب لتبادل الخبرات، طرح الأسئلة، ومشاركة المشاريع. قواعد بسيطة: احترام، لا سبام، محتوى تقني.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articlesMock.slice(0,4).map(a=>(<div key={a.id} className="glass rounded-2xl p-4"><h3 className="font-bold">{a.title}</h3><p className="text-xs text-muted-foreground mt-1">{a.author} • {a.time}</p></div>))}
      </div>
    </PageShell>
  );
}
