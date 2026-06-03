import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Globe, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول — HN-global" },
      { name: "description", content: "سجّل دخولك أو أنشئ حساباً جديداً في منصة HN-global." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/" });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { display_name: displayName || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("تم إنشاء الحساب بنجاح! جاري تسجيل الدخول...");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("مرحباً بعودتك!");
      }
      navigate({ to: "/" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toast.error(msg.includes("Invalid login") ? "بيانات الدخول غير صحيحة" : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen grid lg:grid-cols-2">
      {/* Left/visual side */}
      <div className="hidden lg:flex relative overflow-hidden flex-col justify-between p-12" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 bg-background/30" />
        <Link to="/" className="relative flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-background/80 grid place-items-center">
            <Globe className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="font-extrabold text-xl">HN-global</div>
            <div className="text-xs opacity-80">منصة تجمع العقول المبدعة</div>
          </div>
        </Link>
        <div className="relative space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            انضم لمجتمع<br />ملايين المبدعين
          </h1>
          <p className="text-lg opacity-90 max-w-md">
            اكتشف، تعلّم، وشارك المعرفة مع خبراء من جميع أنحاء العالم.
          </p>
          <div className="flex gap-6 pt-4">
            {[["2.5M+", "مستخدم"], ["125K+", "مقال"], ["75K+", "فيديو"]].map(([v, l]) => (
              <div key={l}>
                <div className="text-3xl font-extrabold">{v}</div>
                <div className="text-sm opacity-80">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative text-xs opacity-70">© 2026 HN-global. جميع الحقوق محفوظة.</div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md glass rounded-3xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex h-14 w-14 rounded-2xl btn-hero items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-extrabold">
              {mode === "login" ? "أهلاً بعودتك" : "إنشاء حساب جديد"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mode === "login" ? "سجّل دخولك للمتابعة" : "ابدأ رحلتك معنا اليوم"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1 bg-secondary/60 rounded-xl">
            <button
              onClick={() => setMode("login")}
              className={`py-2 rounded-lg text-sm font-bold transition ${mode === "login" ? "bg-card shadow" : "text-muted-foreground"}`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`py-2 rounded-lg text-sm font-bold transition ${mode === "signup" ? "bg-card shadow" : "text-muted-foreground"}`}
            >
              حساب جديد
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="text-xs font-bold text-muted-foreground mb-1.5 block">الاسم</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="اسمك الكامل"
                  className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-bold text-muted-foreground mb-1.5 block">البريد الإلكتروني</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground mb-1.5 block">كلمة المرور</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-secondary/60 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-hero w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "login" ? "تسجيل الدخول" : "إنشاء الحساب"}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            بإنشاء حساب، فإنك توافق على شروط الخدمة وسياسة الخصوصية.
          </p>
        </div>
      </div>
    </div>
  );
}
