"use server";

import { createClient } from "@/lib/supabase/server";
import { getRandomScoutTeams, getAllTeamNames } from "@/lib/scout-data";
import type { ScoutTeamData } from "@/lib/scout-data";

export interface ScoutLevel {
  index: number;
  team: ScoutTeamData;
}

/**
 * Get Scout Master levels (national teams to guess).
 */
export async function getScoutLevels(count: number = 5): Promise<ScoutLevel[]> {
  const teams = getRandomScoutTeams(count);
  return teams.map((team, index) => ({ index, team }));
}

/**
 * Get country names for autocomplete.
 */
export async function getTeamNames(): Promise<string[]> {
  return getAllTeamNames();
}

/**
 * Submit a Scout Master game session.
 */
export async function submitScoutSession(data: {
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
      .eq("type", "scout_master")
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
    console.error("submitScoutSession error:", err);
    return { success: false, error: "Erreur serveur" };
  }
}
