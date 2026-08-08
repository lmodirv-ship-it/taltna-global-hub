import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "@/lib/hn";
import { supabase } from "@/integrations/supabase/client";
import { Eye, Users, Wifi, CalendarDays } from "lucide-react";

export const Route = createFileRoute("/owner/dashboard")({
  head: () => ({
    meta: [
      { title: "غرفة عمليات المالك — HN-global" },
      { name: "description", content: "لوحة المالك المركزية: عدّاد الزوار، المنخرطون، الأدوار والتطبيقات." },
      { property: "og:title", content: "غرفة عمليات المالك — HN-global" },
      { property: "og:description", content: "لوحة المالك المركزية لمنصة HN-global." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OwnerDashboard,
});

function OwnerDashboard() {
  const { data: stats } = useQuery({ queryKey: ["hn-stats"], queryFn: fetchStats, refetchInterval: 15000 });
  const { data: counts } = useQuery({
    queryKey: ["hn-owner-counts"],
    queryFn: async () => {
      const tables = ["articles", "forum_topics", "videos", "questions"] as const;
      const out: Record<string, number> = {};
      for (const t of tables) {
        const { count } = await supabase.from(t).select("id", { count: "exact", head: true });
        out[t] = count ?? 0;
      }
      return out;
    },
  });

  const cards = [
    { l: "إجمالي الزوار", v: stats?.visitors_total ?? 0, icon: Eye },
    { l: "زوار اليوم", v: stats?.visitors_today ?? 0, icon: CalendarDays },
    { l: "المنخرطون", v: stats?.members_total ?? 0, icon: Users },
    { l: "متصل الآن", v: stats?.online_now ?? 0, icon: Wifi },
  ];

  return (
    <>
      <div className="glass rounded-2xl p-5 mb-5">
        <h1 className="text-2xl font-extrabold gradient-text">غرفة عمليات المالك</h1>
        <p className="text-sm text-muted-foreground mt-1">تحكم مركزي في المستخدمين والأدوار والتطبيقات المرتبطة.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {cards.map((c) => (
          <div key={c.l} className="glass rounded-2xl p-5">
            <c.icon className="h-4 w-4 text-primary mb-2" />
            <p className="text-xs text-muted-foreground">{c.l}</p>
            <p className="text-2xl font-extrabold mt-1 tabular-nums">{c.v.toLocaleString("ar")}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ["المقالات", counts?.articles],
          ["مواضيع المنتدى", counts?.forum_topics],
          ["الفيديوهات", counts?.videos],
          ["الأسئلة", counts?.questions],
        ].map(([l, v]) => (
          <div key={l as string} className="glass rounded-2xl p-5">
            <p className="text-xs text-muted-foreground">{l as string}</p>
            <p className="text-2xl font-extrabold mt-1 tabular-nums">{(v ?? 0).toLocaleString("ar")}</p>
          </div>
        ))}
      </div>
    </>
  );
}
