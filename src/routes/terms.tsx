import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

export const Route = createFileRoute("/terms")({ component: Terms });

function Terms() {
  return (
    <PageShell title="شروط الاستخدام" subtitle="آخر تحديث: 1 يونيو 2026" crumbs={[{ label: "الشروط" }]}>
      <article className="glass rounded-2xl p-8 max-w-3xl mx-auto space-y-5 leading-loose text-foreground/90">
        <p>باستخدامك لمنصة HN-global، فأنت توافق على هذه الشروط. إذا لم توافق عليها كلياً، يُرجى عدم استخدام المنصة.</p>
        <h2 className="text-xl font-bold mt-4">١. الحساب</h2><p>يجب أن يكون عمرك 13 سنة فأكثر. أنت مسؤول عن سرية كلمة المرور وجميع الأنشطة على حسابك.</p>
        <h2 className="text-xl font-bold mt-4">٢. المحتوى</h2><p>تحتفظ بملكية المحتوى الذي تنشره، لكنك تمنحنا رخصة عالمية لعرضه وتوزيعه ضمن المنصة. ممنوع نشر محتوى مسيء أو غير قانوني أو ينتهك حقوق الآخرين.</p>
        <h2 className="text-xl font-bold mt-4">٣. السلوك</h2><p>يُمنع: الإساءة، السبام، الاحتيال، انتحال الهوية، أو محاولة اختراق المنصة. نحتفظ بحق إيقاف الحسابات المخالفة.</p>
        <h2 className="text-xl font-bold mt-4">٤. الاشتراكات</h2><p>الاشتراكات المدفوعة تتجدد تلقائياً. يمكنك الإلغاء في أي وقت، ولن تُسترد المبالغ عن الفترات السابقة.</p>
        <h2 className="text-xl font-bold mt-4">٥. التعديلات</h2><p>قد نحدّث هذه الشروط من حين لآخر. سنُعلمك بأي تغييرات جوهرية.</p>
      </article>
    </PageShell>
  );
}
