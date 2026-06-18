"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Flag } from "@/components/ui/flag";
import { useTimer } from "@/hooks/use-timer";
import { Search, Shield, Trophy, Timer, Medal, CheckCircle2, XCircle, Zap, Target, RefreshCw, Home } from "lucide-react";
import Image from "next/image";
import { useGameSession } from "@/hooks/use-game-session";
import { usePremiumContext } from "@/components/premium-context";
import { AdInterstitial } from "@/components/games/ad-interstitial";
import { DifficultySelector } from "@/components/games/difficulty-selector";
import { POINTS_CONFIG, SCOUT_CONFIG, DIFFICULTY_MULTIPLIER } from "@/lib/constants";
import type { Difficulty } from "@/lib/constants";
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
  const { isPremium } = usePremiumContext();
  const [levels, setLevels] = useState<ScoutLevel[]>([]);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [revealedCount, setRevealedCount] = useState(3);
  const [guess, setGuess] = useState("");
  const [teamNames, setTeamNames] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>(undefined);
  const [timePer, setTimePer] = useState(TIME_PER_LEVEL);
  const [initialClues, setInitialClues] = useState(3);
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
    setRevealedCount(initialClues);
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
    const cfg = diff ? SCOUT_CONFIG[diff] : { timer: TIME_PER_LEVEL, revealedClues: 3 };
    setTimePer(cfg.timer);
    setInitialClues(cfg.revealedClues);
    try {
      const [newLevels, names] = await Promise.all([
        getScoutLevels(LEVELS_PER_GAME, diff),
        getTeamNames(),
      ]);
      setLevels(newLevels);
      setTeamNames(names);
      setCurrentLevelIndex(0);
      setRevealedCount(cfg.revealedClues);
      setGuess("");
      setIsCorrect(null);
      setShowSuggestions(false);
      session.startGame();
      timer.reset(cfg.timer);
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
      if (timer.secondsLeft >= timePer - POINTS_CONFIG.scout_master.timeBonusThreshold) {
        points += POINTS_CONFIG.scout_master.timeBonus;
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
          <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00A651] to-emerald-800 shadow-xl shadow-[#00A651]/25">
            <Image src="/images/ScoutMaster.svg" width={48} height={48} className="drop-shadow-md" alt="Scout Master logo" />
          </div>
          <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#E2001A] text-xs font-bold text-white shadow-lg">
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

        <div className="w-full space-y-2 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Comment jouer ?
          </h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-[#00A651]">•</span>
              Les clubs des joueurs sont affichés sur le terrain <Shield className="inline h-4 w-4 ml-1" />
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00A651]">•</span>
              Devine quelle équipe nationale c&apos;est ! <Trophy className="inline h-4 w-4 ml-1" />
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00A651]">•</span>
              Moins d&apos;indices = plus de points ! <Medal className="inline h-4 w-4 ml-1" />
            </li>
          </ul>
        </div>

        <DifficultySelector onSelect={handleDifficultySelect} loading={loading} accentColor="green" />
      </div>
    );
  }

  // ─── RESULT ───
  if (session.phase === "result") {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center space-y-6 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00A651] to-emerald-800 shadow-xl shadow-[#00A651]/25">
          {session.score > 0 ? <Trophy className="h-10 w-10 text-white" /> : <Zap className="h-10 w-10 text-white" />}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold">Partie terminée !</h2>
        </div>

        <div className="grid w-full grid-cols-3 gap-3">
          <StatBox label="Niveaux" value={`${session.currentLevel}/${LEVELS_PER_GAME}`} icon={<Target className="h-6 w-6 text-[#00A651]" />} />
          <StatBox label="Points" value={`+${session.pointsEarned}`} icon={<Medal className="h-6 w-6 text-[#C5E86C]" />} />
          <StatBox label="Temps" value={`${session.durationSeconds}s`} icon={<Timer className="h-6 w-6 text-emerald-400" />} />
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
  if (!currentLevel) return null;

  const team = currentLevel.team;
  const totalClues = team.joueurs.length;

  return (
    <div className="mx-auto max-w-md space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-muted-foreground">
            Niveau {currentLevelIndex + 1}/{levels.length}
          </span>
          <span className="rounded-full bg-[#00A651]/15 px-3 py-1 text-xs font-semibold text-[#00A651]">
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
                  ? "stroke-[#00A651]"
                  : timer.progress > 0.2
                    ? "stroke-amber-500"
                    : "stroke-red-500"
              } transition-all duration-1000 ease-linear`}
            />
          </svg>
          <span className={`absolute text-sm font-bold ${
            timer.progress > 0.5
              ? "text-[#00A651]"
              : timer.progress > 0.2
                ? "text-amber-500"
                : "text-red-500"
          }`}>
            {timer.secondsLeft}
          </span>
        </div>
      </div>

      {/* Football pitch with club badges */}
      <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-lg border-2 border-emerald-700/50 bg-gradient-to-b from-emerald-950 to-zinc-950 shadow-2xl">
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
              className={`absolute flex flex-col items-center justify-center transition-all duration-700 ${
                isVisible || isRevealed
                  ? "scale-100 opacity-100"
                  : "scale-50 opacity-0"
              }`}
              style={{
                left: `${joueur.posX}%`,
                top: `${joueur.posY}%`,
                width: "80px",
                height: "24px",
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Club badge */}
              <div
                className={`flex shrink-0 items-center justify-center rounded-md px-1.5 py-1 text-center shadow-md transition-all sm:max-w-[80px] z-10 ${
                  isVisible || isRevealed
                    ? "bg-white/95 shadow-black/20 hover:scale-150 hover:z-50"
                    : "bg-white/20"
                }`}
                style={{ maxWidth: '78px' }}
              >
                <span className="text-[8px] font-bold leading-[1.1] tracking-tighter text-zinc-950 sm:text-[9px] break-words">
                  {isVisible || isRevealed ? joueur.club : "?"}
                </span>
              </div>
              {/* Player name (shown on reveal) */}
              {isRevealed && (
                <span className="absolute top-full mt-0.5 w-[80px] text-center text-[9px] font-medium leading-[1.1] text-white/70 sm:text-[10px]">
                  {joueur.nom}
                </span>
              )}
            </div>
          );
        })}

        {/* Mystery overlay when not all revealed */}
      </div>

      {/* Reveal more button */}
      {isCorrect === null && revealedCount < totalClues && (
        <button
          onClick={handleRevealMore}
          className="w-full justify-center flex items-center gap-2 rounded-lg border border-[#00A651]/30 bg-[#00A651]/10 px-4 py-2.5 text-sm font-semibold text-[#00A651] transition-all hover:bg-[#00A651]/20"
        >
          <Search className="h-4 w-4" /> Révéler plus de clubs ({revealedCount}/{totalClues})
        </button>
      )}

      {/* Guess input with autocomplete */}
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
            placeholder="Quelle sélection ? Tape le pays..."
            className="w-full rounded-lg border border-[#252536] bg-[#141420] px-4 py-3 text-sm text-white transition-all focus:border-[#00A651]/50 focus:outline-none focus:ring-2 focus:ring-[#00A651]/20"
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
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-white transition-colors hover:bg-zinc-800 first:rounded-t-lg last:rounded-b-lg"
                >
                  <Flag country={name} size="sm" />
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
          <div className="flex justify-center"><Flag country={currentLevel.team.pays} size="lg" /></div>
          <div className="mt-1.5 text-sm font-bold">
            {isCorrect
              ? <span className="flex justify-center items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Bravo ! C&apos;est bien {team.pays} !</span>
              : <span className="flex justify-center items-center gap-1.5"><XCircle className="h-4 w-4" /> C&apos;était {team.pays}</span>}
          </div>
        </div>
      )}

      {/* Score */}
      <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5">
        <span className="text-xs text-muted-foreground">Score actuel</span>
        <span className="flex items-center gap-1.5 font-bold text-[#00A651]">
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
