import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { useAuth } from "@/hooks/use-auth";
import { LayoutDashboard, Users, Shield, AppWindow, Eye, Lock } from "lucide-react";

export const Route = createFileRoute("/owner")({ component: OwnerLayout });

const nav = [
  { to: "/owner/dashboard", label: "غرفة العمليات", icon: LayoutDashboard },
  { to: "/owner/users", label: "المستخدمون المركزيون", icon: Users },
  { to: "/owner/roles", label: "الأدوار والصلاحيات", icon: Shield },
  { to: "/owner/apps", label: "التطبيقات (Universal Bridge)", icon: AppWindow },
  { to: "/owner/visits", label: "سجل الزيارات", icon: Eye },
];

function OwnerLayout() {
  const { user, isAdmin, loading } = useAuth();
  const path = useRouterState({ select: (s) => s.location.pathname });

  if (loading) return <div className="min-h-screen grid place-items-center text-muted-foreground">جاري التحقق...</div>;
  if (!user || !isAdmin)
    return (
      <div dir="rtl" className="min-h-screen">
        <Header />
        <div className="container mx-auto py-20 text-center">
          <Lock className="h-16 w-16 mx-auto text-destructive mb-4" />
          <h1 className="text-2xl font-extrabold">غير مصرّح</h1>
          <p className="text-muted-foreground mt-2">لوحة المالك مخصصة للمالك فقط.</p>
        </div>
      </div>
    );

  return (
    <div dir="rtl" className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-5">
          <aside className="col-span-12 lg:col-span-3">
            <div className="glass rounded-2xl p-3 sticky top-20">
              <h3 className="font-bold px-2 py-2 text-sm gradient-text">لوحة المالك</h3>
              <ul className="space-y-1">
                {nav.map((n) => (
                  <li key={n.to}>
                    <Link
                      to={n.to}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${path === n.to ? "btn-hero" : "hover:bg-secondary/60"}`}
                    >
                      <n.icon className="h-4 w-4" /> {n.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/admin" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-secondary/60">
                    <Shield className="h-4 w-4" /> لوحة الإدارة
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
          <main className="col-span-12 lg:col-span-9">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
