import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { articlesMock } from "@/lib/mock-data";
import { Heart, MessageSquare, Bookmark, Share2, Eye, Clock } from "lucide-react";

export const Route = createFileRoute("/articles/$slug")({
  component: ArticleRead,
});

function ArticleRead() {
  const { slug } = Route.useParams();
  const a = articlesMock.find((x) => x.id === slug) ?? articlesMock[0];
  return (
    <PageShell title={a.title} crumbs={[{ label: "المقالات", to: "/articles" }, { label: a.tag }]}
      actions={<Link to="/articles/$slug/edit" params={{ slug: a.id }} className="px-3 py-2 rounded-xl glass text-sm">تعديل</Link>}>
      <article className="glass rounded-2xl overflow-hidden">
        <div className={`aspect-[21/9] bg-gradient-to-br ${a.gradient} grid place-items-center`}>
          <span className="text-9xl">{a.emoji}</span>
        </div>
        <div className="p-6 md:p-10 space-y-6 max-w-3xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full ring-gold p-[2px]"><div className="h-full w-full rounded-full bg-card grid place-items-center font-bold">{a.author[0]}</div></div>
              <div><p className="text-foreground font-bold">{a.author}</p><p className="text-xs">كاتب موثّق ✓</p></div>
            </div>
            <span className="flex items-center gap-3"><Clock className="h-3 w-3 inline" /> {a.time} • <Eye className="h-3 w-3 inline" /> {a.reads}</span>
          </div>
          <p className="text-lg leading-loose text-muted-foreground">{a.excerpt}</p>
          <div className="prose-invert text-foreground/90 leading-loose space-y-4">
            <p>في عصر تتسارع فيه التحولات التقنية، أصبح من الضروري لكل محترف أن يواكب آخر الأدوات والتقنيات. في هذا المقال، نستعرض معك أبرز ما يجب أن تعرفه.</p>
            <h2 className="text-xl font-bold mt-6">المحور الأول: الأساسيات</h2>
            <p>قبل الغوص في التفاصيل، لا بد من إرساء بعض المفاهيم الأساسية التي ستبني عليها بقية المقال. هذه المفاهيم مستخلصة من أبحاث ودراسات حالة حقيقية.</p>
            <h2 className="text-xl font-bold mt-6">المحور الثاني: التطبيق العملي</h2>
            <p>الجانب النظري وحده لا يكفي. سنقدم لك خطوات عملية يمكنك تنفيذها مباشرة بعد قراءة هذا المقال، مع أمثلة موثقة من السوق العربي والعالمي.</p>
            <blockquote className="border-r-4 border-primary pr-4 italic text-muted-foreground my-6">"المعرفة بدون تطبيق مجرد ذكريات." — مَثَل عربي معاصر</blockquote>
            <h2 className="text-xl font-bold mt-6">الخلاصة</h2>
            <p>ما تعلمناه اليوم ليس نهاية المطاف، بل بداية رحلة. شارك تجربتك في التعليقات وانضم للنقاش في المنتدى.</p>
          </div>
          <div className="flex items-center gap-2 pt-6 border-t border-border">
            <button className="btn-hero px-4 py-2 rounded-xl text-sm flex items-center gap-2"><Heart className="h-4 w-4" /> 1.2K</button>
            <button className="glass px-4 py-2 rounded-xl text-sm flex items-center gap-2"><MessageSquare className="h-4 w-4" /> 84 تعليق</button>
            <button className="glass px-4 py-2 rounded-xl text-sm flex items-center gap-2"><Bookmark className="h-4 w-4" /> حفظ</button>
            <button className="glass px-4 py-2 rounded-xl text-sm flex items-center gap-2"><Share2 className="h-4 w-4" /> مشاركة</button>
          </div>
        </div>
      </article>
      <section className="glass rounded-2xl p-5 mt-5">
        <h3 className="font-bold mb-4">التعليقات (84)</h3>
        <textarea placeholder="اكتب تعليقك..." className="w-full bg-secondary/60 rounded-xl p-3 text-sm min-h-24 outline-none focus:ring-2 focus:ring-primary/50" />
        <div className="flex justify-end mt-2"><button className="btn-hero px-4 py-2 rounded-xl text-sm font-bold">نشر التعليق</button></div>
        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="h-10 w-10 rounded-full ring-gold p-[2px] shrink-0"><div className="h-full w-full rounded-full bg-card grid place-items-center font-bold text-sm">م</div></div>
              <div className="flex-1 bg-secondary/40 rounded-xl p-3">
                <div className="flex justify-between text-xs text-muted-foreground"><span className="text-foreground font-bold">قارئ #{i}</span><span>منذ {i} ساعة</span></div>
                <p className="text-sm mt-1">مقال رائع ومفيد، شكراً لك على المجهود المبذول. هل يمكنك التوسع أكثر في المحور الثاني؟</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
