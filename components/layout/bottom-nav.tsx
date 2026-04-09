"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Trophy, ShoppingCart, User } from "lucide-react";
import { usePremiumContext } from "@/components/premium-context";

const navItems = [
  {
    href: "/hub",
    label: "Hub",
    icon: <LayoutDashboard className="h-5 w-5" />,
    activeIcon: <LayoutDashboard className="h-5 w-5 pointer-events-none fill-current" />,
  },
  {
    href: "/leaderboard",
    label: "Classement",
    icon: <Trophy className="h-5 w-5" />,
    activeIcon: <Trophy className="h-5 w-5 pointer-events-none fill-current" />,
  },
  {
    href: "/shop",
    label: "Boutique",
    icon: <ShoppingCart className="h-5 w-5" />,
    activeIcon: <ShoppingCart className="h-5 w-5 pointer-events-none fill-current" />,
  },
  {
    href: "/profile",
    label: "Profil",
    icon: <User className="h-5 w-5" />,
    activeIcon: <User className="h-5 w-5 pointer-events-none fill-current" />,
  },
];

export function BottomNav() {
  const pathname = usePathname();
  const { isPremium } = usePremiumContext();

  const activeColor = isPremium
    ? "text-amber-500 dark:text-amber-400"
    : "text-emerald-500 dark:text-emerald-400";

  const glowColor = isPremium
    ? "bg-amber-500 dark:bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.3)] dark:shadow-[0_0_8px_rgba(251,191,36,0.6)]"
    : "bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)] dark:shadow-[0_0_8px_rgba(52,211,153,0.6)]";

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-xl transition-colors duration-700 ease-in-out ${
      isPremium
        ? "border-amber-500/10 bg-slate-50/95 dark:bg-[#080c15]/95"
        : "border-slate-200 dark:border-white/[0.06] bg-slate-50/95 dark:bg-[#080c15]/95"
    }`}>
      <div className="mx-auto flex max-w-5xl items-center justify-around py-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/hub" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-1 rounded-2xl px-5 py-2 text-[11px] font-semibold transition-colors duration-700 ease-in-out",
                isActive
                  ? activeColor
                  : "text-slate-400 hover:text-slate-800 dark:text-white/40 dark:hover:text-white/70"
              )}
            >
              {/* Active glow */}
              {isActive && (
                <div className={`absolute -top-px left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full ${glowColor}`} />
              )}
              <div className={cn("transition-transform", isActive && "scale-110")}>
                {"activeIcon" in item && isActive ? item.activeIcon : item.icon}
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
