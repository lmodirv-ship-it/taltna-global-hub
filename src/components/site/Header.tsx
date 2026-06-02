import { Link } from "@tanstack/react-router";
import { Bell, Search, Plus, Sparkles, Globe, LogOut, Shield } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { to: "/", label: "الرئيسية" },
  { to: "/articles", label: "المقالات" },
  { to: "/forums", label: "المنتديات" },
  { to: "/videos", label: "الفيديوهات" },
  { to: "/questions", label: "الأسئلة" },
  { to: "/groups", label: "المجموعات" },
];

export function Header() {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-border/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="relative h-10 w-10 rounded-xl btn-hero grid place-items-center">
            <Globe className="h-5 w-5 text-primary-foreground" />
            <div className="absolute inset-0 rounded-xl bg-primary/30 blur-xl -z-10" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-extrabold text-lg gradient-text">Taltna Global</span>
            <span className="text-[10px] text-muted-foreground">منصة تجمع العقول المبدعة</span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
              activeProps={{ className: "text-foreground bg-secondary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="ابحث عن مقالات، مواضيع، فيديوهات..."
            className="w-full bg-secondary/60 border border-border rounded-xl pr-10 pl-14 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <kbd className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-background/60 border border-border rounded px-1.5 py-0.5">⌘K</kbd>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button size="sm" className="btn-hero hidden sm:inline-flex">
                <Plus className="h-4 w-4" /> إنشاء
              </Button>
              <button className="relative h-10 w-10 rounded-xl glass grid place-items-center hover:bg-secondary transition">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 px-1 text-[10px] bg-primary border-0">12</Badge>
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-10 w-10 rounded-xl ring-gold p-[2px]">
                    <div className="h-full w-full rounded-[10px] bg-card grid place-items-center text-sm font-bold">
                      {user.email?.[0]?.toUpperCase()}
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="flex flex-col">
                    <span className="text-xs text-muted-foreground">مرحباً</span>
                    <span className="truncate">{user.email}</span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">
                        <Shield className="h-4 w-4 me-2 text-primary" /> لوحة التحكم
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={signOut} className="text-destructive cursor-pointer">
                    <LogOut className="h-4 w-4 me-2" /> تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth">تسجيل الدخول</Link>
              </Button>
              <Button asChild size="sm" className="btn-hero">
                <Link to="/auth">
                  <Sparkles className="h-4 w-4" /> ابدأ الآن
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
