import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { useAuth } from "@/hooks/use-auth";
import { Users, FileText, MessageSquare, Film, Wrench, Megaphone, Flag, BarChart3, Shield, UserCog, BadgeCheck, LayoutDashboard, Lock } from "lucide-react";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

const adminNav = [
  { to: "/admin", label: "نظرة عامة", icon: LayoutDashboard, exact: true },
  { to: "/admin/users", label: "المستخدمون", icon: Users },
  { to: "/admin/articles", label: "المقالات", icon: FileText },
  { to: "/admin/forum", label: "المنتدى", icon: MessageSquare },
  { to: "/admin/videos", label: "الفيديوهات", icon: Film },
  { to: "/admin/tools", label: "الأدوات", icon: Wrench },
  { to: "/admin/ads", label: "الإعلانات", icon: Megaphone },
  { to: "/admin/reports", label: "البلاغات", icon: Flag },
  { to: "/admin/stats", label: "الإحصائيات", icon: BarChart3 },
  { to: "/admin/roles", label: "الصلاحيات", icon: Shield },
  { to: "/admin/moderators", label: "المشرفون", icon: UserCog },
  { to: "/admin/verification", label: "التوثيق", icon: BadgeCheck },
];

function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();
  const path = useRouterState({ select: s => s.location.pathname });

  if (loading) return <div className="min-h-screen grid place-items-center text-muted-foreground">جاري التحقق...</div>;
  if (!user || !isAdmin) return (
    <div dir="rtl" className="min-h-screen"><Header /><div className="container mx-auto py-20 text-center"><Lock className="h-16 w-16 mx-auto text-destructive mb-4" /><h1 className="text-2xl font-extrabold">غير مصرّح</h1><p className="text-muted-foreground mt-2">لوحة الإدارة مخصصة للمشرفين فقط.</p></div></div>
  );

  const isOverview = path === "/admin";

  return (
    <div dir="rtl" className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-5">
          <aside className="col-span-12 lg:col-span-3">
            <div className="glass rounded-2xl p-3 sticky top-20">
              <h3 className="font-bold px-2 py-2 text-sm gradient-text">لوحة الإدارة</h3>
              <ul className="space-y-1">
                {adminNav.map(n=>(
                  <li key={n.to}>
                    <Link to={n.to} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${path===n.to?"btn-hero":"hover:bg-secondary/60"}`}>
                      <n.icon className="h-4 w-4" /> {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <main className="col-span-12 lg:col-span-9">
            {isOverview ? <AdminOverview /> : <Outlet />}
          </main>
        </div>
      </div>
    </div>
  );
}

function AdminOverview() {
  const stats = [
    { l: "إجمالي المستخدمين", v: "248,420", c: "+12.4%" },
    { l: "المقالات المنشورة", v: "84,219", c: "+8.1%" },
    { l: "البلاغات النشطة", v: "23", c: "-15%" },
    { l: "الإيرادات (شهري)", v: "$48.2K", c: "+24%" },
  ];
  return (
    <>
      <div className="glass rounded-2xl p-5 mb-5"><h1 className="text-2xl font-extrabold gradient-text">مرحباً بك في لوحة الإدارة</h1><p className="text-sm text-muted-foreground mt-1">إدارة كاملة لمنصة Taltna Global</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map(s=>(<div key={s.l} className="glass rounded-2xl p-5"><p className="text-xs text-muted-foreground">{s.l}</p><p className="text-2xl font-extrabold mt-1">{s.v}</p><p className="text-xs text-success mt-1">{s.c}</p></div>))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass rounded-2xl p-5"><h3 className="font-bold mb-3">آخر التسجيلات</h3><ul className="text-sm space-y-2">{["محمد العتيبي","سارة الزياني","Karim B.","Lina F.","Ahmed M."].map(n=>(<li key={n} className="flex justify-between text-muted-foreground"><span>{n}</span><span>اليوم</span></li>))}</ul></div>
        <div className="glass rounded-2xl p-5"><h3 className="font-bold mb-3">بلاغات تنتظر المراجعة</h3><ul className="text-sm space-y-2 text-muted-foreground"><li>تعليق مسيء — #4892</li><li>محتوى مكرر — #4891</li><li>انتحال هوية — #4889</li></ul></div>
      </div>
    </>
  );
}
