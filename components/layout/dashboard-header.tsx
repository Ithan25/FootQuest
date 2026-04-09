"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { usePremiumContext } from "@/components/premium-context";

import { ThemeToggle } from "@/components/theme-toggle";
import { Coins, Star } from "lucide-react";

export function DashboardHeader() {
  const [footPoints, setFootPoints] = useState<number | null>(null);
  const { isPremium } = usePremiumContext();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data } = await supabase
        .from("utilisateur")
        .select("foot_points")
        .eq("id", user.id)
        .single();
      if (data) {
        setFootPoints(data.foot_points ?? 0);
      }
    });
  }, []);

  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-500 ${
      isPremium
        ? "border-amber-500/20 bg-slate-50/90 dark:bg-[#080c15]/90"
        : "border-emerald-500/10 bg-slate-50/90 dark:bg-[#080c15]/90"
    }`}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/hub" className="group flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center transition-transform group-hover:scale-105">
            <Image src="/images/Logo.svg" alt="FootQuest Logo" width={40} height={40} className="drop-shadow-md" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
            Foot<span className={`bg-clip-text text-transparent ${
              isPremium
                ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                : "bg-gradient-to-r from-emerald-400 to-emerald-300"
            }`}>Quest</span>
          </span>
        </Link>

        {/* Points + badges */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {/* Premium badge */}
          {isPremium && (
            <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-3 py-1.5 shadow-md shadow-amber-500/20">
              <Star className="h-3.5 w-3.5 fill-amber-900 text-amber-900" />
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-900">Premium</span>
            </div>
          )}

          {/* Animated FootPoints */}
          <div className={`flex items-center gap-2 rounded-full border px-4 py-2 shadow-inner ${
            isPremium
              ? "border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 dark:from-amber-500/15 dark:to-yellow-500/10"
              : "border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-amber-600/5 dark:from-amber-500/10 dark:to-amber-600/5"
          }`}>
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
