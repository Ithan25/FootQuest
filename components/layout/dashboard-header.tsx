"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Trophy, Coins } from "lucide-react";

export function DashboardHeader() {
  const [footPoints, setFootPoints] = useState<number | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data } = await supabase
        .from("utilisateur")
        .select("foot_points")
        .eq("id", user.id)
        .single();
      if (data) setFootPoints(data.foot_points ?? 0);
    });
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-500/10 bg-slate-50/90 dark:bg-[#080c15]/90 backdrop-blur-xl transition-colors duration-500">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/hub" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30 transition-transform group-hover:scale-105">
            <Trophy className="h-5 w-5 text-white drop-shadow-md" />
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
            Foot<span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Quest</span>
          </span>
        </Link>

        {/* Points + badges */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {/* Animated FootPoints */}
          <div className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-amber-600/5 dark:from-amber-500/10 dark:to-amber-600/5 px-4 py-2 shadow-inner">
            <div className="relative flex h-5 w-5 items-center justify-center">
              <Coins className="h-4 w-4 text-amber-500 drop-shadow-sm" />
            </div>
            <span className="text-sm font-bold tabular-nums text-amber-500 dark:text-amber-400">
              {footPoints !== null ? footPoints.toLocaleString("fr-FR") : "..."}
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-wider text-amber-600/60 dark:text-amber-500/60 sm:inline">FP</span>
          </div>
        </div>
      </div>
    </header>
  );
}
