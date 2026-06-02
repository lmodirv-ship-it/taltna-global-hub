import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { messagesMock } from "@/lib/mock-data";
import { Send, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/messages")({ component: MessagesPage });

function MessagesPage() {
  const [active, setActive] = useState(messagesMock[0]);
  return (
    <PageShell wide title="الرسائل" crumbs={[{ label: "الرسائل" }]}>
      <div className="glass rounded-2xl overflow-hidden grid grid-cols-12 h-[70vh]">
        <aside className="col-span-12 md:col-span-4 border-l border-border flex flex-col">
          <div className="p-3 border-b border-border relative">
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder="بحث..." className="w-full bg-secondary rounded-xl pr-10 py-2 text-sm outline-none" />
          </div>
          <ul className="flex-1 overflow-auto">
            {messagesMock.map(m => (
              <li key={m.id}>
                <button onClick={() => setActive(m)} className={`w-full flex items-center gap-3 p-3 hover:bg-secondary/40 transition text-right ${active.id===m.id?"bg-secondary/60":""}`}>
                  <div className="relative shrink-0"><div className="h-12 w-12 rounded-full ring-gold p-[2px]"><div className="h-full w-full rounded-full bg-card grid place-items-center font-bold">{m.name[0]}</div></div>{m.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-card" />}</div>
                  <div className="flex-1 min-w-0"><div className="flex justify-between"><span className="font-bold truncate">{m.name}</span><span className="text-[10px] text-muted-foreground">{m.time}</span></div><p className="text-xs text-muted-foreground truncate">{m.last}</p></div>
                  {m.unread>0 && <span className="h-5 min-w-5 px-1 rounded-full btn-hero text-[10px] grid place-items-center">{m.unread}</span>}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <section className="col-span-12 md:col-span-8 flex flex-col">
          <div className="p-4 border-b border-border flex items-center gap-3"><div className="h-10 w-10 rounded-full ring-gold p-[2px]"><div className="h-full w-full rounded-full bg-card grid place-items-center font-bold">{active.name[0]}</div></div><div><p className="font-bold">{active.name}</p><p className="text-xs text-success">{active.online?"متصل الآن":"غير متصل"}</p></div></div>
          <div className="flex-1 p-4 space-y-3 overflow-auto">
            {[{me:false,t:"السلام عليكم، كيف حالك؟"},{me:true,t:"الحمد لله بخير، وأنت؟"},{me:false,t:"بخير شكراً. عندك دقيقة نتكلم عن الموضوع؟"},{me:true,t:"أكيد، تفضل."},{me:false,t:active.last}].map((b,i)=>(
              <div key={i} className={`flex ${b.me?"justify-end":""}`}><div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${b.me?"btn-hero":"bg-secondary"}`}>{b.t}</div></div>
            ))}
          </div>
          <div className="p-3 border-t border-border flex items-center gap-2"><input placeholder="اكتب رسالة..." className="flex-1 bg-secondary rounded-xl px-4 py-2 outline-none" /><button className="btn-hero h-10 w-10 rounded-xl grid place-items-center"><Send className="h-4 w-4" /></button></div>
        </section>
      </div>
    </PageShell>
  );
}
