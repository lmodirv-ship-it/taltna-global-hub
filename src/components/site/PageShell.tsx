import { Link } from "@tanstack/react-router";
import { Header } from "./Header";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

interface Crumb { label: string; to?: string }

interface Props {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  actions?: ReactNode;
  children: ReactNode;
  wide?: boolean;
}

export function PageShell({ title, subtitle, crumbs, actions, children, wide }: Props) {
  return (
    <div dir="rtl" className="min-h-screen">
      <Header />
      <main className={`mx-auto px-4 py-6 ${wide ? "max-w-[1600px]" : "container"}`}>
        {crumbs && (
          <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
            <Link to="/" className="hover:text-foreground">الرئيسية</Link>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1">
                <ChevronLeft className="h-3 w-3" />
                {c.to ? <Link to={c.to} className="hover:text-foreground">{c.label}</Link> : <span className="text-foreground">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        <div className="glass rounded-2xl p-5 mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold gradient-text">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
        {children}
      </main>
    </div>
  );
}
