import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, Users, Eye, DollarSign } from "lucide-react";
export const Route = createFileRoute("/admin/stats")({ component: () => {
  const big = [[Users,"248K","المستخدمون"],[Eye,"24.4M","المشاهدات"],[TrendingUp,"+18%","النمو"],[DollarSign,"$48K","الإيرادات"]];
  return (
    <>
      <div className="glass rounded-2xl p-4 mb-5"><h1 className="text-xl font-extrabold gradient-text">الإحصائيات</h1></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">{big.map(([I,v,l]:any)=>(<div key={l} className="glass rounded-2xl p-5"><I className="h-6 w-6 text-primary mb-2" /><p className="text-2xl font-extrabold">{v}</p><p className="text-xs text-muted-foreground">{l}</p></div>))}</div>
      <div className="glass rounded-2xl p-5 mb-5"><h3 className="font-bold mb-3">النمو خلال 12 شهراً</h3><div className="h-64 flex items-end gap-2">{Array.from({length:12}).map((_,i)=>(<div key={i} className="flex-1 rounded-t btn-hero" style={{height:`${30+i*5+Math.random()*15}%`}} />))}</div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{[["أعلى الدول","السعودية، مصر، الإمارات، المغرب، الجزائر"],["أعلى التصنيفات","تكنولوجيا، أعمال، تطوير الذات، صحة"]].map(([t,d])=>(<div key={t} className="glass rounded-2xl p-5"><h3 className="font-bold">{t}</h3><p className="text-sm text-muted-foreground mt-2">{d}</p></div>))}</div>
    </>
  );
}});
