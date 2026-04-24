"use client";

import { useState, useCallback, useEffect } from "react";
import { useTimer } from "@/hooks/use-timer";
import { Flame, Trophy, ThumbsUp, Medal, Timer, Target, Zap, CheckCircle2, XCircle, Gamepad2, RefreshCw, Home } from "lucide-react";
import Image from "next/image";
import { useGameSession } from "@/hooks/use-game-session";
import { usePremiumContext } from "@/components/premium-context";
import { AdInterstitial } from "@/components/games/ad-interstitial";
import { DifficultySelector } from "@/components/games/difficulty-selector";
import { TRIVIA_TIMER_SECONDS, TRIVIA_CONFIG, DIFFICULTY_MULTIPLIER, POINTS_CONFIG } from "@/lib/constants";
import type { Difficulty } from "@/lib/constants";
import type { TriviaQuestionWithAnswers } from "@/app/(dashboard)/games/foot-trivia/actions";
import {
  getRandomQuestions,
  submitTriviaSession,
} from "@/app/(dashboard)/games/foot-trivia/actions";

const QUESTIONS_PER_GAME = 10;

export function TriviaGame() {
  const session = useGameSession("foot_trivia");
  const { isPremium } = usePremiumContext();
  const [questions, setQuestions] = useState<TriviaQuestionWithAnswers[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>(undefined);
  const [timerDuration, setTimerDuration] = useState(TRIVIA_TIMER_SECONDS);

  const currentQuestion = questions[currentIndex];

  const handleTimeUp = useCallback(() => {
    if (!isRevealed) {
      setIsRevealed(true);
      setStreak(0);
      // Auto advance after 2s
      setTimeout(() => advanceToNext(), 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRevealed]);

  const timer = useTimer({
    duration: timerDuration,
    onExpire: handleTimeUp,
    autoStart: false,
  });

  const advanceToNext = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      session.endGame();
      return;
    }
    setAnimatingOut(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsRevealed(false);
      setAnimatingOut(false);
      timer.reset(timerDuration);
      timer.start();
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, questions.length]);

  const launchGame = async (diff?: Difficulty) => {
    setLoading(true);
    const dur = diff ? TRIVIA_CONFIG[diff].timer : TRIVIA_TIMER_SECONDS;
    setTimerDuration(dur);
    try {
      const q = await getRandomQuestions(QUESTIONS_PER_GAME, diff || "all");
      setQuestions(q);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setIsRevealed(false);
      setStreak(0);
      setCorrectCount(0);
      session.startGame();
      timer.reset(dur);
      timer.start();
    } catch {
      console.error("Failed to load questions");
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

  const handleSelectAnswer = (answerId: string) => {
    if (isRevealed || selectedAnswer) return;

    setSelectedAnswer(answerId);
    setIsRevealed(true);
    timer.pause();

    const answer = currentQuestion.reponses.find((r) => r.id === answerId);
    if (answer?.est_correcte) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setCorrectCount((prev) => prev + 1);

      const basePts = currentQuestion.points || 10;
      let points = basePts;
      if (newStreak >= 3) {
        const streakMultiplier = (newStreak - 2) * 0.2;
        points += Math.round(basePts * streakMultiplier);
      }
      const mult = difficulty ? DIFFICULTY_MULTIPLIER[difficulty] : 1;
      session.addScore(Math.round(points * mult));
    } else {
      setStreak(0);
    }

    // Auto advance after showing result
    setTimeout(() => advanceToNext(), 1800);
  };

  // Submit session when game ends
  useEffect(() => {
    if (session.phase === "result" && session.durationSeconds !== null) {
      submitTriviaSession({
        score: session.score,
        pointsEarned: session.pointsEarned,
        durationSeconds: session.durationSeconds,
        totalQuestions: QUESTIONS_PER_GAME,
        correctAnswers: correctCount,
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

  // ─── IDLE: Start screen ───
  if (session.phase === "idle") {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center space-y-6 pt-8">
        {/* Game icon */}
        <div className="relative">
          <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFE600] to-amber-600 shadow-xl shadow-[#FFE600]/25">
            <Image src="/images/FootTrivia.svg" width={48} height={48} className="drop-shadow-md" alt="Foot Trivia logo" />
          </div>
          <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#00FF87] text-xs font-bold text-zinc-950 shadow-lg">
            {QUESTIONS_PER_GAME}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold">Foot Trivia</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {QUESTIONS_PER_GAME} questions · {TRIVIA_TIMER_SECONDS}s par
            question
          </p>
        </div>

        {/* Rules */}
        <div className="w-full space-y-2 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <h3 className="text-sm font-semibold text-muted-foreground">
            Règles du jeu
          </h3>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-[#FFE600]">•</span>
              Réponds à {QUESTIONS_PER_GAME} questions de culture foot
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FFE600]">•</span>
              {TRIVIA_TIMER_SECONDS} secondes par question
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FFE600]">•</span>
              Bonus progressif (streak) dès 3 bonnes réponses d&apos;affilée ! <Flame className="inline h-4 w-4 text-orange-500 ml-1" />
            </li>
          </ul>
        </div>

        <DifficultySelector onSelect={handleDifficultySelect} loading={loading} accentColor="amber" />
      </div>
    );
  }

  // ─── RESULT: End screen ───
  if (session.phase === "result") {
    const percentage = Math.round((correctCount / QUESTIONS_PER_GAME) * 100);

    return (
      <div className="mx-auto flex max-w-md flex-col items-center space-y-6 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFE600] to-amber-600 shadow-xl shadow-[#FFE600]/25">
          {percentage >= 80 ? <Trophy className="h-10 w-10 text-white" /> : percentage >= 50 ? <ThumbsUp className="h-10 w-10 text-white" /> : <Zap className="h-10 w-10 text-white" />}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold">Partie terminée !</h2>
          <p className="mt-1 text-muted-foreground">
            {correctCount}/{QUESTIONS_PER_GAME} bonnes réponses
          </p>
        </div>

        {/* Stats */}
        <div className="grid w-full grid-cols-3 gap-3">
          <StatBox label="Score" value={`${percentage}%`} icon={<Target className="h-6 w-6 text-[#FFE600]" />} />
          <StatBox
            label="Points"
            value={`+${session.pointsEarned}`}
            icon={<Medal className="h-6 w-6 text-[#FF007F]" />}
          />
          <StatBox
            label="Temps"
            value={`${session.durationSeconds}s`}
            icon={<Timer className="h-6 w-6 text-emerald-400" />}
          />
        </div>

        {/* Score bar */}
        <div className="w-full space-y-2">
          <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FFE600] to-amber-500 transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="flex w-full gap-3">
          <button
            onClick={() => session.resetGame()}
            className="flex-1 rounded-lg bg-[#FFE600] px-6 py-3 font-bold text-zinc-950 shadow-lg shadow-[#FFE600]/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
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

  // ─── PLAYING: Question screen ───
  if (!currentQuestion) return null;

  const correctAnswer = currentQuestion.reponses.find(
    (r) => r.est_correcte
  );
  const timerColor =
    timer.progress > 0.5
      ? "text-emerald-500"
      : timer.progress > 0.2
        ? "text-amber-500"
        : "text-red-500";

  const timerStroke =
    timer.progress > 0.5
      ? "stroke-emerald-500"
      : timer.progress > 0.2
        ? "stroke-amber-500"
        : "stroke-red-500";

  return (
    <div
      className={`mx-auto max-w-md space-y-5 transition-all duration-300 ${
        animatingOut
          ? "translate-x-[-20px] opacity-0"
          : "translate-x-0 opacity-100"
      }`}
    >
      {/* Top bar: Progress + Timer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-muted-foreground">
            {currentIndex + 1}/{questions.length}
          </span>
          {/* Progress dots */}
          <div className="flex gap-1">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i < currentIndex
                    ? "bg-emerald-500"
                    : i === currentIndex
                      ? "bg-amber-500"
                      : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Circular Timer */}
        <div className="relative flex h-12 w-12 items-center justify-center">
          <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-muted/30"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - timer.progress)}`}
              className={`${timerStroke} transition-all duration-1000 ease-linear`}
            />
          </svg>
          <span
            className={`absolute text-sm font-bold ${timerColor} transition-colors`}
          >
            {timer.secondsLeft}
          </span>
        </div>
      </div>

      {/* Streak indicator */}
      {streak >= 3 && (
        <div className="flex items-center justify-center animate-in fade-in slide-in-from-top-2 duration-300">
          <span className="flex items-center gap-1.5 text-sm font-bold text-orange-500">
            <Flame className="h-4 w-4" /> Streak x{streak}
          </span>
        </div>
      )}

      {/* Category + Difficulty */}
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-[#FFE600]/15 px-3 py-1 text-xs font-semibold text-[#FFE600]">
          {currentQuestion.categorie}
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            currentQuestion.difficulte === "facile"
              ? "bg-emerald-500/15 text-emerald-500"
              : currentQuestion.difficulte === "moyen"
                ? "bg-amber-500/15 text-amber-500"
                : "bg-red-500/15 text-red-500"
          }`}
        >
          {currentQuestion.difficulte === "facile"
            ? "Facile"
            : currentQuestion.difficulte === "moyen"
              ? "Moyen"
              : "Difficile"}
        </span>
        <span className="ml-auto text-xs text-muted-foreground">
          +{currentQuestion.points} pts
        </span>
      </div>

      {/* Question */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
        <h3 className="text-base font-bold leading-relaxed">
          {currentQuestion.question}
        </h3>
      </div>

      {/* Answers */}
      <div className="space-y-3">
        {currentQuestion.reponses.map((answer, index) => {
          const isSelected = selectedAnswer === answer.id;
          const isCorrect = answer.est_correcte;
          const letter = String.fromCharCode(65 + index); // A, B, C, D

          let answerStyle =
            "border-zinc-800 bg-zinc-900 hover:-translate-y-0.5 hover:shadow-md";

          if (isRevealed) {
            if (isCorrect) {
              answerStyle =
                "border-emerald-500/50 bg-emerald-500/15 shadow-emerald-500/10 shadow-lg";
            } else if (isSelected && !isCorrect) {
              answerStyle =
                "border-red-500/50 bg-red-500/15 shadow-red-500/10 shadow-lg";
            } else {
              answerStyle = "border-zinc-800/50 bg-zinc-900/30 opacity-50";
            }
          }

          return (
            <button
              key={answer.id}
              onClick={() => handleSelectAnswer(answer.id)}
              disabled={isRevealed}
              className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-all ${answerStyle}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                  isRevealed && isCorrect
                    ? "bg-emerald-500 text-white"
                    : isRevealed && isSelected && !isCorrect
                      ? "bg-red-500 text-white"
                      : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {isRevealed && isCorrect
                  ? "✓"
                  : isRevealed && isSelected && !isCorrect
                    ? "✗"
                    : letter}
              </span>
              <span className="text-sm font-medium">{answer.reponse}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback after answer */}
      {isRevealed && (
        <div
          className={`rounded-lg p-3 text-center text-sm font-semibold animate-in fade-in slide-in-from-bottom-2 duration-300 ${
            selectedAnswer &&
            currentQuestion.reponses.find((r) => r.id === selectedAnswer)
              ?.est_correcte
              ? "bg-emerald-500/15 text-emerald-500"
              : "bg-red-500/15 text-red-500"
          }`}
        >
          {selectedAnswer && currentQuestion.reponses.find((r) => r.id === selectedAnswer)?.est_correcte
            ? (() => {
                const basePtsForUI = currentQuestion.points || 10;
                const multUI = difficulty ? DIFFICULTY_MULTIPLIER[difficulty] : 1;
                const streakBonusUI = streak >= 3 ? Math.round(basePtsForUI * ((streak - 2) * 0.2)) : 0;
                return (
                  <span className="flex justify-center items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" /> Bonne réponse ! +{Math.round(basePtsForUI * multUI)}
                    {streak >= 3 && (
                      <span className="flex items-center ml-1">
                        +{Math.round(streakBonusUI * multUI)} streak bonus <Flame className="h-3.5 w-3.5 ml-1" />
                      </span>
                    )}
                  </span>
                );
              })()
            : <span className="flex justify-center items-center gap-1.5"><XCircle className="h-4 w-4" /> Mauvaise réponse ! C'était : {correctAnswer?.reponse}</span>}
        </div>
      )}

      {/* Score display */}
      <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5">
        <span className="text-xs text-muted-foreground">Score actuel</span>
        <span className="flex items-center gap-1.5 font-bold text-[#FFE600]">
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
