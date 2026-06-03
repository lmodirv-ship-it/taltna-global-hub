import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Users, Globe, Target, Award } from "lucide-react";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <PageShell title="من نحن" subtitle="منصة عربية عالمية لجمع المبدعين والخبراء" crumbs={[{ label: "من نحن" }]}>
      <section className="glass rounded-2xl p-8 mb-5 max-w-4xl">
        <p className="text-lg leading-loose">تأسست HN-global عام 2024 برؤية واحدة: بناء أكبر منصة معرفية عربية تجمع بين المقالات الرصينة، النقاشات الحقيقية، والفيديوهات التعليمية، وأدوات الإنتاجية في مكان واحد.</p>
      </section>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">{[[Users,"500K+","عضو نشط"],[Globe,"45","دولة"],[Target,"1.2M","محتوى منشور"],[Award,"24","جائزة دولية"]].map(([I,v,l]:any)=>(<div key={l} className="glass rounded-2xl p-5 text-center"><I className="h-8 w-8 mx-auto text-primary mb-2" /><p className="text-2xl font-extrabold gradient-text">{v}</p><p className="text-xs text-muted-foreground">{l}</p></div>))}</div>
      <h2 className="font-bold text-xl mb-3">فريقنا</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{["محمد","نور","زينب","أحمد"].map(n=>(<div key={n} className="glass rounded-2xl p-5 text-center"><div className="h-20 w-20 rounded-2xl ring-gold p-[2px] mx-auto"><div className="h-full w-full rounded-xl bg-card grid place-items-center text-2xl font-bold">{n[0]}</div></div><p className="font-bold mt-3">{n} العتيبي</p><p className="text-xs text-muted-foreground">مؤسس مشارك</p></div>))}</div>
    </PageShell>
  );
}
