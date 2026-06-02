import { Clock, Eye } from "lucide-react";

const articles = [
  {
    title: "أدوات الذكاء الاصطناعي التي ستغير حياتك اليومية",
    author: "محمد حسن",
    reads: "1.1K",
    time: "6 دقائق قراءة",
    tag: "تكنولوجيا",
    gradient: "from-indigo-600 to-blue-700",
    emoji: "🤖",
  },
  {
    title: "استراتيجيات التسويق الرقمي لزيادة المبيعات",
    author: "نور الدين",
    reads: "892",
    time: "8 دقائق قراءة",
    tag: "أعمال",
    gradient: "from-emerald-600 to-teal-700",
    emoji: "📈",
  },
  {
    title: "7 عادات يومية ستغير حياتك للأفضل",
    author: "زينب محمد",
    reads: "1.5K",
    time: "7 دقائق قراءة",
    tag: "تطوير الذات",
    gradient: "from-rose-600 to-pink-700",
    emoji: "✨",
  },
];

export function LatestArticles() {
  return (
    <section className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">أحدث المقالات</h2>
        <button className="text-xs text-muted-foreground hover:text-foreground">عرض الكل</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((a) => (
          <article key={a.title} className="rounded-xl overflow-hidden bg-secondary/30 border border-border hover:border-primary/50 transition cursor-pointer group">
            <div className={`relative aspect-video bg-gradient-to-br ${a.gradient} grid place-items-center`}>
              <span className="text-6xl">{a.emoji}</span>
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur text-[10px] font-bold">
                • {a.tag}
              </span>
            </div>
            <div className="p-4 space-y-3">
              <h3 className="font-bold leading-snug line-clamp-2 group-hover:text-primary transition">{a.title}</h3>
              <p className="text-xs text-muted-foreground">{a.author}</p>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2 border-t border-border">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {a.time}</span>
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {a.reads}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
