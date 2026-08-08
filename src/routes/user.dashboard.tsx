import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageShell } from "@/components/site/PageShell";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { FileText, MessageSquare, HelpCircle, Star } from "lucide-react";

export const Route = createFileRoute("/user/dashboard")({
  head: () => ({
    meta: [
      { title: "لوحة المشترك — HN-global" },
      { name: "description", content: "لوحة المشترك: محتواك، نقاطك، ونشاطك على منصة HN-global." },
      { property: "og:title", content: "لوحة المشترك — HN-global" },
      { property: "og:description", content: "تابع محتواك ونشاطك على HN-global." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: UserDashboard,
});

function UserDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  const { data } = useQuery({
    enabled: !!user,
    queryKey: ["user-dashboard", user?.id],
    queryFn: async () => {
      const uid = user!.id;
      const [profile, articles, topics, questions] = await Promise.all([
        supabase.from("profiles").select("display_name, reputation, level").eq("id", uid).maybeSingle(),
        supabase.from("articles").select("id", { count: "exact", head: true }).eq("author_id", uid),
        supabase.from("forum_topics").select("id", { count: "exact", head: true }).eq("author_id", uid),
        supabase.from("questions").select("id", { count: "exact", head: true }).eq("author_id", uid),
      ]);
      return {
        profile: profile.data,
        articles: articles.count ?? 0,
        topics: topics.count ?? 0,
        questions: questions.count ?? 0,
      };
    },
  });

  const cards = [
    { l: "مقالاتي", v: data?.articles ?? 0, icon: FileText, to: "/articles" as const },
    { l: "مواضيعي", v: data?.topics ?? 0, icon: MessageSquare, to: "/forums" as const },
    { l: "أسئلتي", v: data?.questions ?? 0, icon: HelpCircle, to: "/questions" as const },
    { l: "نقاط السمعة", v: data?.profile?.reputation ?? 0, icon: Star, to: "/profile" as const },
  ];

  return (
    <PageShell
      title={`مرحباً ${data?.profile?.display_name ?? ""}`}
      subtitle="لوحة المشترك — كل نشاطك في مكان واحد"
      crumbs={[{ label: "لوحتي" }]}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Link key={c.l} to={c.to} className="glass rounded-2xl p-5 hover:bg-secondary/40 transition">
            <c.icon className="h-4 w-4 text-primary mb-2" />
            <p className="text-xs text-muted-foreground">{c.l}</p>
            <p className="text-2xl font-extrabold mt-1 tabular-nums">{c.v.toLocaleString("ar")}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
