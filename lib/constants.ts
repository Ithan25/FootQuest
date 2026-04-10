// FootQuest - Application constants

/** Difficulty levels */
export type Difficulty = "facile" | "moyen" | "difficile";

/** Game limits per role */
export const GAME_LIMITS = {
  basic: {
    maxGamesPerDay: 10,
    showAds: true,
  },
  golden_ball: {
    maxGamesPerDay: Infinity,
    showAds: false,
  },
} as const;

/** Points earned per game type */
export const POINTS_CONFIG = {
  scout_master: {
    basePoints: 10,
    bonusPerLevel: 5,
    timeBonusThreshold: 30, // seconds
    timeBonus: 3,
  },
  missing_piece: {
    basePoints: 15,
    bonusPerLevel: 5,
    timeBonusThreshold: 20,
    timeBonus: 5,
  },
  foot_trivia: {
    basePoints: 5,
    bonusPerCorrect: 2,
    streakBonus: 10, // 5+ correct in a row
  },
} as const;

/** Points multiplier per difficulty */
export const DIFFICULTY_MULTIPLIER: Record<Difficulty, number> = {
  facile: 1,
  moyen: 1.5,
  difficile: 2,
};

/** Trivia config per difficulty */
export const TRIVIA_CONFIG: Record<Difficulty, { timer: number }> = {
  facile: { timer: 30 },
  moyen: { timer: 20 },
  difficile: { timer: 12 },
};

/** Scout Master config per difficulty */
export const SCOUT_CONFIG: Record<Difficulty, { timer: number; revealedClues: number }> = {
  facile: { timer: 90, revealedClues: 5 },
  moyen: { timer: 60, revealedClues: 3 },
  difficile: { timer: 30, revealedClues: 1 },
};

/** Missing Piece config per difficulty */
export const MISSING_CONFIG: Record<Difficulty, { timer: number }> = {
  facile: { timer: 60 },
  moyen: { timer: 40 },
  difficile: { timer: 20 },
};

/** Trivia timer (default, kept for backward compat) */
export const TRIVIA_TIMER_SECONDS = 30;

/** Leaderboard config */
export const LEADERBOARD_PAGE_SIZE = 50;
