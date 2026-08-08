import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/owner/users")({ component: OwnerUsers });

const ROLE_KEYS = ["owner", "admin", "moderator", "creator", "subscriber"];

function OwnerUsers() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["hn-users"],
    queryFn: async () => {
      const { data: users } = await supabase
        .from("hn_users")
        .select("user_id, email, full_name, origin_app, created_at")
        .order("created_at", { ascending: false })
        .limit(200);
      const { data: roles } = await supabase.from("hn_user_roles_apps").select("user_id, role_key, app_key");
      return (users ?? []).map((u) => ({
        ...u,
        roles: (roles ?? []).filter((r) => r.user_id === u.user_id).map((r) => r.role_key),
      }));
    },
  });

  const setRole = async (userId: string, roleKey: string) => {
    const { error } = await supabase
      .from("hn_user_roles_apps")
      .upsert({ user_id: userId, app_key: "hn-global", role_key: roleKey }, { onConflict: "user_id,app_key,role_key" });
    if (error) return toast.error(error.message);
    toast.success("تم تحديث الدور");
    qc.invalidateQueries({ queryKey: ["hn-users"] });
  };

  return (
    <>
      <div className="glass rounded-2xl p-4 mb-5">
        <h1 className="text-xl font-extrabold gradient-text">المستخدمون المركزيون</h1>
        <p className="text-xs text-muted-foreground mt-1">قاعدة موحدة لكل المستخدمين عبر التطبيقات المرتبطة.</p>
      </div>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-xs border-b border-border">
            <tr>
              <th className="text-right p-3">البريد</th>
              <th className="text-right p-3">الاسم</th>
              <th className="text-right p-3">التطبيق</th>
              <th className="text-right p-3">الأدوار</th>
              <th className="text-right p-3">تعيين دور</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">جاري التحميل...</td></tr>
            )}
            {(data ?? []).map((u) => (
              <tr key={u.user_id} className="border-b border-border/50">
                <td className="p-3">{u.email ?? "—"}</td>
                <td className="p-3">{u.full_name ?? "—"}</td>
                <td className="p-3 text-muted-foreground">{u.origin_app}</td>
                <td className="p-3">{u.roles.join("، ") || "—"}</td>
                <td className="p-3">
                  <select
                    defaultValue=""
                    onChange={(e) => e.target.value && setRole(u.user_id, e.target.value)}
                    className="bg-secondary/60 border border-border rounded-lg px-2 py-1 text-xs"
                  >
                    <option value="">اختر...</option>
                    {ROLE_KEYS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {!isLoading && (data ?? []).length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">لا يوجد مستخدمون بعد.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
