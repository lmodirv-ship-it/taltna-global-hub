import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/owner/apps")({ component: OwnerApps });

function OwnerApps() {
  const { data } = useQuery({
    queryKey: ["hn-apps"],
    queryFn: async () => (await supabase.from("hn_apps").select("*").order("created_at")).data ?? [],
  });

  return (
    <>
      <div className="glass rounded-2xl p-4 mb-5">
        <h1 className="text-xl font-extrabold gradient-text">التطبيقات المرتبطة — Universal Bridge</h1>
        <p className="text-xs text-muted-foreground mt-1">كل تطبيق يشارك نفس قاعدة المستخدمين والأدوار.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {(data ?? []).map((a) => (
          <div key={a.id} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">{a.name}</h3>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${a.is_active ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>
                {a.is_active ? "نشط" : "متوقف"}
              </span>
            </div>
            <p className="text-xs font-mono text-muted-foreground mt-1">{a.key}</p>
            {a.base_url && (
              <a href={a.base_url} className="text-xs text-primary mt-2 inline-block break-all" target="_blank" rel="noreferrer">
                {a.base_url}
              </a>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
