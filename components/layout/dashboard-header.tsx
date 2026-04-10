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
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/hub" className="group flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center transition-transform group-hover:scale-105 sm:h-10 sm:w-10">
            <Image src="/images/Logo.svg" alt="FootQuest Logo" width={40} height={40} className="drop-shadow-md" />
          </div>
          <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white sm:text-xl">
            Foot<span className={`bg-clip-text text-transparent ${
              isPremium
                ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                : "bg-gradient-to-r from-emerald-400 to-emerald-300"
            }`}>Quest</span>
          </span>
        </Link>

        {/* Points + badges */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <ThemeToggle />
          
          {/* Premium badge — icon only on mobile, full on desktop */}
          {isPremium && (
            <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-2 py-1 shadow-md shadow-amber-500/20 sm:px-3 sm:py-1.5">
              <Star className="h-3 w-3 fill-amber-900 text-amber-900 sm:h-3.5 sm:w-3.5" />
              <span className="hidden text-[10px] font-black uppercase tracking-wider text-amber-900 sm:inline">Premium</span>
            </div>
          )}

          {/* FootPoints */}
          <div className={`flex items-center gap-1 rounded-full border px-2.5 py-1.5 shadow-inner sm:gap-2 sm:px-4 sm:py-2 ${
            isPremium
              ? "border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 dark:from-amber-500/15 dark:to-yellow-500/10"
              : "border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-amber-600/5 dark:from-amber-500/10 dark:to-amber-600/5"
          }`}>
            <Coins className="h-3.5 w-3.5 shrink-0 text-amber-500 drop-shadow-sm sm:h-4 sm:w-4" />
            <span className="text-xs font-bold tabular-nums text-amber-500 dark:text-amber-400 sm:text-sm">
              {footPoints !== null ? footPoints.toLocaleString("fr-FR") : "..."}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
