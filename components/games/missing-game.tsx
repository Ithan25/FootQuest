"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useTimer } from "@/hooks/use-timer";
import { useGameSession } from "@/hooks/use-game-session";
import { POINTS_CONFIG } from "@/lib/constants";
import type { MissingPieceLevel } from "@/app/(dashboard)/games/missing-piece/actions";
import {
  getMissingPieceLevels,
  getPlayerNames,
  submitMissingSession,
} from "@/app/(dashboard)/games/missing-piece/actions";

const LEVELS_PER_GAME = 5;
const TIME_PER_LEVEL = 45;

export function MissingGame() {
  const session = useGameSession("missing_piece");
  const [levels, setLevels] = useState<MissingPieceLevel[]>([]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentLevel = levels[currentLevelIndex];
  const missingPlayer = currentLevel
    ? currentLevel.team.joueurs[currentLevel.team.joueurManquantIndex]
    : null;

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
        getMissingPieceLevels(LEVELS_PER_GAME),
        getPlayerNames(),
      ]);
      setLevels(newLevels);
      setPlayerNames(names);
      setCurrentLevelIndex(0);
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

  const handleGuess = (playerName: string) => {
    if (!missingPlayer || isCorrect !== null) return;

    setGuess(playerName);
    setShowSuggestions(false);
    timer.pause();

    const correct =
      playerName.toLowerCase() === missingPlayer.nom.toLowerCase();
    setIsCorrect(correct);

    if (correct) {
      let points = POINTS_CONFIG.missing_piece.basePoints;
      points += POINTS_CONFIG.missing_piece.bonusPerLevel;
      if (
        timer.secondsLeft >=
        TIME_PER_LEVEL - POINTS_CONFIG.missing_piece.timeBonusThreshold
      ) {
        points += POINTS_CONFIG.missing_piece.timeBonus;
      }
      session.addScore(points);
    }

    setTimeout(() => advanceToNext(), 2500);
  };

  const filteredSuggestions = playerNames.filter(
    (name) =>
      guess.length >= 2 && name.toLowerCase().includes(guess.toLowerCase())
  );

  // Submit on game end
  useEffect(() => {
    if (session.phase === "result" && session.durationSeconds !== null) {
      submitMissingSession({
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
      <div className="flex flex-col items-center space-y-6 pt-8">
        <div className="relative">
          <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl shadow-purple-500/25">
            <span className="text-5xl">🧩</span>
          </div>
          <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white shadow-lg">
            {LEVELS_PER_GAME}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold">The Missing Piece</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {LEVELS_PER_GAME} compositions · {TIME_PER_LEVEL}s par niveau
          </p>
        </div>

        <div className="w-full space-y-2 rounded-2xl border border-border/40 bg-card/60 p-4 backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Comment jouer ?
          </h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              Une composition d&apos;équipe est affichée sur le terrain ⚽
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              Un joueur est manquant — retrouve la pièce manquante ! 🧩
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              Réponds vite pour gagner plus de points ! ⏱️
            </li>
          </ul>
        </div>

        <button
          onClick={handleStartGame}
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50"
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
      <div className="flex flex-col items-center space-y-6 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl shadow-purple-500/25">
          <span className="text-5xl">
            {session.score > 0 ? "🏆" : "💪"}
          </span>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold">Partie terminée !</h2>
        </div>

        <div className="grid w-full grid-cols-3 gap-3">
          <StatBox
            label="Niveaux"
            value={`${session.currentLevel}/${LEVELS_PER_GAME}`}
            icon="🎯"
          />
          <StatBox
            label="Points"
            value={`+${session.pointsEarned}`}
            icon="🏅"
          />
          <StatBox
            label="Temps"
            value={`${session.durationSeconds}s`}
            icon="⏱️"
          />
        </div>

        <div className="flex w-full gap-3">
          <button
            onClick={handleStartGame}
            className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold text-white shadow-lg shadow-purple-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
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
  if (!currentLevel || !missingPlayer) return null;

  const team = currentLevel.team;

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-muted-foreground">
            Niveau {currentLevelIndex + 1}/{levels.length}
          </span>
          <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-xs font-semibold text-purple-500">
            {team.formation}
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
                  ? "stroke-purple-500"
                  : timer.progress > 0.2
                    ? "stroke-amber-500"
                    : "stroke-red-500"
              } transition-all duration-1000 ease-linear`}
            />
          </svg>
          <span
            className={`absolute text-sm font-bold ${
              timer.progress > 0.5
                ? "text-purple-500"
                : timer.progress > 0.2
                  ? "text-amber-500"
                  : "text-red-500"
            }`}
          >
            {timer.secondsLeft}
          </span>
        </div>
      </div>

      {/* Team name */}
      <div className="text-center">
        <h3 className="text-lg font-bold">{team.drapeau} {team.pays}</h3>
        <p className="text-xs text-muted-foreground">{team.formation}</p>
      </div>

      {/* Football pitch */}
      <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border-2 border-emerald-700/50 bg-gradient-to-b from-emerald-700 to-emerald-800 shadow-xl">
        {/* Pitch lines */}
        <div className="absolute inset-0">
          {/* Center circle */}
          <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30" />
          {/* Center line */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20" />
          {/* Penalty areas */}
          <div className="absolute left-1/2 top-0 h-16 w-44 -translate-x-1/2 border-b border-l border-r border-white/20" />
          <div className="absolute bottom-0 left-1/2 h-16 w-44 -translate-x-1/2 border-l border-r border-t border-white/20" />
          {/* Goal areas */}
          <div className="absolute left-1/2 top-0 h-8 w-24 -translate-x-1/2 border-b border-l border-r border-white/15" />
          <div className="absolute bottom-0 left-1/2 h-8 w-24 -translate-x-1/2 border-l border-r border-t border-white/15" />
        </div>

        {/* Players */}
        {team.joueurs.map((joueur, index) => {
          const isMissing = index === team.joueurManquantIndex;
          const isRevealed = isCorrect !== null;

          return (
            <div
              key={index}
              className="absolute flex flex-col items-center transition-all duration-500"
              style={{
                left: `${joueur.posX}%`,
                top: `${joueur.posY}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Player circle */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold shadow-md transition-all ${
                  isMissing && !isRevealed
                    ? "animate-pulse border-2 border-dashed border-amber-400 bg-amber-500/30 text-amber-300"
                    : isMissing && isRevealed && isCorrect
                      ? "bg-emerald-500 text-white ring-2 ring-emerald-400"
                      : isMissing && isRevealed && !isCorrect
                        ? "bg-red-500 text-white ring-2 ring-red-400"
                        : "bg-white text-emerald-900 shadow-lg"
                }`}
              >
                {isMissing && !isRevealed ? "?" : joueur.numero}
              </div>
              {/* Player name */}
              <span
                className={`mt-0.5 max-w-[70px] truncate text-center text-[9px] font-medium leading-tight ${
                  isMissing && !isRevealed
                    ? "text-amber-300"
                    : "text-white/90"
                }`}
              >
                {isMissing && !isRevealed ? "???" : joueur.nom}
              </span>
            </div>
          );
        })}
      </div>

      {/* Hint: position of missing player */}
      {isCorrect === null && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Poste du joueur manquant :</span>
          <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs font-bold text-purple-500">
            {missingPlayer.poste === "GK"
              ? "Gardien"
              : missingPlayer.poste === "DEF"
                ? "Défenseur"
                : missingPlayer.poste === "MID"
                  ? "Milieu"
                  : "Attaquant"}
          </span>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
            #{missingPlayer.numero}
          </span>
        </div>
      )}

      {/* Guess input */}
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
            placeholder="Quel joueur manque ? Tape ton guess..."
            className="w-full rounded-xl border border-border/40 bg-card/60 px-4 py-3 text-sm backdrop-blur-sm transition-all focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
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
          <div className="text-sm font-bold">
            {isCorrect
              ? `✅ Bravo ! C'est bien ${missingPlayer.prenom} ${missingPlayer.nom} !`
              : `❌ C'était ${missingPlayer.prenom} ${missingPlayer.nom}`}
          </div>
        </div>
      )}

      {/* Score */}
      <div className="flex items-center justify-between rounded-xl border border-border/40 bg-card/60 px-4 py-2.5 backdrop-blur-sm">
        <span className="text-xs text-muted-foreground">Score actuel</span>
        <span className="font-bold text-purple-500">
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
