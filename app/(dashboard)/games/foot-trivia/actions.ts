"use server";

import { createClient } from "@/lib/supabase/server";
import { TRIVIA_QUESTIONS } from "@/lib/trivia-data";
import type { TriviaQuestion, TriviaAnswer } from "@/lib/types/database";

export interface TriviaQuestionWithAnswers extends TriviaQuestion {
  reponses: TriviaAnswer[];
}

/**
 * Get random trivia questions.
 * For MVP, we use the local trivia-data.ts (no DB dependency).
 * Returns questions with shuffled answers.
 */
export async function getRandomQuestions(
  count: number = 10
): Promise<TriviaQuestionWithAnswers[]> {
  // Shuffle and pick `count` questions from the pool
  const shuffled = [...TRIVIA_QUESTIONS]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  // Map to match the TriviaQuestionWithAnswers shape
  return shuffled.map((q, index) => ({
    id: `trivia-${index}`,
    question: q.question,
    categorie: q.categorie,
    difficulte: q.difficulte,
    points: q.points,
    reponses: q.reponses
      .sort(() => Math.random() - 0.5) // shuffle answers
      .map((r, rIndex) => ({
        id: `answer-${index}-${rIndex}`,
        question_id: `trivia-${index}`,
        reponse: r.reponse,
        est_correcte: r.est_correcte,
      })),
  }));
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

    // Get the Foot Trivia game ID
    const { data: jeu } = await supabase
      .from("jeu")
      .select("id")
      .eq("type", "foot_trivia")
      .single();

    if (!jeu) {
      return { success: false, error: "Jeu non trouvé" };
    }

    // Insert game session
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
