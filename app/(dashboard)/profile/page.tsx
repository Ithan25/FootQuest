import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Get profile data
  const { data: profile } = await supabase
    .from("utilisateur")
    .select("pseudo, foot_points, role, created_at")
    .eq("id", user.id)
    .single();

  // Get total games played
  const { count: totalGames } = await supabase
    .from("session_partie")
    .select("*", { count: "exact", head: true })
    .eq("utilisateur_id", user.id);

  // Get total points earned
  const { data: sessionsData } = await supabase
    .from("session_partie")
    .select("points_gagnes")
    .eq("utilisateur_id", user.id);

  const totalPoints = sessionsData?.reduce((sum, s) => sum + (s.points_gagnes || 0), 0) || 0;

  // Get best game scores
  const { data: scoutBest } = await supabase
    .from("session_partie")
    .select("score, points_gagnes")
    .eq("utilisateur_id", user.id)
    .order("points_gagnes", { ascending: false })
    .limit(1);

  const pseudo = profile?.pseudo || user.email?.split("@")[0] || "Joueur";
  const footPoints = profile?.foot_points || 0;
  const role = profile?.role || "basic";
  const joinDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })
    : "Récemment";

  return (
    <div className="space-y-8">
      {/* Profile card */}
      <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03]">
        {/* Banner */}
        <div className="h-24 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 sm:h-32">
          <div className="absolute inset-x-0 top-0 h-24 overflow-hidden sm:h-32">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-black/10" />
          </div>
        </div>

        {/* Avatar + info */}
        <div className="relative px-6 pb-6">
          <div className="-mt-10 flex items-end gap-4 sm:-mt-12">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-[#080c15] bg-gradient-to-br from-emerald-500 to-emerald-700 text-3xl shadow-xl sm:h-24 sm:w-24 sm:text-4xl">
              ⚽
            </div>
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white sm:text-2xl">{pseudo}</h1>
                {role === "golden_ball" && (
                  <span className="rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-2.5 py-0.5 text-[10px] font-bold text-black">
                    ⭐ PREMIUM
                  </span>
                )}
              </div>
              <p className="text-sm text-white/40">Membre depuis {joinDate}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats grid */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <ProfileStat icon="💰" label="FootPoints" value={footPoints.toLocaleString("fr-FR")} color="text-amber-400" />
        <ProfileStat icon="🎮" label="Parties jouées" value={String(totalGames || 0)} color="text-emerald-400" />
        <ProfileStat icon="🏅" label="Points gagnés" value={totalPoints.toLocaleString("fr-FR")} color="text-purple-400" />
        <ProfileStat icon="⭐" label="Meilleur score" value={String(scoutBest?.[0]?.points_gagnes || 0)} color="text-blue-400" />
      </section>

      {/* Account info */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">📋 Informations</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] divide-y divide-white/[0.06]">
          <InfoRow label="Pseudo" value={pseudo} />
          <InfoRow label="Email" value={user.email || "—"} />
          <InfoRow label="Rôle" value={role === "golden_ball" ? "⭐ Golden Ball" : "🟢 Basic"} />
          <InfoRow label="Membre depuis" value={joinDate} />
        </div>
      </section>

      {/* Actions */}
      <section className="space-y-3">
        <form action="/auth/signout" method="POST">
          <button
            type="submit"
            className="w-full rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-3 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20"
          >
            🚪 Se déconnecter
          </button>
        </form>
      </section>
    </div>
  );
}

function ProfileStat({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 text-center">
      <div className="text-xl">{icon}</div>
      <div className={`mt-1.5 text-xl font-bold tabular-nums ${color}`}>{value}</div>
      <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-white/30">{label}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <span className="text-sm text-white/40">{label}</span>
      <span className="text-sm font-semibold text-white/80">{value}</span>
    </div>
  );
}
