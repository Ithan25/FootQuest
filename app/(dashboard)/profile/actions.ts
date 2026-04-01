"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  // Query without banner_url first (column may not exist yet)
  let profile: Record<string, unknown> | null = null;

  const { data: fullProfile, error: fullErr } = await supabase
    .from("utilisateur")
    .select("pseudo, foot_points, role, avatar_url, banner_url, created_at")
    .eq("id", user.id)
    .single();

  if (fullErr) {
    // Fallback: query without banner_url (column might not exist)
    const { data: basicProfile } = await supabase
      .from("utilisateur")
      .select("pseudo, foot_points, role, avatar_url, created_at")
      .eq("id", user.id)
      .single();
    profile = basicProfile as Record<string, unknown> | null;
  } else {
    profile = fullProfile as Record<string, unknown> | null;
  }

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
    pseudo: (profile?.pseudo as string) || user.email?.split("@")[0] || "Joueur",
    footPoints: (profile?.foot_points as number) || 0,
    role: ((profile?.role as string) || "basic"),
    avatarUrl: (profile?.avatar_url as string) || null,
    bannerUrl: (profile?.banner_url as string) || null,
    totalGames: totalGames || 0,
    totalPoints,
    bestScore: bestScore?.[0]?.points_gagnes || 0,
    joinDate: profile?.created_at
      ? new Date(profile.created_at as string).toLocaleDateString("fr-FR", {
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
    if (uploadError.message.includes("Bucket not found") || uploadError.message.includes("row-level security")) {
      return { url: null, error: "⚠️ Le bucket 'profiles' n'existe pas. Tu dois exécuter le script profile-storage.sql dans Supabase." };
    }
    return { url: null, error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("profiles").getPublicUrl(path);

  const url = `${publicUrl}?t=${Date.now()}`;

  // Try to update with banner_url column, fallback to just avatar_url
  const column = type === "avatar" ? "avatar_url" : "banner_url";
  const { error: updateError } = await supabase
    .from("utilisateur")
    .update({ [column]: url })
    .eq("id", user.id);

  if (updateError) {
    // If banner_url column doesn't exist, just store the URL without DB update
    if (column === "banner_url" && updateError.message.includes("banner_url")) {
      return { url, error: null }; // Still return the URL even if DB update fails
    }
    console.error("Update error:", updateError);
    return { url: null, error: updateError.message };
  }

  revalidatePath("/profile");
  return { url, error: null };
}
