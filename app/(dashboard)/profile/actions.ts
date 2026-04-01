"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("utilisateur")
    .select("pseudo, foot_points, role, avatar_url, banner_url, created_at")
    .eq("id", user.id)
    .single();

  const { count: totalGames } = await supabase
    .from("session_partie")
    .select("*", { count: "exact", head: true })
    .eq("utilisateur_id", user.id);

  const { data: sessionsData } = await supabase
    .from("session_partie")
    .select("points_gagnes")
    .eq("utilisateur_id", user.id);

  const totalPoints =
    sessionsData?.reduce((sum, s) => sum + (s.points_gagnes || 0), 0) || 0;

  const { data: bestScore } = await supabase
    .from("session_partie")
    .select("points_gagnes")
    .eq("utilisateur_id", user.id)
    .order("points_gagnes", { ascending: false })
    .limit(1);

  return {
    id: user.id,
    email: user.email || "",
    pseudo: profile?.pseudo || user.email?.split("@")[0] || "Joueur",
    footPoints: profile?.foot_points || 0,
    role: (profile?.role || "basic") as string,
    avatarUrl: profile?.avatar_url || null,
    bannerUrl: profile?.banner_url || null,
    totalGames: totalGames || 0,
    totalPoints,
    bestScore: bestScore?.[0]?.points_gagnes || 0,
    joinDate: profile?.created_at
      ? new Date(profile.created_at).toLocaleDateString("fr-FR", {
          month: "long",
          year: "numeric",
        })
      : "Récemment",
  };
}

export async function uploadProfileImage(
  formData: FormData
): Promise<{ url: string | null; error: string | null }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { url: null, error: "Non authentifié" };

  const file = formData.get("file") as File;
  const type = formData.get("type") as string; // "avatar" or "banner"

  if (!file || file.size === 0) return { url: null, error: "Aucun fichier" };
  if (file.size > 5 * 1024 * 1024) return { url: null, error: "Max 5MB" };

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${user.id}/${type}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("profiles")
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return { url: null, error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("profiles").getPublicUrl(path);

  // Add cache-busting param
  const url = `${publicUrl}?t=${Date.now()}`;

  // Update user profile
  const column = type === "avatar" ? "avatar_url" : "banner_url";
  const { error: updateError } = await supabase
    .from("utilisateur")
    .update({ [column]: url })
    .eq("id", user.id);

  if (updateError) {
    console.error("Update error:", updateError);
    return { url: null, error: updateError.message };
  }

  revalidatePath("/profile");
  return { url, error: null };
}
