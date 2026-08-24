"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

interface ShopReward {
  id: string;
  nom: string;
  description: string | null;
  image_url: string | null;
  cout_points: number;
  stock: number;
  partenaire: {
    nom: string;
    logo_url: string | null;
  } | null;
}

interface UserReward {
  id: string;
  code_unique: string;
  statut: "actif" | "utilise" | "expire";
  date_obtention: string;
  recompense: {
    nom: string;
    image_url: string | null;
    partenaire: {
      nom: string;
      site_web: string | null;
    } | null;
  } | null;
}

export interface ShopData {
  rewards: ShopReward[];
  userRewards: UserReward[];
  userPoints: number;
}

export async function getShopData(): Promise<ShopData> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { rewards: [], userRewards: [], userPoints: 0 };
  }

  // Get user's FootPoints
  const { data: profile } = await supabase
    .from("utilisateur")
    .select("foot_points")
    .eq("id", user.id)
    .single();

  // Get active rewards with partner info
  const { data: rewards } = await supabase
    .from("recompense")
    .select(
      `
      id,
      nom,
      description,
      image_url,
      cout_points,
      stock,
      partenaire (
        nom,
        logo_url
      )
    `
    )
    .eq("actif", true)
    .order("cout_points", { ascending: true });

  // Get user's claimed rewards with partner site URL
  const { data: userRewards } = await supabase
    .from("obtention_recompense")
    .select(
      `
      id,
      code_unique,
      statut,
      date_obtention,
      recompense (
        nom,
        image_url,
        partenaire (
          nom,
          site_web
        )
      )
    `
    )
    .eq("utilisateur_id", user.id)
    .order("date_obtention", { ascending: false });

  return {
    rewards: (rewards as unknown as ShopReward[]) || [],
    userRewards: (userRewards as unknown as UserReward[]) || [],
    userPoints: profile?.foot_points || 0,
  };
}

export async function claimReward(
  rewardId: string
): Promise<{ success: boolean; error: string | null; code?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Non authentifié" };
  }

  // 1. Try calling the atomic RPC function first
  try {
    const { data: rpcData, error: rpcError } = await supabase.rpc("claim_reward", {
      p_user_id: user.id,
      p_reward_id: rewardId,
    });

    if (!rpcError && rpcData) {
      const result = rpcData as {
        success: boolean;
        error?: string;
        code?: string;
      };
      if (result.success) {
        revalidatePath("/shop");
        revalidatePath("/hub");
        revalidatePath("/profile");
        return { success: true, error: null, code: result.code };
      }
      return { success: false, error: result.error || "Erreur lors de l'achat" };
    }
  } catch {
    // RPC function not found or failed, fall back to direct queries
  }

  // 2. Direct fallback (if RPC function has not been created in Supabase yet)
  const { data: profile } = await supabase
    .from("utilisateur")
    .select("foot_points")
    .eq("id", user.id)
    .single();

  if (!profile) return { success: false, error: "Profil introuvable" };

  const { data: reward } = await supabase
    .from("recompense")
    .select("id, nom, cout_points, stock, actif")
    .eq("id", rewardId)
    .single();

  if (!reward || !reward.actif) {
    return { success: false, error: "Récompense indisponible" };
  }

  if (reward.stock <= 0) {
    return { success: false, error: "Stock épuisé" };
  }

  if (profile.foot_points < reward.cout_points) {
    return {
      success: false,
      error: `Il te manque ${(reward.cout_points - profile.foot_points).toLocaleString("fr-FR")} FootPoints`,
    };
  }

  // Deduct points
  const { error: pointsError } = await supabase
    .from("utilisateur")
    .update({ foot_points: profile.foot_points - reward.cout_points })
    .eq("id", user.id);

  if (pointsError) {
    return { success: false, error: "Erreur lors de la déduction des points" };
  }

  // Try updating stock (may be silently skipped if RLS blocks update)
  await supabase
    .from("recompense")
    .update({ stock: Math.max(0, reward.stock - 1) })
    .eq("id", rewardId);

  // Insert claimed reward
  const { data: claim, error: claimError } = await supabase
    .from("obtention_recompense")
    .insert({
      utilisateur_id: user.id,
      recompense_id: rewardId,
    })
    .select("code_unique")
    .single();

  if (claimError) {
    // Rollback points
    await supabase
      .from("utilisateur")
      .update({ foot_points: profile.foot_points })
      .eq("id", user.id);

    return { success: false, error: "Erreur lors de la réclamation" };
  }

  // Auto-apply in-game titles / badges / avatars / banners
  const rewardName = reward.nom;
  if (rewardName.includes("Badge")) {
    await supabase.from("utilisateur").update({ active_badge: rewardName }).eq("id", user.id);
  } else if (rewardName.includes("Titre")) {
    await supabase.from("utilisateur").update({ active_title: rewardName }).eq("id", user.id);
  } else if (rewardName.includes("Avatar")) {
    const avatarUrl = "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=300&q=80";
    await supabase.from("utilisateur").update({ avatar_url: avatarUrl }).eq("id", user.id);
  } else if (rewardName.includes("Bannière") || rewardName.includes("Banniere")) {
    const bannerUrl = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80";
    await supabase.from("utilisateur").update({ banner_url: bannerUrl }).eq("id", user.id);
  }

  revalidatePath("/shop");
  revalidatePath("/hub");
  revalidatePath("/profile");

  return {
    success: true,
    error: null,
    code: claim?.code_unique,
  };
}
