import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/privacy")({ component: Privacy });

function Privacy() {
  return (
    <PageShell title="سياسة الخصوصية" subtitle="آخر تحديث: 1 يونيو 2026" crumbs={[{ label: "الخصوصية" }]}>
      <article className="glass rounded-2xl p-8 max-w-3xl mx-auto space-y-5 leading-loose text-foreground/90">
        <p>تحرص منصة Taltna Global على حماية خصوصية مستخدميها. توضح هذه السياسة كيف نجمع بياناتك ونستخدمها ونحميها.</p>
        <h2 className="text-xl font-bold mt-4">١. البيانات التي نجمعها</h2>
        <p>نجمع الاسم، البريد الإلكتروني، صورة الملف الشخصي، والمحتوى الذي تنشره. كما نجمع بيانات تقنية مثل عنوان IP ونوع المتصفح لأغراض الأمان والتحليل.</p>
        <h2 className="text-xl font-bold mt-4">٢. استخدام البيانات</h2>
        <p>نستخدم بياناتك لتوفير الخدمة، تحسين تجربتك، إرسال إشعارات مهمة، ومنع الاحتيال.</p>
        <h2 className="text-xl font-bold mt-4">٣. مشاركة البيانات</h2>
        <p>لا نبيع بياناتك لأي طرف ثالث. قد نشاركها فقط مع مزودي خدمات موثوقين (دفع، استضافة) وفق اتفاقيات سرية صارمة.</p>
        <h2 className="text-xl font-bold mt-4">٤. حقوقك</h2>
        <p>يحق لك الوصول لبياناتك، تصحيحها، حذفها، أو نقلها. تواصل معنا عبر privacy@taltna.global لأي طلب.</p>
        <h2 className="text-xl font-bold mt-4">٥. ملفات الكوكيز</h2>
        <p>نستخدم كوكيز ضرورية لتشغيل الموقع، وكوكيز اختيارية لتحسين تجربتك. يمكنك إدارتها من إعدادات المتصفح.</p>
      </article>
    </PageShell>
  );
}
