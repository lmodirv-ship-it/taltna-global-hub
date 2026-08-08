import { supabase } from "@/integrations/supabase/client";

export const HN_APP_KEY = "hn-global";

export interface HnStats {
  visitors_total: number;
  visits_total: number;
  visitors_today: number;
  online_now: number;
  members_total: number;
  members_today: number;
  server_time: string;
}

function sessionId() {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem("hn_sid");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("hn_sid", id);
  }
  return id;
}

export async function trackVisit(path: string) {
  if (typeof window === "undefined") return;
  try {
    await supabase.rpc("hn_track_visit", {
      _session_id: sessionId(),
      _path: path,
      _app_key: HN_APP_KEY,
    });
  } catch {
    /* counters are best-effort */
  }
}

export async function fetchStats(): Promise<HnStats | null> {
  const { data, error } = await supabase.rpc("hn_public_stats");
  if (error) return null;
  return data as unknown as HnStats;
}

export async function fetchMyDashboard(): Promise<string> {
  const { data, error } = await supabase.rpc("hn_my_dashboard", { _app_key: HN_APP_KEY });
  if (error || !data) return "/user/dashboard";
  return data as unknown as string;
}

export async function fetchMyRoles() {
  const { data } = await supabase
    .from("hn_user_roles_apps")
    .select("role_key, app_key");
  return data ?? [];
}
