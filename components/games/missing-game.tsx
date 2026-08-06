"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Flag } from "@/components/ui/flag";
import { useTimer } from "@/hooks/use-timer";
import { Puzzle, Trophy, Timer, Medal, CheckCircle2, XCircle, Users, Zap, Target, RefreshCw, Home } from "lucide-react";
import Image from "next/image";
import { useGameSession } from "@/hooks/use-game-session";
import { usePremiumContext } from "@/components/premium-context";
import { AdInterstitial } from "@/components/games/ad-interstitial";
import { DifficultySelector } from "@/components/games/difficulty-selector";
import { POINTS_CONFIG, MISSING_CONFIG, DIFFICULTY_MULTIPLIER } from "@/lib/constants";
import type { Difficulty } from "@/lib/constants";
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
  const { isPremium } = usePremiumContext();
  const [levels, setLevels] = useState<MissingPieceLevel[]>([]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>(undefined);
  const [timePer, setTimePer] = useState(TIME_PER_LEVEL);
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
    duration: timePer,
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
    timer.reset(timePer);
    timer.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevelIndex, levels.length]);

  const launchGame = async (diff?: Difficulty) => {
    setLoading(true);
    const dur = diff ? MISSING_CONFIG[diff].timer : TIME_PER_LEVEL;
    setTimePer(dur);
    try {
      const [newLevels, names] = await Promise.all([
        getMissingPieceLevels(LEVELS_PER_GAME, diff),
        getPlayerNames(),
      ]);
      setLevels(newLevels);
      setPlayerNames(names);
      setCurrentLevelIndex(0);
      setGuess("");
      setIsCorrect(null);
      setShowSuggestions(false);
      session.startGame();
      timer.reset(dur);
      timer.start();
    } catch {
      console.error("Failed to load levels");
    } finally {
      setLoading(false);
    }
  };

  const handleDifficultySelect = (selection: Difficulty | "all") => {
    const diff = selection === "all" ? undefined : selection;
    setDifficulty(diff);
    if (!isPremium) {
      setShowAd(true);
    } else {
      launchGame(diff);
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
        timePer - POINTS_CONFIG.missing_piece.timeBonusThreshold
      ) {
        points += POINTS_CONFIG.missing_piece.timeBonus;
      }
      const mult = difficulty ? DIFFICULTY_MULTIPLIER[difficulty] : 1;
      session.addScore(Math.round(points * mult));
    }

    setTimeout(() => advanceToNext(), 2500);
  };

  const handleSkip = () => {
    if (isCorrect !== null) return;
    timer.pause();
    setIsCorrect(false);
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

  // ─── AD INTERSTITIAL ───
  if (showAd) {
    return (
      <AdInterstitial
        onClose={() => {
          setShowAd(false);
          launchGame(difficulty);
        }}
      />
    );
  }

  // ─── IDLE ───
  if (session.phase === "idle") {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center space-y-6 pt-8">
        <div className="relative">
          <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E2001A] to-red-800 shadow-xl shadow-[#E2001A]/25">
            <Image src="/images/TheMissingPiece.svg" width={48} height={48} className="drop-shadow-md" alt="The Missing Piece logo" />
          </div>
          <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#00A651] text-xs font-bold text-white shadow-lg">
            {LEVELS_PER_GAME}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold">The Missing Piece</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {LEVELS_PER_GAME} compositions · {TIME_PER_LEVEL}s par niveau
          </p>
        </div>

        <div className="w-full space-y-2 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Comment jouer ?
          </h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-[#E2001A]">•</span>
              Une composition d&apos;équipe est affichée sur le terrain <Users className="inline h-4 w-4 ml-1" />
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E2001A]">•</span>
              Un joueur est manquant — retrouve la pièce manquante ! <Puzzle className="inline h-4 w-4 ml-1" />
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#E2001A]">•</span>
              Réponds vite pour gagner plus de points ! <Timer className="inline h-4 w-4 ml-1" />
            </li>
          </ul>
        </div>

        <DifficultySelector onSelect={handleDifficultySelect} loading={loading} accentColor="red" />
      </div>
    );
  }

  // ─── RESULT ───
  if (session.phase === "result") {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center space-y-6 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E2001A] to-red-800 shadow-xl shadow-[#E2001A]/25">
          {session.score > 0 ? <Trophy className="h-10 w-10 text-white" /> : <Zap className="h-10 w-10 text-white" />}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold">Partie terminée !</h2>
        </div>

        <div className="grid w-full grid-cols-3 gap-3">
          <StatBox
            label="Niveaux"
            value={`${session.currentLevel}/${LEVELS_PER_GAME}`}
            icon={<Target className="h-6 w-6 text-[#E2001A]" />}
          />
          <StatBox
            label="Points"
            value={`+${session.pointsEarned}`}
            icon={<Medal className="h-6 w-6 text-[#C5E86C]" />}
          />
          <StatBox
            label="Temps"
            value={`${session.durationSeconds}s`}
            icon={<Timer className="h-6 w-6 text-emerald-400" />}
          />
        </div>

        <div className="flex w-full gap-3">
          <button
            onClick={() => session.resetGame()}
            className="flex-1 rounded-lg bg-white px-6 py-3 font-bold text-zinc-950 shadow-lg shadow-white/10 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            <span className="flex items-center justify-center gap-2"><RefreshCw className="h-5 w-5" /> Rejouer</span>
          </button>
          <a
            href="/hub"
            className="flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5"
          >
            <Home className="h-5 w-5" /> Hub
          </a>
        </div>
      </div>
    );
  }

  // ─── PLAYING ───
  if (!currentLevel || !missingPlayer) return null;

  const team = currentLevel.team;

  return (
    <div className="mx-auto max-w-md space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-muted-foreground">
            Niveau {currentLevelIndex + 1}/{levels.length}
          </span>
          <span className="rounded-full bg-[#E2001A]/15 px-2 py-0.5 text-xs font-semibold text-[#E2001A]">
            {team.formation}
          </span>
          {team.difficulty && (
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              team.difficulty === 'facile' ? 'bg-emerald-500/15 text-emerald-500' :
              team.difficulty === 'moyen' ? 'bg-amber-500/15 text-amber-500' :
              'bg-red-500/15 text-red-500'
            }`}>
              {team.difficulty === 'facile' ? 'Facile' : team.difficulty === 'moyen' ? 'Moyen' : 'Difficile'}
            </span>
          )}
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
                  ? "stroke-[#E2001A]"
                  : timer.progress > 0.2
                    ? "stroke-amber-500"
                    : "stroke-red-500"
              } transition-all duration-1000 ease-linear`}
            />
          </svg>
          <span
            className={`absolute text-sm font-bold ${
              timer.progress > 0.5
                ? "text-[#E2001A]"
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
        <h3 className="text-lg font-bold"><Flag country={team.pays} size="md" className="mr-2" />{team.pays}</h3>
        <p className="text-xs text-muted-foreground">{team.formation}</p>
      </div>

      {/* Football pitch */}
      <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-lg border-2 border-emerald-700/50 bg-gradient-to-b from-emerald-900 to-zinc-950 shadow-xl">
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
              className="absolute flex flex-col items-center justify-center transition-all duration-500"
              style={{
                left: `${joueur.posX}%`,
                top: `${joueur.posY}%`,
                width: "80px",
                height: "32px",
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Player circle */}
              <div
                className={`flex shrink-0 h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold shadow-md transition-all ${
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
                className={`absolute top-full mt-0.5 w-[80px] text-center text-[9px] font-medium leading-[1.1] ${
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
          <span className="rounded-full bg-[#E2001A]/15 px-3 py-1 text-xs font-bold text-[#E2001A]">
            {missingPlayer.poste === "GK"
              ? "Gardien"
              : missingPlayer.poste === "DEF"
                ? "Défenseur"
                : missingPlayer.poste === "MID"
                  ? "Milieu"
                  : "Attaquant"}
          </span>
          <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-bold text-muted-foreground">
            #{missingPlayer.numero}
          </span>
        </div>
      )}

      {/* Guess input */}
      {isCorrect === null && (
        <div className="relative flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={guess}
            onChange={(e) => {
              setGuess(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Quel joueur ? Tape ta réponse..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white transition-all focus:border-[#E2001A]/50 focus:outline-none focus:ring-2 focus:ring-[#E2001A]/20"
          />
          <button
            onClick={handleSkip}
            className="shrink-0 rounded-lg bg-zinc-800 px-4 text-sm font-semibold text-zinc-400 transition-colors hover:bg-zinc-700"
          >
            Passer
          </button>

          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900 shadow-xl">
              {filteredSuggestions.map((name) => (
                <button
                  key={name}
                  onClick={() => handleGuess(name)}
                  className="w-full px-4 py-2.5 text-left text-sm text-white transition-colors hover:bg-zinc-800 first:rounded-t-lg last:rounded-b-lg"
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
          className={`rounded-lg p-4 text-center animate-in fade-in slide-in-from-bottom-2 duration-300 ${
            isCorrect
              ? "bg-emerald-500/15 text-emerald-500"
              : "bg-red-500/15 text-red-500"
          }`}
        >
          <div className="text-sm font-bold">
            {isCorrect
              ? <span className="flex justify-center items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Bravo ! C&apos;est bien {missingPlayer.prenom} {missingPlayer.nom} !</span>
              : <span className="flex justify-center items-center gap-1.5"><XCircle className="h-4 w-4" /> C&apos;était {missingPlayer.prenom} {missingPlayer.nom}</span>}
          </div>
        </div>
      )}

      {/* Score */}
      <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5">
        <span className="text-xs text-muted-foreground">Score actuel</span>
        <span className="flex items-center gap-1.5 font-bold text-[#E2001A]">
          <Medal className="h-4 w-4" /> {session.pointsEarned} pts
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
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-zinc-800 bg-zinc-900 p-3">
      <div className="flex justify-center">{icon}</div>
      <span className="mt-1 text-lg font-bold">{value}</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}
