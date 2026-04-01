"use server";

import { createClient } from "@/lib/supabase/server";
import {
  getRandomMissingPieceLevels,
  getAllPlayerNames,
} from "@/lib/missing-data";
import type { MissingPieceTeamData } from "@/lib/missing-data";

export interface MissingPieceLevel {
  index: number;
  team: MissingPieceTeamData;
}

/**
 * Get Missing Piece levels.
 */
export async function getMissingPieceLevels(
  count: number = 5
): Promise<MissingPieceLevel[]> {
  const teams = getRandomMissingPieceLevels(count);
  return teams.map((team, index) => ({ index, team }));
}

/**
 * Get all player names for autocomplete.
 */
export async function getPlayerNames(): Promise<string[]> {
  return getAllPlayerNames();
}

/**
 * Submit a Missing Piece game session.
 */
export async function submitMissingSession(data: {
  score: number;
  pointsEarned: number;
  durationSeconds: number;
  levelsCompleted: number;
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
      .eq("type", "missing_piece")
      .single();

    if (!jeu) {
      return { success: false, error: "Jeu non trouvé" };
    }

    const { error } = await supabase.from("session_partie").insert({
      utilisateur_id: user.id,
      jeu_id: jeu.id,
      score: data.score,
      points_gagnes: data.pointsEarned,
      duree_secondes: data.durationSeconds,
      niveau_atteint: data.levelsCompleted,
      complete: true,
    });

    if (error) {
      console.error("Error saving session:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("submitMissingSession error:", err);
    return { success: false, error: "Erreur serveur" };
  }
}
