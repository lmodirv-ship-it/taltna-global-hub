import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Users, Eye, Clock, Wifi } from "lucide-react";
import { fetchStats, trackVisit, type HnStats } from "@/lib/hn";

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

export function StatsBar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [stats, setStats] = useState<HnStats | null>(null);
  const now = useClock();

  useEffect(() => {
    trackVisit(path);
  }, [path]);

  useEffect(() => {
    let alive = true;
    const load = () => fetchStats().then((s) => { if (alive) setStats(s); });
    load();
    const t = setInterval(load, 30000);
    return () => { alive = false; clearInterval(t); };
  }, []);

  const items = [
    { icon: Eye, label: "الزوار", value: stats ? stats.visitors_total.toLocaleString("ar") : "—" },
    { icon: Users, label: "المنخرطون", value: stats ? stats.members_total.toLocaleString("ar") : "—" },
    { icon: Wifi, label: "متصل الآن", value: stats ? stats.online_now.toLocaleString("ar") : "—" },
  ];

  return (
    <div className="border-t border-border/60 bg-secondary/20">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-3 text-xs text-muted-foreground">
        {items.map((i) => (
          <span key={i.label} className="inline-flex items-center gap-1.5">
            <i.icon className="h-3.5 w-3.5 text-primary" />
            {i.label}: <b className="text-foreground">{i.value}</b>
          </span>
        ))}
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-primary" />
          <b className="text-foreground tabular-nums">
            {now ? now.toLocaleTimeString("ar-MA", { hour12: false }) : "--:--:--"}
          </b>
          <span>{now ? now.toLocaleDateString("ar-MA") : ""}</span>
        </span>
      </div>
    </div>
  );
}
