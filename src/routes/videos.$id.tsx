import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { videosMock } from "@/lib/mock-data";
import { ThumbsUp, ThumbsDown, Share2, Bookmark, Eye, Play } from "lucide-react";

export const Route = createFileRoute("/videos/$id")({ component: VideoWatch });

function VideoWatch() {
  const { id } = Route.useParams();
  const v = videosMock.find((x) => x.id === id) ?? videosMock[0];
  const related = videosMock.filter(x => x.id !== v.id);
  return (
    <PageShell wide title={v.title} crumbs={[{ label: "الفيديوهات", to: "/videos" }, { label: v.channel }]}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 xl:col-span-8 space-y-4">
          <div className={`relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br ${v.gradient} grid place-items-center`}>
            <span className="text-9xl">{v.emoji}</span>
            <button className="absolute inset-0 grid place-items-center"><div className="h-20 w-20 rounded-full btn-hero grid place-items-center"><Play className="h-10 w-10 ms-1" fill="currentColor" /></div></button>
          </div>
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full ring-gold p-[2px]"><div className="h-full w-full rounded-full bg-card grid place-items-center font-bold">{v.channel[0]}</div></div>
                <div><p className="font-bold">{v.channel}</p><p className="text-xs text-muted-foreground">1.2M مشترك</p></div>
                <button className="btn-hero px-4 py-2 rounded-xl text-sm font-bold">اشترك</button>
              </div>
              <div className="flex items-center gap-2">
                <button className="glass px-3 py-2 rounded-xl text-sm flex items-center gap-2"><ThumbsUp className="h-4 w-4" /> 24K</button>
                <button className="glass px-3 py-2 rounded-xl text-sm"><ThumbsDown className="h-4 w-4" /></button>
                <button className="glass px-3 py-2 rounded-xl text-sm"><Share2 className="h-4 w-4" /></button>
                <button className="glass px-3 py-2 rounded-xl text-sm"><Bookmark className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="mt-4 bg-secondary/40 rounded-xl p-3 text-sm">
              <p className="text-xs text-muted-foreground mb-1"><Eye className="h-3 w-3 inline" /> {v.views} مشاهدة • منذ يومين</p>
              <p>وصف الفيديو الكامل مع الروابط والمصادر. تابعونا على القناة لمزيد من المحتوى التعليمي عالي الجودة.</p>
            </div>
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="font-bold mb-3">التعليقات (1.2K)</h3>
            <div className="flex gap-3 mb-4">
              <div className="h-9 w-9 rounded-full bg-card ring-gold p-[2px] shrink-0"><div className="h-full w-full rounded-full bg-card" /></div>
              <input placeholder="أضف تعليقاً عاماً..." className="flex-1 bg-transparent border-b border-border outline-none focus:border-primary text-sm" />
            </div>
            {[1,2,3,4].map(i => (
              <div key={i} className="flex gap-3 mt-4">
                <div className="h-9 w-9 rounded-full ring-gold p-[2px] shrink-0"><div className="h-full w-full rounded-full bg-card grid place-items-center text-xs font-bold">م</div></div>
                <div className="flex-1"><p className="text-xs text-muted-foreground"><span className="text-foreground font-bold">مشاهد #{i}</span> منذ {i} يوم</p><p className="text-sm mt-1">فيديو ممتاز ومفيد جداً، استفدت كثيراً، شكراً لك!</p></div>
              </div>
            ))}
          </div>
        </div>
        <aside className="col-span-12 xl:col-span-4 space-y-3">
          <h3 className="font-bold px-2">فيديوهات مقترحة</h3>
          {related.map((r) => (
            <Link key={r.id} to="/videos/$id" params={{ id: r.id }} className="flex gap-3 glass rounded-xl p-2 hover:border-primary/50 transition">
              <div className={`relative w-40 aspect-video rounded-lg overflow-hidden bg-gradient-to-br ${r.gradient} grid place-items-center shrink-0`}>
                <span className="text-3xl">{r.emoji}</span>
                <span className="absolute bottom-1 left-1 text-[10px] bg-black/70 px-1 rounded">{r.duration}</span>
              </div>
              <div className="flex-1 min-w-0"><h4 className="text-sm font-bold line-clamp-2">{r.title}</h4><p className="text-xs text-muted-foreground mt-1">{r.channel}</p><p className="text-xs text-muted-foreground">{r.views} مشاهدة</p></div>
            </Link>
          ))}
        </aside>
      </div>
    </PageShell>
  );
}
