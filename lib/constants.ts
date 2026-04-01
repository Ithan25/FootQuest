// FootQuest - Application constants

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

/** Trivia timer */
export const TRIVIA_TIMER_SECONDS = 15;

/** Leaderboard config */
export const LEADERBOARD_PAGE_SIZE = 50;
