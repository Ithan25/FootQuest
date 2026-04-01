"use server";

import { createClient } from "@/lib/supabase/server";
import { TRIVIA_QUESTIONS } from "@/lib/trivia-data";

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
 * Get random trivia questions.
 * Maps from local data format to component-expected format.
 */
export async function getRandomQuestions(
  count: number = 10
): Promise<TriviaQuestionWithAnswers[]> {
  const shuffled = [...TRIVIA_QUESTIONS]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  return shuffled.map((q, index) => {
    // Build answer objects from the string array + correct index
    const answers: TriviaAnswer[] = q.reponses.map((text, rIndex) => ({
      id: `answer-${index}-${rIndex}`,
      question_id: `trivia-${index}`,
      reponse: text,
      est_correcte: rIndex === q.bonneReponse,
    }));

    // Shuffle answers so the correct one isn't always in the same position
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
