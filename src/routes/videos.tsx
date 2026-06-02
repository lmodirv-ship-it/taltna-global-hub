import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { videosMock } from "@/lib/mock-data";
import { Play, Upload, Eye } from "lucide-react";

export const Route = createFileRoute("/videos")({ component: VideosPage });

function VideosPage() {
  return (
    <PageShell title="الفيديوهات" subtitle="آلاف الفيديوهات التعليمية والترفيهية" crumbs={[{ label: "الفيديوهات" }]}
      actions={<Link to="/videos/upload" className="btn-hero px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><Upload className="h-4 w-4" /> رفع فيديو</Link>}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[...videosMock, ...videosMock, ...videosMock].map((v, i) => (
          <Link key={i} to="/videos/$id" params={{ id: v.id }} className="group">
            <div className={`relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br ${v.gradient} grid place-items-center`}>
              <span className="text-6xl opacity-90">{v.emoji}</span>
              <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition bg-black/30">
                <div className="h-14 w-14 rounded-full btn-hero grid place-items-center"><Play className="h-6 w-6 ms-0.5" fill="currentColor" /></div>
              </div>
              <span className="absolute bottom-2 left-2 text-xs bg-black/70 px-1.5 py-0.5 rounded">{v.duration}</span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold leading-snug line-clamp-2 group-hover:text-primary">{v.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{v.channel}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><Eye className="h-3 w-3" /> {v.views} مشاهدة</p>
            </div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
