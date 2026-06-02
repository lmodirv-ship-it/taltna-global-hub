import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Upload, Film } from "lucide-react";

export const Route = createFileRoute("/videos/upload")({ component: UploadVideo });

function UploadVideo() {
  return (
    <PageShell title="رفع فيديو" subtitle="شارك محتواك مع المجتمع" crumbs={[{ label: "الفيديوهات", to: "/videos" }, { label: "رفع" }]}>
      <div className="glass rounded-2xl p-10 grid place-items-center max-w-3xl mx-auto">
        <Film className="h-16 w-16 text-primary mb-4" />
        <h2 className="font-bold text-xl">اسحب الفيديو هنا أو انقر للاختيار</h2>
        <p className="text-sm text-muted-foreground mt-1">MP4، MOV، WEBM • حتى 2 جيجابايت</p>
        <button className="btn-hero px-6 py-3 rounded-xl font-bold mt-5 flex items-center gap-2"><Upload className="h-4 w-4" /> اختر ملف</button>
      </div>
      <div className="glass rounded-2xl p-5 mt-5 max-w-3xl mx-auto space-y-3">
        <input placeholder="عنوان الفيديو" className="w-full bg-secondary/40 rounded-xl px-4 py-3 outline-none" />
        <textarea placeholder="الوصف" className="w-full bg-secondary/40 rounded-xl p-3 min-h-32 outline-none" />
        <div className="grid grid-cols-2 gap-3">
          <select className="bg-secondary rounded-xl px-3 py-2.5"><option>تعليم</option><option>تكنولوجيا</option><option>ترفيه</option></select>
          <select className="bg-secondary rounded-xl px-3 py-2.5"><option>عام</option><option>غير مدرج</option><option>خاص</option></select>
        </div>
      </div>
    </PageShell>
  );
}
