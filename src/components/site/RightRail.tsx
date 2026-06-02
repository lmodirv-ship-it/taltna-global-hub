import { Users, FileText, Video, MessageCircle, Youtube, Twitter, Facebook, Instagram, Play } from "lucide-react";

const stats = [
  { icon: Users, label: "مستخدم نشط", value: "2.5M", color: "bg-violet-500/20 text-violet-300" },
  { icon: FileText, label: "مقال منشور", value: "125K", color: "bg-blue-500/20 text-blue-300" },
  { icon: Video, label: "فيديو منشور", value: "75K", color: "bg-rose-500/20 text-rose-300" },
  { icon: MessageCircle, label: "مناقشة", value: "350K", color: "bg-amber-500/20 text-amber-300" },
];

const topMembers = [
  { name: "أحمد محمد", points: "8,450", rank: 1, color: "bg-amber-500" },
  { name: "سارة علي", points: "7,250", rank: 2, color: "bg-slate-400" },
  { name: "محمد إبراهيم", points: "6,890", rank: 3, color: "bg-orange-600" },
  { name: "فاطمة خالد", points: "5,760", rank: 4, color: "bg-secondary" },
  { name: "أحمد يوسف", points: "4,980", rank: 5, color: "bg-secondary" },
];

const videos = [
  { title: "مستقبل الذكاء الاصطناعي في 10 دقائق", author: "محمد حسن", duration: "10:45", gradient: "from-violet-600 to-blue-700" },
  { title: "تعلم البرمجة من الصفر كامل للمبتدئين", author: "أحمد البرمجي", duration: "18:32", gradient: "from-emerald-600 to-teal-700" },
  { title: "رحلتي إلى سويسرا تجربة لا تنسى", author: "سارة علي", duration: "12:18", gradient: "from-sky-600 to-cyan-700" },
];

export function RightRail() {
  return (
    <aside className="space-y-4">
      {/* Stats */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm">الإحصائيات</h3>
          <button className="text-[10px] text-muted-foreground">عرض الكل</button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl bg-secondary/40 p-3">
              <div className={`h-9 w-9 rounded-lg ${s.color} grid place-items-center mb-2`}>
                <s.icon className="h-4 w-4" />
              </div>
              <div className="font-extrabold text-base">{s.value}</div>
              <div className="text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top members */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm">أفضل الأعضاء</h3>
          <button className="text-[10px] text-muted-foreground">عرض الكل</button>
        </div>
        <ul className="space-y-2.5">
          {topMembers.map((m) => (
            <li key={m.name} className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-secondary grid place-items-center text-sm font-bold">
                  {m.name[0]}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-success border-2 border-card" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{m.name}</p>
                <p className="text-[10px] text-muted-foreground">{m.points} نقطة</p>
              </div>
              <span className={`h-7 w-7 rounded-full ${m.color} grid place-items-center text-xs font-bold text-background`}>
                {m.rank}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Featured videos */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm">مقاطع فيديو مميزة</h3>
          <button className="text-[10px] text-muted-foreground">عرض الكل</button>
        </div>
        <ul className="space-y-3">
          {videos.map((v) => (
            <li key={v.title} className="flex gap-3 cursor-pointer group">
              <div className={`relative h-16 w-24 shrink-0 rounded-lg bg-gradient-to-br ${v.gradient} grid place-items-center overflow-hidden`}>
                <Play className="h-6 w-6 text-white/90" fill="white" />
                <span className="absolute bottom-1 right-1 text-[9px] px-1 rounded bg-black/70 text-white font-bold">{v.duration}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold leading-snug line-clamp-2 group-hover:text-primary transition">{v.title}</p>
                <p className="text-[10px] text-muted-foreground mt-1">{v.author}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Social */}
      <div className="glass rounded-2xl p-4">
        <h3 className="font-bold text-sm mb-3">تابعنا على</h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            { Icon: Youtube, color: "text-red-500" },
            { Icon: Twitter, color: "text-sky-400" },
            { Icon: Facebook, color: "text-blue-500" },
            { Icon: Instagram, color: "text-pink-500" },
          ].map(({ Icon, color }, i) => (
            <button key={i} className={`aspect-square rounded-xl bg-secondary/60 grid place-items-center ${color} hover:bg-secondary transition`}>
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
