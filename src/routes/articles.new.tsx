import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Image, Eye, Send } from "lucide-react";

export const Route = createFileRoute("/articles/new")({
  component: NewArticle,
});

function NewArticle() {
  return (
    <PageShell title="إنشاء مقال جديد" subtitle="شارك معرفتك مع آلاف القراء"
      crumbs={[{ label: "المقالات", to: "/articles" }, { label: "إنشاء" }]}
      actions={<>
        <button className="glass px-3 py-2 rounded-xl text-sm flex items-center gap-2"><Eye className="h-4 w-4" /> معاينة</button>
        <button className="btn-hero px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"><Send className="h-4 w-4" /> نشر</button>
      </>}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <input placeholder="عنوان المقال الجذاب..." className="w-full bg-transparent border-0 text-3xl font-extrabold p-3 outline-none placeholder:text-muted-foreground" />
          <input placeholder="مقدمة قصيرة (مهمة لمحركات البحث)" className="w-full bg-secondary/40 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50" />
          <button className="w-full glass rounded-2xl py-12 grid place-items-center text-muted-foreground hover:bg-secondary/40">
            <Image className="h-8 w-8 mb-2" />
            <span>اسحب صورة الغلاف أو انقر للرفع</span>
          </button>
          <textarea placeholder="ابدأ الكتابة... يدعم Markdown" className="w-full glass rounded-2xl p-5 min-h-[500px] outline-none focus:ring-2 focus:ring-primary/50 leading-loose" />
        </div>
        <aside className="col-span-12 lg:col-span-4 space-y-4">
          <div className="glass rounded-2xl p-5">
            <h3 className="font-bold mb-3">إعدادات النشر</h3>
            <label className="block text-xs text-muted-foreground mb-1">التصنيف</label>
            <select className="w-full bg-secondary rounded-xl px-3 py-2 text-sm mb-3"><option>تكنولوجيا</option><option>أعمال</option><option>تصميم</option></select>
            <label className="block text-xs text-muted-foreground mb-1">الوسوم</label>
            <input placeholder="react, ai, design" className="w-full bg-secondary rounded-xl px-3 py-2 text-sm mb-3" />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> السماح بالتعليقات</label>
            <label className="flex items-center gap-2 text-sm mt-2"><input type="checkbox" defaultChecked /> نشر فوري بعد المراجعة</label>
          </div>
          <div className="glass rounded-2xl p-5">
            <h3 className="font-bold mb-2">نصائح للكتابة</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pr-4">
              <li>عنوان واضح وجذاب</li>
              <li>مقدمة تشد القارئ</li>
              <li>عناوين فرعية كل ٣ فقرات</li>
              <li>صور عالية الجودة</li>
            </ul>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
