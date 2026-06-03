import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { MessageSquare, Book, Mail, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/support")({ component: Support });

const faq = [
  ["كيف أنشر مقالاً؟","انتقل إلى صفحة المقالات واضغط على زر 'اكتب مقالاً'. املأ التفاصيل ثم اضغط 'نشر'."],
  ["كيف أحصل على شارة التوثيق؟","تُمنح للأعضاء النشطين بعد نشر 30 مقالاً عالي الجودة و1000 متابع."],
  ["كيف أُلغي الاشتراك؟","من صفحة الاشتراكات، اضغط 'إلغاء' بجانب الخطة الحالية."],
  ["هل يمكنني تغيير اسم المستخدم؟","نعم، من الإعدادات > الملف الشخصي. يمكن التغيير مرة واحدة كل 6 أشهر."],
  ["كيف أبلّغ عن محتوى مسيء؟","استخدم زر '...' بجوار المحتوى ثم اختر 'إبلاغ'."],
];

function Support() {
  return (
    <PageShell title="الدعم والمساعدة" subtitle="نحن هنا لمساعدتك في أي وقت" crumbs={[{ label: "الدعم" }]}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[{i:Book,t:"مركز المعرفة",d:"+500 مقال شامل"},{i:MessageSquare,t:"دردشة مباشرة",d:"رد خلال 5 دقائق"},{i:Mail,t:"بريد الدعم",d:"support@hn-global.com"}].map(x=>(
          <div key={x.t} className="glass rounded-2xl p-5 text-center"><x.i className="h-8 w-8 mx-auto text-primary mb-3" /><h3 className="font-bold">{x.t}</h3><p className="text-sm text-muted-foreground mt-1">{x.d}</p></div>
        ))}
      </div>
      <h2 className="font-bold text-lg mb-3">الأسئلة الشائعة</h2>
      <div className="glass rounded-2xl divide-y divide-border">
        {faq.map(([q,a])=>(
          <details key={q} className="group p-4">
            <summary className="flex items-center justify-between cursor-pointer font-bold list-none"><span>{q}</span><ChevronDown className="h-4 w-4 group-open:rotate-180 transition" /></summary>
            <p className="text-sm text-muted-foreground mt-3">{a}</p>
          </details>
        ))}
      </div>
    </PageShell>
  );
}
