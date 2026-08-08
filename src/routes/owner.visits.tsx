import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/owner/visits")({ component: OwnerVisits });

function OwnerVisits() {
  const { data } = useQuery({
    queryKey: ["hn-visits"],
    queryFn: async () =>
      (await supabase.from("hn_visits").select("*").order("created_at", { ascending: false }).limit(100)).data ?? [],
    refetchInterval: 20000,
  });

  return (
    <>
      <div className="glass rounded-2xl p-4 mb-5">
        <h1 className="text-xl font-extrabold gradient-text">سجل الزيارات</h1>
        <p className="text-xs text-muted-foreground mt-1">آخر 100 زيارة مسجلة على المنصة.</p>
      </div>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs border-b border-border">
            <tr>
              <th className="text-right p-3">الوقت</th>
              <th className="text-right p-3">الصفحة</th>
              <th className="text-right p-3">التطبيق</th>
              <th className="text-right p-3">النوع</th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((v) => (
              <tr key={v.id} className="border-b border-border/50">
                <td className="p-3 text-muted-foreground text-xs">{new Date(v.created_at).toLocaleString("ar-MA")}</td>
                <td className="p-3 font-mono text-xs">{v.path ?? "—"}</td>
                <td className="p-3 text-xs">{v.app_key}</td>
                <td className="p-3 text-xs">{v.is_member ? "منخرط" : "زائر"}</td>
              </tr>
            ))}
            {(data ?? []).length === 0 && (
              <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">لا توجد زيارات مسجلة بعد.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
