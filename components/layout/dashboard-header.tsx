"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  pseudo?: string;
  footPoints?: number;
  role?: "basic" | "golden_ball";
}

export function DashboardHeader({
  pseudo = "Joueur",
  footPoints = 0,
  role = "basic",
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        {/* Logo + branding */}
        <Link href="/hub" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-md shadow-emerald-500/20">
            <span className="text-lg">⚽</span>
          </div>
          <span className="text-lg font-bold tracking-tight">
            Foot<span className="text-emerald-500">Quest</span>
          </span>
        </Link>

        {/* FootPoints + Role badge */}
        <div className="flex items-center gap-3">
          {/* FootPoints pill */}
          <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5">
            <span className="text-sm">🏅</span>
            <span className="text-sm font-semibold text-amber-500">
              {footPoints.toLocaleString("fr-FR")}
            </span>
          </div>

          {/* Premium badge */}
          {role === "golden_ball" && (
            <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-2.5 py-1 text-xs font-bold text-black shadow-md shadow-amber-500/25">
              ⭐ Premium
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
