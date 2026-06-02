import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Check, Crown, Sparkles, Zap } from "lucide-react";

export const Route = createFileRoute("/membership")({ component: Membership });

const plans = [
  { name: "مجاني", price: "0", icon: Sparkles, features: ["قراءة غير محدودة","نشر 5 مقالات/شهر","مشاركة في المنتديات","أدوات أساسية"], cta: "ابدأ مجاناً" },
  { name: "Pro", price: "29", icon: Zap, features: ["كل المزايا المجانية","نشر غير محدود","أدوات AI متقدمة","شارة موثّق ✓","دعم أولوية"], cta: "اشترك الآن", popular: true },
  { name: "Business", price: "99", icon: Crown, features: ["كل مزايا Pro","حساب فريق (10 أعضاء)","API access","تحليلات متقدمة","مدير حساب مخصص"], cta: "تواصل معنا" },
];

function Membership() {
  return (
    <PageShell title="العضويات والاشتراكات" subtitle="اختر الخطة الأنسب لرحلتك" crumbs={[{ label: "العضويات" }]}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
        {plans.map(p => (
          <div key={p.name} className={`glass rounded-2xl p-6 relative ${p.popular ? "border-primary/50 shadow-glow" : ""}`}>
            {p.popular && <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 btn-hero px-3 py-1 rounded-full text-xs font-bold">الأكثر شعبية</span>}
            <p.icon className="h-10 w-10 text-primary mb-3" />
            <h3 className="text-2xl font-extrabold">{p.name}</h3>
            <p className="text-4xl font-extrabold mt-3"><span className="gradient-text">${p.price}</span><span className="text-sm text-muted-foreground font-normal">/شهر</span></p>
            <ul className="mt-5 space-y-2">{p.features.map(f => <li key={f} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-success" /> {f}</li>)}</ul>
            <button className={`w-full mt-6 py-3 rounded-xl font-bold ${p.popular ? "btn-hero" : "glass"}`}>{p.cta}</button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
