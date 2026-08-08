import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/owner/roles")({ component: OwnerRoles });

function OwnerRoles() {
  const { data } = useQuery({
    queryKey: ["hn-roles"],
    queryFn: async () => (await supabase.from("hn_roles").select("*").order("level", { ascending: false })).data ?? [],
  });

  return (
    <>
      <div className="glass rounded-2xl p-4 mb-5">
        <h1 className="text-xl font-extrabold gradient-text">جدول الأدوار (hn_roles)</h1>
        <p className="text-xs text-muted-foreground mt-1">كل دور مرتبط بلوحة تحكم يُوجَّه إليها المستخدم تلقائياً.</p>
      </div>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs border-b border-border">
            <tr>
              <th className="text-right p-3">المفتاح</th>
              <th className="text-right p-3">الاسم</th>
              <th className="text-right p-3">المستوى</th>
              <th className="text-right p-3">لوحة التوجيه</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((r) => (
              <tr key={r.id} className="border-b border-border/50">
                <td className="p-3 font-mono text-xs">{r.key}</td>
                <td className="p-3 font-medium">{r.name_ar}</td>
                <td className="p-3 tabular-nums">{r.level}</td>
                <td className="p-3 font-mono text-xs text-primary">{r.dashboard_path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
