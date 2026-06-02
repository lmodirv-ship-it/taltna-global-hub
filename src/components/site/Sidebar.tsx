import { useAuth } from "@/hooks/use-auth";
import { Crown, LayoutDashboard, Cpu, Briefcase, GraduationCap, HeartPulse, Plane, Gamepad2, Car, Palette, ChevronLeft, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

const categories = [
  { icon: Cpu, label: "التكنولوجيا والذكاء الاصطناعي", color: "text-blue-400" },
  { icon: Briefcase, label: "الأعمال والاستثمار", color: "text-emerald-400" },
  { icon: GraduationCap, label: "التعليم والتطوير", color: "text-violet-400" },
  { icon: HeartPulse, label: "الصحة واللياقة", color: "text-rose-400" },
  { icon: Plane, label: "السفر والسياحة", color: "text-amber-400" },
  { icon: Gamepad2, label: "الترفيه والألعاب", color: "text-pink-400" },
  { icon: Car, label: "السيارات والنقل", color: "text-orange-400" },
  { icon: Palette, label: "الفنون والثقافة", color: "text-yellow-400" },
];

export function Sidebar() {
  const { user } = useAuth();
  const initial = user?.email?.[0]?.toUpperCase() ?? "ض";
  const name = user?.email?.split("@")[0] ?? "ضيف";

  return (
    <aside className="space-y-4">
      {/* Profile card */}
      <div className="glass rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
        <div className="flex items-center gap-3 relative">
          <div className="relative">
            <div className="h-14 w-14 rounded-xl ring-gold p-[2px]">
              <div className="h-full w-full rounded-[10px] bg-card grid place-items-center text-lg font-bold">
                {initial}
              </div>
            </div>
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-success border-2 border-card" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-bold truncate">{name}</p>
              <Crown className="h-4 w-4 text-gold" />
            </div>
            <p className="text-xs text-muted-foreground truncate">@{name}</p>
            <span className="inline-flex items-center gap-1 text-[10px] text-success mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> مبدع نشط
            </span>
          </div>
        </div>

        {/* Level bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>المستوى ٢٢</span>
            <span>٨٬٤٥٠ نقطة</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div className="h-full w-[68%] btn-hero" />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[["المقالات", "5.2K"], ["المشاركات", "312"], ["المتابعون", "48"]].map(([l, v]) => (
            <div key={l} className="rounded-lg bg-secondary/40 py-2">
              <div className="text-sm font-bold">{v}</div>
              <div className="text-[10px] text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>

        <Link to="/" className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-secondary hover:bg-secondary/70 py-2.5 text-sm font-medium transition">
          <LayoutDashboard className="h-4 w-4" /> لوحة التحكم
        </Link>
      </div>

      {/* Categories */}
      <div className="glass rounded-2xl p-4">
        <h3 className="text-sm font-bold mb-3 px-1">التصنيفات الرئيسية</h3>
        <ul className="space-y-1">
          {categories.map((c) => (
            <li key={c.label}>
              <button className="w-full flex items-center justify-between gap-3 px-2.5 py-2.5 rounded-lg hover:bg-secondary/60 transition group">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg bg-secondary grid place-items-center ${c.color}`}>
                    <c.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{c.label}</span>
                </div>
                <ChevronLeft className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Premium */}
      <div className="rounded-2xl p-5 relative overflow-hidden border border-primary/30" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 bg-background/40" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Crown className="h-5 w-5 text-gold" />
            <h3 className="font-bold">احصل على تجربة مميزة</h3>
          </div>
          <p className="text-xs text-foreground/80 mb-4">محتوى حصري، شارات، مزايا خرافية</p>
          <button className="w-full rounded-xl bg-foreground text-background py-2.5 text-sm font-bold hover:bg-foreground/90 transition flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" /> ترقية الآن
          </button>
        </div>
      </div>
    </aside>
  );
}
