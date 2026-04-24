"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { usePremiumContext } from "@/components/premium-context";

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
    <header className={`sticky top-0 z-40 border-b backdrop-blur-xl ${
      isPremium
        ? "border-amber-500/20 bg-[#09090b]/90"
        : "border-zinc-800/80 bg-[#09090b]/90"
    }`}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/hub" className="group flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center transition-transform group-hover:scale-105 sm:h-10 sm:w-10">
            <Image src="/images/Logo.svg" alt="FootQuest Logo" width={40} height={40} className="drop-shadow-md" />
          </div>
          <span className="text-lg font-black tracking-tight text-white sm:text-xl">
            Foot<span className={`bg-clip-text text-transparent ${
              isPremium
                ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                : "bg-gradient-to-r from-[#00FF87] to-emerald-300"
            }`}>Quest</span>
          </span>
        </Link>

        {/* Points + badges */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Premium badge — icon only on mobile, full on desktop */}
          {isPremium && (
            <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-2 py-1 shadow-md shadow-amber-500/20 sm:px-3 sm:py-1.5">
              <Star className="h-3 w-3 fill-amber-900 text-amber-900 sm:h-3.5 sm:w-3.5" />
              <span className="hidden text-[10px] font-black uppercase tracking-wider text-amber-900 sm:inline">Premium</span>
            </div>
          )}

          {/* FootPoints — Solar Yellow accent */}
          <div className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 sm:gap-2 sm:px-4 sm:py-2 ${
            isPremium
              ? "border-amber-500/30 bg-amber-500/10"
              : "border-[#FFE600]/20 bg-[#FFE600]/5"
          }`}>
            <Coins className="h-3.5 w-3.5 shrink-0 text-[#FFE600] drop-shadow-sm sm:h-4 sm:w-4" />
            <span className="text-xs font-bold tabular-nums text-[#FFE600] sm:text-sm">
              {footPoints !== null ? footPoints.toLocaleString("fr-FR") : "..."}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
