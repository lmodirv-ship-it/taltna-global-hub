import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { notificationsMock } from "@/lib/mock-data";
import { Heart, MessageSquare, UserPlus, AtSign, Bell } from "lucide-react";

export const Route = createFileRoute("/notifications")({ component: NotifPage });
const icons: any = { like: Heart, comment: MessageSquare, follow: UserPlus, mention: AtSign, system: Bell };

function NotifPage() {
  return (
    <PageShell title="الإشعارات" subtitle={`لديك ${notificationsMock.filter(n=>!n.read).length} إشعارات جديدة`} crumbs={[{ label: "الإشعارات" }]}
      actions={<button className="glass px-3 py-2 rounded-xl text-sm">تعليم الكل كمقروء</button>}>
      <div className="glass rounded-2xl divide-y divide-border">
        {[...notificationsMock, ...notificationsMock].map((n, i) => {
          const Icon = icons[n.type] || Bell;
          return (
            <div key={i} className={`flex items-start gap-3 p-4 ${!n.read ? "bg-primary/5" : ""}`}>
              <div className="h-10 w-10 rounded-xl glass grid place-items-center text-primary shrink-0"><Icon className="h-4 w-4" /></div>
              <div className="flex-1"><p className="text-sm">{n.text}</p><p className="text-xs text-muted-foreground mt-1">{n.time}</p></div>
              {!n.read && <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />}
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
