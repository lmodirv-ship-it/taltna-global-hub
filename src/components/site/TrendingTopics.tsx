import { Eye, MessageSquare, Flame } from "lucide-react";

const tabs = ["الكل", "تكنولوجيا", "أعمال", "صحة", "تعليم", "سفر", "ألعاب"];

const topics = [
  {
    title: "كيف سيغير الذكاء الاصطناعي مستقبل العمل في 2030؟",
    author: "سارة علي",
    time: "منذ ساعتين",
    views: "2.4K",
    comments: 156,
    gradient: "from-blue-600 via-violet-600 to-purple-700",
    tag: "AI",
  },
  {
    title: "أفضل 5 عملات رقمية للاستثمار في 2024",
    author: "محمد إبراهيم",
    time: "منذ 4 ساعات",
    views: "3.8K",
    comments: 213,
    gradient: "from-amber-500 via-orange-600 to-yellow-700",
    tag: "₿",
  },
  {
    title: "دليل السفر إلى جزر المالديف بتكلفة منخفضة",
    author: "فاطمة خالد",
    time: "منذ 6 ساعات",
    views: "1.2K",
    comments: 94,
    gradient: "from-cyan-500 via-teal-500 to-emerald-600",
    tag: "🏝",
  },
  {
    title: "أفضل تمارين لبناء العضلات في المنزل",
    author: "أحمد يوسف",
    time: "منذ 8 ساعات",
    views: "1.7K",
    comments: 128,
    gradient: "from-rose-600 via-red-600 to-orange-700",
    tag: "💪",
  },
];

export function TrendingTopics() {
  return (
    <section className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          المواضيع الرائجة الآن <Flame className="h-5 w-5 text-orange-400" />
        </h2>
        <button className="text-xs text-muted-foreground hover:text-foreground">عرض الكل</button>
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              i === 0 ? "btn-hero" : "bg-secondary/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {topics.map((t) => (
          <article key={t.title} className="group rounded-xl overflow-hidden bg-secondary/30 border border-border hover:border-primary/50 transition cursor-pointer">
            <div className={`relative aspect-[4/3] bg-gradient-to-br ${t.gradient} grid place-items-center`}>
              <span className="text-5xl filter drop-shadow-lg">{t.tag}</span>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition" />
            </div>
            <div className="p-3 space-y-2">
              <h3 className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-primary transition">{t.title}</h3>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{t.author}</span>
                <span>{t.time}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground pt-1 border-t border-border">
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {t.views}</span>
                <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {t.comments}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
