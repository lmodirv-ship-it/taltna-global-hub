import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/site/Header";
import { Shield, Users, FileText, Video, MessageSquare, BarChart3, Flag, Megaphone } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "لوحة التحكم — Taltna Global" }],
  }),
  component: AdminPage,
});

const sections = [
  { icon: Users, label: "إدارة المستخدمين", value: "2.5M", color: "from-violet-500 to-purple-600" },
  { icon: FileText, label: "إدارة المقالات", value: "125K", color: "from-blue-500 to-cyan-600" },
  { icon: Video, label: "إدارة الفيديوهات", value: "75K", color: "from-rose-500 to-pink-600" },
  { icon: MessageSquare, label: "إدارة المنتديات", value: "350K", color: "from-amber-500 to-orange-600" },
  { icon: BarChart3, label: "التحليلات والإحصاءات", value: "—", color: "from-emerald-500 to-teal-600" },
  { icon: Flag, label: "التبليغات والمراجعة", value: "23", color: "from-red-500 to-rose-600" },
  { icon: Megaphone, label: "إدارة الإعلانات", value: "12", color: "from-yellow-500 to-amber-600" },
  { icon: Shield, label: "الأمان والصلاحيات", value: "—", color: "from-slate-500 to-slate-700" },
];

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return <div className="min-h-screen grid place-items-center">جاري التحميل...</div>;

  if (!user || !isAdmin) {
    return (
      <div dir="rtl" className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto glass rounded-2xl p-8 text-center space-y-4">
            <Shield className="h-12 w-12 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold">وصول مرفوض</h1>
            <p className="text-muted-foreground text-sm">
              هذه الصفحة مخصصة للمشرفين فقط. يرجى تسجيل الدخول بحساب يملك الصلاحيات.
            </p>
            <Link to="/auth" className="btn-hero inline-flex px-6 py-3 rounded-xl font-bold">
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl btn-hero grid place-items-center">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold gradient-text">لوحة التحكم المتقدمة</h1>
            <p className="text-sm text-muted-foreground">مرحباً {user.email} — مالك المنصة</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sections.map((s) => (
            <button key={s.label} className="glass rounded-2xl p-5 text-right hover:scale-[1.02] transition group">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${s.color} grid place-items-center mb-4 group-hover:scale-110 transition`}>
                <s.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-extrabold">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </button>
          ))}
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">النشاط الأخير</h2>
          <ul className="space-y-3 text-sm">
            {[
              "تسجيل ٢٤ مستخدم جديد في آخر ساعة",
              "نشر ١٢ مقال جديد بانتظار المراجعة",
              "٣ بلاغات جديدة تتطلب اهتمامك",
              "ارتفاع التفاعل بنسبة ١٨٪ هذا الأسبوع",
            ].map((t, i) => (
              <li key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/40">
                <span className="h-2 w-2 rounded-full bg-primary" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
