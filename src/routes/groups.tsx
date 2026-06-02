import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Users } from "lucide-react";

export const Route = createFileRoute("/groups")({ component: Groups });

const groups = [
  { id: "g1", name: "مطورو الويب العرب", members: "24.5K", emoji: "💻", color: "from-blue-600 to-indigo-700" },
  { id: "g2", name: "رواد الأعمال المغاربة", members: "8.9K", emoji: "🚀", color: "from-emerald-600 to-teal-700" },
  { id: "g3", name: "مصممو UI/UX", members: "12.4K", emoji: "🎨", color: "from-pink-600 to-rose-700" },
  { id: "g4", name: "كُتّاب المحتوى", members: "6.7K", emoji: "✍️", color: "from-amber-600 to-orange-700" },
  { id: "g5", name: "خبراء التسويق", members: "15.2K", emoji: "📈", color: "from-violet-600 to-purple-700" },
  { id: "g6", name: "AI Enthusiasts", members: "32K", emoji: "🤖", color: "from-cyan-600 to-sky-700" },
];

function Groups() {
  return (
    <PageShell title="المجموعات" subtitle="انضم لمجتمعات متخصصة" crumbs={[{ label: "المجموعات" }]}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map(g=>(
          <Link key={g.id} to="/groups/$id" params={{id:g.id}} className="glass rounded-2xl overflow-hidden hover:border-primary/50 transition">
            <div className={`h-28 bg-gradient-to-br ${g.color} grid place-items-center text-5xl`}>{g.emoji}</div>
            <div className="p-4"><h3 className="font-bold">{g.name}</h3><p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Users className="h-3 w-3" /> {g.members} عضو</p><button className="w-full btn-hero py-2 rounded-xl text-sm font-bold mt-3">انضم</button></div>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
