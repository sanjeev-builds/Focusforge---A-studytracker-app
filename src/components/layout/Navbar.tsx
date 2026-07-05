"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, LayoutDashboard, LineChart, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTracker } from "@/components/StudyTrackerProvider";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics", label: "Analytics", icon: LineChart },
];

export function Navbar() {
  const pathname = usePathname();
  const { state, actions } = useTracker();
  const isDark = (state?.settings.theme ?? "dark") === "dark";

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cobalt-500 shadow-lg shadow-violet-500/30">
            <Flame className="h-5 w-5 text-white" strokeWidth={2.5} />
          </span>
          <span className="hidden font-display text-lg font-bold tracking-tight sm:inline">
            Focus<span className="text-gradient-aurora">Forge</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 rounded-xl glass-panel p-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all sm:px-4 sm:py-2",
                  active
                    ? "bg-gradient-to-br from-violet-500 to-cobalt-500 text-white shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={actions.toggleTheme}
          aria-label="Toggle theme"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl glass-panel text-muted-foreground transition-colors hover:text-foreground"
        >
          {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
