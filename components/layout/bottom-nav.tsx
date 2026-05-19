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
    ? "text-amber-400"
    : "text-[#C5E86C]";

  const glowColor = isPremium
    ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
    : "bg-[#3B1F8E] shadow-[0_0_8px_rgba(59,31,142,0.6)]";

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-xl ${
      isPremium
        ? "border-amber-500/10 bg-[#0A0A0F]/95"
        : "border-[#252536]/80 bg-[#0A0A0F]/95"
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
                "relative flex flex-col items-center gap-1 rounded-2xl px-5 py-2 text-[11px] font-semibold transition-colors",
                isActive
                  ? activeColor
                  : "text-zinc-500 hover:text-zinc-300"
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
