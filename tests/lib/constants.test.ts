import { describe, it, expect } from "vitest";
import {
  GAME_LIMITS,
  POINTS_CONFIG,
  DIFFICULTY_MULTIPLIER,
  TRIVIA_CONFIG,
  SCOUT_CONFIG,
  MISSING_CONFIG,
  TRIVIA_TIMER_SECONDS,
  LEADERBOARD_PAGE_SIZE,
} from "@/lib/constants";
import type { Difficulty } from "@/lib/constants";

describe("Constants — GAME_LIMITS", () => {
  it("basic users have 10 games per day and see ads", () => {
    expect(GAME_LIMITS.basic.maxGamesPerDay).toBe(10);
    expect(GAME_LIMITS.basic.showAds).toBe(true);
  });

  it("golden_ball users have unlimited games and no ads", () => {
    expect(GAME_LIMITS.golden_ball.maxGamesPerDay).toBe(Infinity);
    expect(GAME_LIMITS.golden_ball.showAds).toBe(false);
  });
});

describe("Constants — POINTS_CONFIG", () => {
  it("scout_master has correct point structure", () => {
    const cfg = POINTS_CONFIG.scout_master;
    expect(cfg.basePoints).toBeGreaterThan(0);
    expect(cfg.bonusPerLevel).toBeGreaterThan(0);
    expect(cfg.timeBonusThreshold).toBeGreaterThan(0);
    expect(cfg.timeBonus).toBeGreaterThan(0);
  });

  it("missing_piece has higher base points than scout_master", () => {
    expect(POINTS_CONFIG.missing_piece.basePoints).toBeGreaterThan(
      POINTS_CONFIG.scout_master.basePoints
    );
  });

  it("foot_trivia uses bonus and streak system", () => {
    const cfg = POINTS_CONFIG.foot_trivia;
    expect(cfg.basePoints).toBeGreaterThan(0);
    expect(cfg.bonusPerCorrect).toBeGreaterThan(0);
    expect(cfg.streakBonus).toBeGreaterThan(0);
  });
});

describe("Constants — DIFFICULTY_MULTIPLIER", () => {
  const difficulties: Difficulty[] = ["facile", "moyen", "difficile"];

  it("covers all three difficulty levels", () => {
    for (const d of difficulties) {
      expect(DIFFICULTY_MULTIPLIER[d]).toBeDefined();
    }
  });

  it("multipliers increase with difficulty", () => {
    expect(DIFFICULTY_MULTIPLIER.facile).toBeLessThan(DIFFICULTY_MULTIPLIER.moyen);
    expect(DIFFICULTY_MULTIPLIER.moyen).toBeLessThan(DIFFICULTY_MULTIPLIER.difficile);
  });

  it("facile multiplier is 1 (baseline)", () => {
    expect(DIFFICULTY_MULTIPLIER.facile).toBe(1);
  });
});

describe("Constants — Game timers", () => {
  it("TRIVIA_CONFIG timers decrease with difficulty", () => {
    expect(TRIVIA_CONFIG.facile.timer).toBeGreaterThan(TRIVIA_CONFIG.moyen.timer);
    expect(TRIVIA_CONFIG.moyen.timer).toBeGreaterThan(TRIVIA_CONFIG.difficile.timer);
  });

  it("SCOUT_CONFIG timers decrease with difficulty", () => {
    expect(SCOUT_CONFIG.facile.timer).toBeGreaterThan(SCOUT_CONFIG.moyen.timer);
    expect(SCOUT_CONFIG.moyen.timer).toBeGreaterThan(SCOUT_CONFIG.difficile.timer);
  });

  it("SCOUT_CONFIG revealed clues decrease with difficulty", () => {
    expect(SCOUT_CONFIG.facile.revealedClues).toBeGreaterThan(
      SCOUT_CONFIG.moyen.revealedClues
    );
    expect(SCOUT_CONFIG.moyen.revealedClues).toBeGreaterThan(
      SCOUT_CONFIG.difficile.revealedClues
    );
  });

  it("MISSING_CONFIG timers decrease with difficulty", () => {
    expect(MISSING_CONFIG.facile.timer).toBeGreaterThan(MISSING_CONFIG.moyen.timer);
    expect(MISSING_CONFIG.moyen.timer).toBeGreaterThan(MISSING_CONFIG.difficile.timer);
  });

  it("TRIVIA_TIMER_SECONDS is 30 (backward compat)", () => {
    expect(TRIVIA_TIMER_SECONDS).toBe(30);
  });
});

describe("Constants — Leaderboard", () => {
  it("page size is a positive number", () => {
    expect(LEADERBOARD_PAGE_SIZE).toBeGreaterThan(0);
  });
});
