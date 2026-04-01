"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useTimer } from "@/hooks/use-timer";
import { useGameSession } from "@/hooks/use-game-session";
import { POINTS_CONFIG } from "@/lib/constants";
import type { ScoutLevel } from "@/app/(dashboard)/games/scout-master/actions";
import {
  getScoutLevels,
  getTeamNames,
  submitScoutSession,
} from "@/app/(dashboard)/games/scout-master/actions";

const LEVELS_PER_GAME = 5;
const TIME_PER_LEVEL = 60;

export function ScoutGame() {
  const session = useGameSession("scout_master");
  const [levels, setLevels] = useState<ScoutLevel[]>([]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(3);
  const [guess, setGuess] = useState("");
  const [teamNames, setTeamNames] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentLevel = levels[currentLevelIndex];

  const handleTimeUp = useCallback(() => {
    if (isCorrect === null) {
      setIsCorrect(false);
      setTimeout(() => advanceToNext(), 2500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCorrect]);

  const timer = useTimer({
    duration: TIME_PER_LEVEL,
    onExpire: handleTimeUp,
    autoStart: false,
  });

  const advanceToNext = useCallback(() => {
    if (currentLevelIndex + 1 >= levels.length) {
      session.endGame();
      return;
    }
    setCurrentLevelIndex((prev) => prev + 1);
    setRevealedCount(3);
    setGuess("");
    setIsCorrect(null);
    setShowSuggestions(false);
    session.nextLevel();
    timer.reset(TIME_PER_LEVEL);
    timer.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevelIndex, levels.length]);

  const handleStartGame = async () => {
    setLoading(true);
    try {
      const [newLevels, names] = await Promise.all([
        getScoutLevels(LEVELS_PER_GAME),
        getTeamNames(),
      ]);
      setLevels(newLevels);
      setTeamNames(names);
      setCurrentLevelIndex(0);
      setRevealedCount(3);
      setGuess("");
      setIsCorrect(null);
      setShowSuggestions(false);
      session.startGame();
      timer.reset(TIME_PER_LEVEL);
      timer.start();
    } catch {
      console.error("Failed to load levels");
    } finally {
      setLoading(false);
    }
  };

  const handleRevealMore = () => {
    if (currentLevel && revealedCount < currentLevel.team.joueurs.length) {
      setRevealedCount((prev) => Math.min(prev + 2, currentLevel.team.joueurs.length));
    }
  };

  const handleGuess = (teamName: string) => {
    if (!currentLevel || isCorrect !== null) return;

    setGuess(teamName);
    setShowSuggestions(false);
    timer.pause();

    const correct =
      teamName.toLowerCase() === currentLevel.team.pays.toLowerCase();
    setIsCorrect(correct);

    if (correct) {
      const cluesUsed = revealedCount;
      let points = POINTS_CONFIG.scout_master.basePoints;
      points += Math.max(0, (11 - cluesUsed)) * POINTS_CONFIG.scout_master.bonusPerLevel;
      if (timer.secondsLeft >= TIME_PER_LEVEL - POINTS_CONFIG.scout_master.timeBonusThreshold) {
        points += POINTS_CONFIG.scout_master.timeBonus;
      }
      session.addScore(points);
    }

    setTimeout(() => advanceToNext(), 2500);
  };

  const filteredSuggestions = teamNames.filter(
    (name) =>
      guess.length >= 1 && name.toLowerCase().includes(guess.toLowerCase())
  );

  // Submit on game end
  useEffect(() => {
    if (session.phase === "result" && session.durationSeconds !== null) {
      submitScoutSession({
        score: session.score,
        pointsEarned: session.pointsEarned,
        durationSeconds: session.durationSeconds,
        levelsCompleted: session.currentLevel,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.phase]);

  // ─── IDLE ───
  if (session.phase === "idle") {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center space-y-6 pt-8">
        <div className="relative">
          <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl shadow-blue-600/25">
            <span className="text-5xl">🔍</span>
          </div>
          <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white shadow-lg">
            {LEVELS_PER_GAME}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold">Scout Master</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Coupe du Monde 2026
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {LEVELS_PER_GAME} équipes à deviner · {TIME_PER_LEVEL}s par niveau
          </p>
        </div>

        <div className="w-full space-y-2 rounded-2xl border border-border/40 bg-card/60 p-4 backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Comment jouer ?
          </h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              Les clubs des joueurs sont affichés sur le terrain ⚽
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              Devine quelle équipe nationale c&apos;est ! 🏆
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              Moins d&apos;indices = plus de points ! 🏅
            </li>
          </ul>
        </div>

        <button
          onClick={handleStartGame}
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Chargement...
            </span>
          ) : (
            "🎮 Jouer"
          )}
        </button>
      </div>
    );
  }

  // ─── RESULT ───
  if (session.phase === "result") {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center space-y-6 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl shadow-blue-600/25">
          <span className="text-5xl">
            {session.score > 0 ? "🏆" : "💪"}
          </span>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold">Partie terminée !</h2>
        </div>

        <div className="grid w-full grid-cols-3 gap-3">
          <StatBox label="Niveaux" value={`${session.currentLevel}/${LEVELS_PER_GAME}`} icon="🎯" />
          <StatBox label="Points" value={`+${session.pointsEarned}`} icon="🏅" />
          <StatBox label="Temps" value={`${session.durationSeconds}s`} icon="⏱️" />
        </div>

        <div className="flex w-full gap-3">
          <button
            onClick={handleStartGame}
            className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            🔄 Rejouer
          </button>
          <a
            href="/hub"
            className="flex items-center justify-center rounded-xl border border-border/40 bg-card/60 px-6 py-3 font-semibold transition-all hover:-translate-y-0.5 backdrop-blur-sm"
          >
            🏠 Hub
          </a>
        </div>
      </div>
    );
  }

  // ─── PLAYING ───
  if (!currentLevel) return null;

  const team = currentLevel.team;
  const totalClues = team.joueurs.length;

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-muted-foreground">
            Niveau {currentLevelIndex + 1}/{levels.length}
          </span>
          <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-500">
            {team.formation}
          </span>
          <span className="text-xs text-muted-foreground">
            {revealedCount}/{totalClues} clubs visibles
          </span>
        </div>

        <div className="relative flex h-12 w-12 items-center justify-center">
          <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24" cy="24" r="20" fill="none" stroke="currentColor"
              strokeWidth="3" className="text-muted/30"
            />
            <circle
              cx="24" cy="24" r="20" fill="none" strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - timer.progress)}`}
              className={`${
                timer.progress > 0.5
                  ? "stroke-blue-500"
                  : timer.progress > 0.2
                    ? "stroke-amber-500"
                    : "stroke-red-500"
              } transition-all duration-1000 ease-linear`}
            />
          </svg>
          <span className={`absolute text-sm font-bold ${
            timer.progress > 0.5
              ? "text-blue-500"
              : timer.progress > 0.2
                ? "text-amber-500"
                : "text-red-500"
          }`}>
            {timer.secondsLeft}
          </span>
        </div>
      </div>

      {/* Football pitch with club badges */}
      <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-indigo-600/50 bg-gradient-to-b from-indigo-900 to-indigo-950 shadow-2xl">
        {/* Pitch lines */}
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15" />
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
          <div className="absolute left-1/2 top-0 h-[15%] w-[45%] -translate-x-1/2 border-b border-l border-r border-white/10" />
          <div className="absolute bottom-0 left-1/2 h-[15%] w-[45%] -translate-x-1/2 border-l border-r border-t border-white/10" />
          <div className="absolute left-1/2 top-0 h-[8%] w-[25%] -translate-x-1/2 border-b border-l border-r border-white/8" />
          <div className="absolute bottom-0 left-1/2 h-[8%] w-[25%] -translate-x-1/2 border-l border-r border-t border-white/8" />
        </div>

        {/* Players with clubs */}
        {team.joueurs.map((joueur, index) => {
          const isVisible = index < revealedCount;
          const isRevealed = isCorrect !== null;

          return (
            <div
              key={index}
              className={`absolute flex flex-col items-center transition-all duration-700 ${
                isVisible || isRevealed
                  ? "scale-100 opacity-100"
                  : "scale-50 opacity-0"
              }`}
              style={{
                left: `${joueur.posX}%`,
                top: `${joueur.posY}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Club badge */}
              <div
                className={`flex items-center justify-center rounded-lg px-2 py-1.5 text-center shadow-lg transition-all ${
                  isVisible || isRevealed
                    ? "bg-white/95 shadow-black/20"
                    : "bg-white/20"
                }`}
              >
                <span className="text-[10px] font-bold leading-tight text-indigo-950 sm:text-xs">
                  {isVisible || isRevealed ? joueur.club : "?"}
                </span>
              </div>
              {/* Player name (shown on reveal) */}
              {isRevealed && (
                <span className="mt-0.5 text-[9px] font-medium text-white/70 sm:text-[10px]">
                  {joueur.nom}
                </span>
              )}
            </div>
          );
        })}

        {/* Mystery overlay when not all revealed */}
        {isCorrect === null && revealedCount < totalClues && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
              🔍 Quelle sélection nationale ?
            </span>
          </div>
        )}
      </div>

      {/* Reveal more button */}
      {isCorrect === null && revealedCount < totalClues && (
        <button
          onClick={handleRevealMore}
          className="w-full rounded-xl border border-blue-500/30 bg-blue-500/10 px-4 py-2.5 text-sm font-semibold text-blue-400 transition-all hover:bg-blue-500/20"
        >
          🔍 Révéler plus de clubs ({revealedCount}/{totalClues})
        </button>
      )}

      {/* Guess input with autocomplete */}
      {isCorrect === null && (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={guess}
            onChange={(e) => {
              setGuess(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Quelle sélection nationale ? Tape le pays..."
            className="w-full rounded-xl border border-border/40 bg-card/60 px-4 py-3 text-sm backdrop-blur-sm transition-all focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />

          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-y-auto rounded-xl border border-border/40 bg-card shadow-xl backdrop-blur-sm">
              {filteredSuggestions.map((name) => (
                <button
                  key={name}
                  onClick={() => handleGuess(name)}
                  className="w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted/50 first:rounded-t-xl last:rounded-b-xl"
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Result feedback */}
      {isCorrect !== null && (
        <div
          className={`rounded-xl p-4 text-center animate-in fade-in slide-in-from-bottom-2 duration-300 ${
            isCorrect
              ? "bg-emerald-500/15 text-emerald-500"
              : "bg-red-500/15 text-red-500"
          }`}
        >
          <div className="text-2xl">{currentLevel.team.drapeau}</div>
          <div className="mt-1 text-sm font-bold">
            {isCorrect
              ? `✅ Bravo ! C'est bien ${currentLevel.team.pays} !`
              : `❌ C'était ${currentLevel.team.pays} ${currentLevel.team.drapeau}`}
          </div>
        </div>
      )}

      {/* Score */}
      <div className="flex items-center justify-between rounded-xl border border-border/40 bg-card/60 px-4 py-2.5 backdrop-blur-sm">
        <span className="text-xs text-muted-foreground">Score actuel</span>
        <span className="font-bold text-blue-500">
          🏅 {session.pointsEarned} pts
        </span>
      </div>
    </div>
  );
}

function StatBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border/40 bg-card/60 p-3 backdrop-blur-sm">
      <span className="text-lg">{icon}</span>
      <span className="mt-1 text-lg font-bold">{value}</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}
