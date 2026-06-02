import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  return (
    <PageShell title="اتصل بنا" subtitle="نحن نحب أن نسمع منك" crumbs={[{ label: "اتصل بنا" }]}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-4 space-y-3">
          {[{i:Mail,t:"البريد",d:"hello@taltna.global"},{i:Phone,t:"الهاتف",d:"+966 50 000 0000"},{i:MapPin,t:"العنوان",d:"الرياض، المملكة العربية السعودية"}].map(x=>(
            <div key={x.t} className="glass rounded-2xl p-5 flex items-start gap-3"><div className="h-10 w-10 rounded-xl btn-hero grid place-items-center"><x.i className="h-4 w-4 text-primary-foreground" /></div><div><p className="font-bold">{x.t}</p><p className="text-sm text-muted-foreground">{x.d}</p></div></div>
          ))}
        </div>
        <form className="col-span-12 md:col-span-8 glass rounded-2xl p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3"><input placeholder="الاسم" className="bg-secondary/40 rounded-xl px-4 py-3 outline-none" /><input placeholder="البريد" className="bg-secondary/40 rounded-xl px-4 py-3 outline-none" /></div>
          <input placeholder="الموضوع" className="w-full bg-secondary/40 rounded-xl px-4 py-3 outline-none" />
          <textarea placeholder="رسالتك..." className="w-full bg-secondary/40 rounded-xl p-3 min-h-40 outline-none" />
          <button className="btn-hero px-6 py-3 rounded-xl font-bold flex items-center gap-2"><Send className="h-4 w-4" /> إرسال</button>
        </form>
      </div>
    </PageShell>
  );
}
