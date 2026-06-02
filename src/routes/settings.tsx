import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/settings")({ component: Settings });

function Settings() {
  const { user } = useAuth();
  return (
    <PageShell title="الإعدادات" crumbs={[{ label: "الإعدادات" }]}>
      <div className="grid grid-cols-12 gap-5">
        <aside className="col-span-12 md:col-span-3"><ul className="glass rounded-2xl p-2 space-y-1">{["الحساب","الملف الشخصي","الإشعارات","الخصوصية","الأمان","اللغة","المظهر"].map((s,i)=>(<li key={s}><button className={`w-full text-right px-3 py-2 rounded-lg text-sm ${i===0?"btn-hero":"hover:bg-secondary/60"}`}>{s}</button></li>))}</ul></aside>
        <section className="col-span-12 md:col-span-9 glass rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-lg">إعدادات الحساب</h2>
          <div><label className="block text-xs text-muted-foreground mb-1">البريد الإلكتروني</label><input defaultValue={user?.email ?? "user@example.com"} className="w-full bg-secondary rounded-xl px-4 py-2.5 outline-none" /></div>
          <div><label className="block text-xs text-muted-foreground mb-1">اسم العرض</label><input defaultValue="مستخدم" className="w-full bg-secondary rounded-xl px-4 py-2.5 outline-none" /></div>
          <div><label className="block text-xs text-muted-foreground mb-1">اللغة المفضلة</label><select className="w-full bg-secondary rounded-xl px-4 py-2.5"><option>العربية</option><option>English</option><option>Français</option></select></div>
          <div><label className="block text-xs text-muted-foreground mb-1">المنطقة الزمنية</label><select className="w-full bg-secondary rounded-xl px-4 py-2.5"><option>الرياض GMT+3</option><option>القاهرة GMT+2</option><option>باريس GMT+1</option></select></div>
          <button className="btn-hero px-5 py-2.5 rounded-xl text-sm font-bold">حفظ التغييرات</button>
        </section>
      </div>
    </PageShell>
  );
}
