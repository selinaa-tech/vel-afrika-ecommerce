import { Bell, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function AppShell({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md">
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur-xl">
          {title ? (
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
          ) : (
            <Link to="/" className="font-display text-xl font-semibold tracking-tight">
              Vel'<span className="text-primary">Afrika</span>
            </Link>
          )}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <LanguageSwitcher />
            <Link to="/collections" aria-label="My collections" className="rounded-full p-2 hover:bg-muted">
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </Link>
            <button aria-label="Notifications" className="relative rounded-full p-2 hover:bg-muted">
              <Bell className="h-[18px] w-[18px]" strokeWidth={1.8} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>
          </div>
        </header>
        <main className="pb-28">{children}</main>
      </div>
    </div>
  );
}
