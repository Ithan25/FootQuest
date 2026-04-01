import { GameCard } from "@/components/games/game-card";
import { GAME_LIMITS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

const games = [
  {
    title: "Scout Master",
    description:
      "Devine la sélection nationale à partir des clubs de ses joueurs.",
    icon: "🔍",
    href: "/games/scout-master",
    gradient: "bg-gradient-to-br from-blue-600 to-indigo-700",
    shadowColor: "shadow-blue-600/25",
  },
  {
    title: "The Missing Piece",
    description:
      "Une compo nationale, un joueur manquant. Retrouve la pièce !",
    icon: "🧩",
    href: "/games/missing-piece",
    gradient: "bg-gradient-to-br from-purple-600 to-fuchsia-600",
    shadowColor: "shadow-purple-500/25",
  },
  {
    title: "Foot Trivia",
    description:
      "Quiz Coupe du Monde avec timer ! Teste ta culture foot.",
    icon: "❓",
    href: "/games/foot-trivia",
    gradient: "bg-gradient-to-br from-amber-500 to-orange-600",
    shadowColor: "shadow-amber-500/25",
  },
];

async function getUserStats() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { pseudo: "Joueur", footPoints: 0, partiesJoueesAujourdHui: 0, role: "basic" as const };
    }

    const { data: profile } = await supabase
      .from("utilisateur")
      .select("pseudo, foot_points, role")
      .eq("id", user.id)
      .single();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { count: todayGames } = await supabase
      .from("session_partie")
      .select("*", { count: "exact", head: true })
      .eq("utilisateur_id", user.id)
      .gte("created_at", today.toISOString());

    return {
      pseudo: profile?.pseudo || user.email?.split("@")[0] || "Joueur",
      footPoints: profile?.foot_points || 0,
      partiesJoueesAujourdHui: todayGames || 0,
      role: (profile?.role || "basic") as "basic" | "golden_ball",
    };
  } catch {
    return { pseudo: "Joueur", footPoints: 0, partiesJoueesAujourdHui: 0, role: "basic" as const };
  }
}

export default async function HubPage() {
  const user = await getUserStats();

  const maxGames =
    GAME_LIMITS[user.role].maxGamesPerDay === Infinity
      ? "∞"
      : GAME_LIMITS[user.role].maxGamesPerDay;

  return (
    <div className="space-y-10">
      {/* Welcome + Stats */}
      <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Salut, <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">{user.pseudo}</span> 👋
          </h1>
          <p className="mt-1.5 text-sm text-white/40">
            Prêt pour un nouveau défi ? • Coupe du Monde 2026
          </p>
        </div>

        {/* Compact stats row */}
        <div className="flex gap-3">
          <StatPill icon="💰" value={user.footPoints.toLocaleString("fr-FR")} label="FP" color="text-amber-400" />
          <StatPill icon="🎮" value={`${user.partiesJoueesAujourdHui}/${maxGames}`} label="Parties" color="text-emerald-400" />
          <StatPill icon="🏆" value="—" label="Rang" color="text-blue-400" />
        </div>
      </section>

      {/* Daily limit warning */}
      {user.role === "basic" && user.partiesJoueesAujourdHui >= 8 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-3 text-sm text-amber-400">
          <span className="font-bold">⚠️ Attention !</span> Il te reste{" "}
          {10 - user.partiesJoueesAujourdHui} partie(s) aujourd&apos;hui.
        </div>
      )}

      {/* Games section */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            🎮 Mini-Jeux
          </h2>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/40">
            CDM 2026 • 48 équipes
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.href} {...game} />
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight text-white">⚡ Accès rapide</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickAction href="/leaderboard" icon="🏆" label="Classement" />
          <QuickAction href="/shop" icon="🎁" label="Boutique" />
        </div>
      </section>
    </div>
  );
}

function StatPill({
  icon,
  value,
  label,
  color,
}: {
  icon: string;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5">
      <span className="text-sm">{icon}</span>
      <div className="flex flex-col leading-none">
        <span className={`text-sm font-bold tabular-nums ${color}`}>{value}</span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-white/30">{label}</span>
      </div>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  label,
}: {
  href: string;
  icon: string;
  label: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-white/10 hover:bg-white/[0.06] hover:shadow-lg"
    >
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-semibold text-white/70 transition-colors group-hover:text-white">{label}</span>
    </a>
  );
}
