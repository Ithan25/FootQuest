"use client";

import { Shield, Swords, Flame, Layers, Trophy } from "lucide-react";
import type { Difficulty } from "@/lib/constants";
import { DIFFICULTY_MULTIPLIER } from "@/lib/constants";

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty | "all") => void;
  loading?: boolean;
  accentColor?: "green" | "amber" | "magenta";
}

const ACCENT_CLASSES = {
  green: {
    allBg: "from-[#00FF87] to-emerald-600",
    allShadow: "shadow-[#00FF87]/25 hover:shadow-[#00FF87]/40",
    allText: "text-zinc-950",
  },
  amber: {
    allBg: "from-[#FFE600] to-amber-500",
    allShadow: "shadow-[#FFE600]/25 hover:shadow-[#FFE600]/40",
    allText: "text-zinc-950",
  },
  magenta: {
    allBg: "from-[#FF007F] to-fuchsia-600",
    allShadow: "shadow-[#FF007F]/25 hover:shadow-[#FF007F]/40",
    allText: "text-white",
  },
};

const LEVELS = [
  {
    key: "facile" as Difficulty,
    label: "Facile",
    icon: Shield,
    gradient: "from-emerald-600 to-emerald-500",
    shadow: "shadow-emerald-500/30 hover:shadow-emerald-500/50",
    ring: "ring-emerald-500/40",
  },
  {
    key: "moyen" as Difficulty,
    label: "Moyen",
    icon: Swords,
    gradient: "from-amber-600 to-yellow-500",
    shadow: "shadow-amber-500/30 hover:shadow-amber-500/50",
    ring: "ring-amber-500/40",
  },
  {
    key: "difficile" as Difficulty,
    label: "Difficile",
    icon: Flame,
    gradient: "from-red-600 to-rose-500",
    shadow: "shadow-red-500/30 hover:shadow-red-500/50",
    ring: "ring-red-500/40",
  },
];

export function DifficultySelector({ onSelect, loading = false, accentColor = "green" }: DifficultySelectorProps) {
  const accent = ACCENT_CLASSES[accentColor];

  return (
    <div className="w-full space-y-3">
      {/* "Tous" button — play with mixed difficulties */}
      <button
        onClick={() => onSelect("all")}
        disabled={loading}
        className={`flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-6 py-3.5 text-base font-bold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] disabled:opacity-50 ${accent.allBg} ${accent.allShadow} ${accent.allText}`}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
            Chargement...
          </>
        ) : (
          <>
            <Layers className="h-5 w-5" /> Jouer — Tous niveaux
          </>
        )}
      </button>

      {/* Difficulty options */}
      <div className="grid grid-cols-3 gap-2">
        {LEVELS.map((level) => {
          const Icon = level.icon;
          const mult = DIFFICULTY_MULTIPLIER[level.key];
          return (
            <button
              key={level.key}
              onClick={() => onSelect(level.key)}
              disabled={loading}
              className={`group flex flex-col items-center gap-1 rounded-lg bg-gradient-to-b p-3 shadow-md ring-1 transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95 disabled:opacity-50 ${level.gradient} ${level.shadow} ${level.ring}`}
            >
              <Icon className="h-5 w-5 text-white drop-shadow" />
              <span className="text-xs font-bold text-white">{level.label}</span>
              <span className="flex items-center gap-0.5 rounded-full bg-black/20 px-1.5 py-0.5 text-[10px] font-semibold text-white/80">
                <Trophy className="h-2.5 w-2.5" />×{mult}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
