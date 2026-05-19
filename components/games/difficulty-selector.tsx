"use client";

import { Shield, Swords, Flame, Layers, Trophy } from "lucide-react";
import type { Difficulty } from "@/lib/constants";
import { DIFFICULTY_MULTIPLIER } from "@/lib/constants";

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty | "all") => void;
  loading?: boolean;
  accentColor?: "green" | "amber" | "red";
}

const ACCENT_CLASSES = {
  green: {
    allBg: "from-[#00A651] to-emerald-700",
    allShadow: "shadow-[#00A651]/25 hover:shadow-[#00A651]/40",
    allText: "text-white",
  },
  amber: {
    allBg: "from-[#C5E86C] to-[#00A651]",
    allShadow: "shadow-[#C5E86C]/25 hover:shadow-[#C5E86C]/40",
    allText: "text-zinc-950",
  },
  red: {
    allBg: "from-[#E2001A] to-red-700",
    allShadow: "shadow-[#E2001A]/25 hover:shadow-[#E2001A]/40",
    allText: "text-white",
  },
};

const LEVELS = [
  {
    key: "facile" as Difficulty,
    label: "Facile",
    icon: Shield,
    gradient: "from-[#00A651] to-emerald-600",
    shadow: "shadow-[#00A651]/30 hover:shadow-[#00A651]/50",
    ring: "ring-[#00A651]/40",
  },
  {
    key: "moyen" as Difficulty,
    label: "Moyen",
    icon: Swords,
    gradient: "from-[#C5E86C] to-[#00A651]",
    shadow: "shadow-[#C5E86C]/30 hover:shadow-[#C5E86C]/50",
    ring: "ring-[#C5E86C]/40",
  },
  {
    key: "difficile" as Difficulty,
    label: "Difficile",
    icon: Flame,
    gradient: "from-[#E2001A] to-red-700",
    shadow: "shadow-[#E2001A]/30 hover:shadow-[#E2001A]/50",
    ring: "ring-[#E2001A]/40",
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
