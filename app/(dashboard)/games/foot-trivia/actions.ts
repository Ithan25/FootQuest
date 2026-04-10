"use server";

import { createClient } from "@/lib/supabase/server";
import { TRIVIA_QUESTIONS } from "@/lib/trivia-data";
import type { Difficulty } from "@/lib/constants";

export interface TriviaAnswer {
  id: string;
  question_id: string;
  reponse: string;
  est_correcte: boolean;
}

export interface TriviaQuestionWithAnswers {
  id: string;
  question: string;
  categorie: string;
  difficulte: string;
  points: number;
  reponses: TriviaAnswer[];
}

/**
 * Get random trivia questions filtered by difficulty.
 * - facile: only "facile" questions
 * - moyen: mix of "facile" + "moyen"
 * - difficile: mix of "moyen" + "difficile"
 */
export async function getRandomQuestions(
  count: number = 10,
  difficulty: Difficulty = "facile"
): Promise<TriviaQuestionWithAnswers[]> {
  let pool = TRIVIA_QUESTIONS;
  
  if (difficulty === "facile") {
    pool = TRIVIA_QUESTIONS.filter((q) => q.difficulte === "facile");
  } else if (difficulty === "moyen") {
    pool = TRIVIA_QUESTIONS.filter((q) => q.difficulte === "facile" || q.difficulte === "moyen");
  } else {
    pool = TRIVIA_QUESTIONS.filter((q) => q.difficulte === "moyen" || q.difficulte === "difficile");
  }
  
  const shuffled = [...pool]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  return shuffled.map((q, index) => {
    const answers: TriviaAnswer[] = q.reponses.map((text, rIndex) => ({
      id: `answer-${index}-${rIndex}`,
      question_id: `trivia-${index}`,
      reponse: text,
      est_correcte: rIndex === q.bonneReponse,
    }));

    const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);

    return {
      id: `trivia-${index}`,
      question: q.question,
      categorie: q.categorie,
      difficulte: q.difficulte,
      points: q.points,
      reponses: shuffledAnswers,
    };
  });
}

/**
 * Submit a trivia game session to Supabase.
 */
export async function submitTriviaSession(data: {
  score: number;
  pointsEarned: number;
  durationSeconds: number;
  totalQuestions: number;
  correctAnswers: number;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Non authentifié" };
    }

    const { data: jeu } = await supabase
      .from("jeu")
      .select("id")
      .eq("type", "foot_trivia")
      .single();

    if (!jeu) {
      return { success: false, error: "Jeu non trouvé" };
    }

    const { error } = await supabase.from("session_partie").insert({
      utilisateur_id: user.id,
      jeu_id: jeu.id,
      score: data.correctAnswers,
      points_gagnes: data.pointsEarned,
      duree_secondes: data.durationSeconds,
      niveau_atteint: data.totalQuestions,
      complete: true,
    });

    if (error) {
      console.error("Error saving session:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("submitTriviaSession error:", err);
    return { success: false, error: "Erreur serveur" };
  }
}
