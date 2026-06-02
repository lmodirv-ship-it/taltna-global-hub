import heroImg from "@/assets/hero-ai.jpg";
import { Compass, Plus, Users, FileText, Video, MessageCircle, FolderTree } from "lucide-react";

const stats = [
  { icon: Users, label: "مستخدم نشط", value: "+2.5M", color: "from-violet-500/30 to-violet-500/0" },
  { icon: FileText, label: "مقال منشور", value: "+125K", color: "from-blue-500/30 to-blue-500/0" },
  { icon: Video, label: "فيديو منشور", value: "+75K", color: "from-rose-500/30 to-rose-500/0" },
  { icon: MessageCircle, label: "مناقشة", value: "+350K", color: "from-emerald-500/30 to-emerald-500/0" },
  { icon: FolderTree, label: "قسم رئيسي", value: "+50", color: "from-amber-500/30 to-amber-500/0" },
];

export function HeroBanner() {
  return (
    <section className="space-y-4">
      <div className="relative overflow-hidden rounded-3xl glass min-h-[420px]">
        <img
          src={heroImg}
          alt="AI globe"
          width={1280}
          height={768}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/80 to-background/10" />
        <div className="relative p-8 md:p-12 flex flex-col justify-center min-h-[420px] max-w-xl me-auto text-right">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="gradient-text">اكتشف. تعلّم. شارك.</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-bold text-foreground/90">
            منصة عالمية للمعرفة والإبداع
          </p>
          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
            انضم إلى مجتمع من ملايين المبدعين والخبراء واستكشف آلاف المقالات والفيديوهات والمناقشات في جميع المجالات بلغات متعددة.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn-hero px-6 py-3 rounded-xl font-bold flex items-center gap-2">
              <Compass className="h-5 w-5" /> استكشف المحتوى
            </button>
            <button className="glass-strong px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary transition">
              <Plus className="h-5 w-5" /> إنشاء موضوع
            </button>
          </div>
          <div className="mt-6 flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all ${i === 1 ? "w-8 bg-primary" : "w-2 bg-muted"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="glass rounded-2xl p-3 grid grid-cols-2 md:grid-cols-5 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/40 transition">
            <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${s.color} grid place-items-center border border-border`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-extrabold text-lg leading-none">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
