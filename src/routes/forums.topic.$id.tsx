import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { topicsMock } from "@/lib/mock-data";
import { ArrowBigUp, ArrowBigDown, Reply, Share2 } from "lucide-react";

export const Route = createFileRoute("/forums/topic/$id")({ component: TopicPage });

function TopicPage() {
  const { id } = Route.useParams();
  const t = topicsMock.find((x) => x.id === id) ?? topicsMock[0];
  return (
    <PageShell title={t.title} crumbs={[{ label: "المنتديات", to: "/forums" }, { label: "نقاش" }]}>
      <article className="glass rounded-2xl p-5 mb-4">
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground shrink-0">
            <button className="hover:text-primary"><ArrowBigUp className="h-6 w-6" /></button>
            <span className="font-bold text-foreground">324</span>
            <button className="hover:text-destructive"><ArrowBigDown className="h-6 w-6" /></button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <div className="h-8 w-8 rounded-full ring-gold p-[2px]"><div className="h-full w-full rounded-full bg-card grid place-items-center text-xs font-bold">{t.author[0]}</div></div>
              <span className="text-foreground font-bold">{t.author}</span> • {t.time}
            </div>
            <p className="leading-loose text-foreground/90">
              السلام عليكم، حبيت أشارك معاكم تجربتي بعد ٦ شهور من الاستخدام الفعلي. النقاش مفتوح ويسعدني سماع آرائكم وتجاربكم الشخصية. في رأيي الشخصي، الموضوع له جوانب متعددة تستحق التوقف عندها.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <button className="glass px-3 py-1.5 rounded-lg text-xs flex items-center gap-1"><Reply className="h-3 w-3" /> رد</button>
              <button className="glass px-3 py-1.5 rounded-lg text-xs flex items-center gap-1"><Share2 className="h-3 w-3" /> مشاركة</button>
            </div>
          </div>
        </div>
      </article>
      <div className="glass rounded-2xl p-5 mb-4">
        <textarea placeholder="اكتب ردك..." className="w-full bg-secondary/40 rounded-xl p-3 outline-none min-h-24" />
        <div className="flex justify-end mt-2"><button className="btn-hero px-4 py-2 rounded-xl text-sm font-bold">إرسال الرد</button></div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass rounded-2xl p-4 flex gap-4">
            <div className="flex flex-col items-center text-xs text-muted-foreground shrink-0">
              <ArrowBigUp className="h-5 w-5" /><span className="font-bold text-foreground">{42 - i * 5}</span><ArrowBigDown className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground"><span className="text-foreground font-bold">عضو #{i + 1}</span> • منذ {i + 1} ساعة</div>
              <p className="text-sm mt-1 leading-relaxed">رد مفصل ومدروس على الموضوع المطروح، يحتوي على نقاط مهمة ومراجع لمصادر موثوقة تدعم وجهة النظر.</p>
              <button className="text-xs text-muted-foreground hover:text-primary mt-2 flex items-center gap-1"><Reply className="h-3 w-3" /> رد</button>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
