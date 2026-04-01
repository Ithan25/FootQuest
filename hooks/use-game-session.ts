"use client";

import { useState, useCallback } from "react";
import type { GameType } from "@/lib/types/database";

export type GamePhase = "idle" | "playing" | "result";

interface GameSessionState {
  phase: GamePhase;
  score: number;
  pointsEarned: number;
  currentLevel: number;
  startTime: number | null;
  durationSeconds: number | null;
}

interface UseGameSessionReturn extends GameSessionState {
  /** Transition to playing phase */
  startGame: () => void;
  /** Add points to current score */
  addScore: (points: number) => void;
  /** Advance to next level */
  nextLevel: () => void;
  /** End the game and compute duration */
  endGame: () => void;
  /** Reset everything */
  resetGame: () => void;
  /** Game type identifier */
  gameType: GameType;
}

export function useGameSession(gameType: GameType): UseGameSessionReturn {
  const [state, setState] = useState<GameSessionState>({
    phase: "idle",
    score: 0,
    pointsEarned: 0,
    currentLevel: 1,
    startTime: null,
    durationSeconds: null,
  });

  const startGame = useCallback(() => {
    setState({
      phase: "playing",
      score: 0,
      pointsEarned: 0,
      currentLevel: 1,
      startTime: Date.now(),
      durationSeconds: null,
    });
  }, []);

  const addScore = useCallback((points: number) => {
    setState((prev) => ({
      ...prev,
      score: prev.score + points,
      pointsEarned: prev.pointsEarned + points,
    }));
  }, []);

  const nextLevel = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentLevel: prev.currentLevel + 1,
    }));
  }, []);

  const endGame = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: "result",
      durationSeconds: prev.startTime
        ? Math.round((Date.now() - prev.startTime) / 1000)
        : null,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setState({
      phase: "idle",
      score: 0,
      pointsEarned: 0,
      currentLevel: 1,
      startTime: null,
      durationSeconds: null,
    });
  }, []);

  return {
    ...state,
    startGame,
    addScore,
    nextLevel,
    endGame,
    resetGame,
    gameType,
  };
}
