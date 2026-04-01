import { GameCard } from "@/components/games/game-card";
import { GAME_LIMITS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

const games = [
  {
    title: "Scout Master",
    description:
      "Devine la sélection nationale à partir des clubs de ses joueurs. CDM 2026 !",
    icon: "🔍",
    href: "/games/scout-master",
    gradient: "bg-gradient-to-br from-blue-600 to-indigo-700",
    shadowColor: "shadow-blue-600/25",
  },
  {
    title: "The Missing Piece",
    description:
      "Une compo nationale, un joueur manquant. Retrouve la pièce manquante !",
    icon: "🧩",
    href: "/games/missing-piece",
    gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
    shadowColor: "shadow-purple-500/25",
  },
  {
    title: "Foot Trivia",
    description:
      "Quiz Coupe du Monde avec timer ! Teste ta culture et bats tes records.",
    icon: "❓",
    href: "/games/foot-trivia",
    gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
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

    // Get user profile
    const { data: profile } = await supabase
      .from("utilisateur")
      .select("pseudo, foot_points, role, parties_jouees_aujourd_hui")
      .eq("id", user.id)
      .single();

    // Get today's games count
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
      partiesJoueesAujourdHui: todayGames || profile?.parties_jouees_aujourd_hui || 0,
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
    <div className="space-y-8">
      {/* Welcome section */}
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Salut, <span className="text-emerald-500">{user.pseudo}</span> 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Prêt pour un nouveau défi ?
          </p>
        </div>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-3 gap-4">
        <StatCard
          label="FootPoints"
          value={user.footPoints.toLocaleString("fr-FR")}
          icon="🏅"
          gradient="from-amber-500/15 to-amber-600/5"
          accent="text-amber-500"
        />
        <StatCard
          label="Parties aujourd'hui"
          value={`${user.partiesJoueesAujourdHui}/${maxGames}`}
          icon="🎮"
          gradient="from-emerald-500/15 to-emerald-600/5"
          accent="text-emerald-500"
        />
        <StatCard
          label="Rang"
          value="—"
          icon="🏆"
          gradient="from-blue-500/15 to-blue-600/5"
          accent="text-blue-500"
        />
      </section>

      {/* Daily limit warning for basic users */}
      {user.role === "basic" && user.partiesJoueesAujourdHui >= 8 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-500">
          <span className="font-semibold">⚠️ Attention !</span> Il te reste{" "}
          {10 - user.partiesJoueesAujourdHui} partie(s) aujourd&apos;hui.{" "}
          <span className="cursor-pointer underline underline-offset-2 hover:text-amber-400">
            Passe Golden Ball
          </span>{" "}
          pour jouer sans limite !
        </div>
      )}

      {/* Games section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight sm:text-xl">
            Mini-Jeux — CDM 2026
          </h2>
          <span className="text-xs text-muted-foreground">
            3 jeux disponibles
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {games.map((game) => (
            <GameCard key={game.href} {...game} />
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold tracking-tight">Accès rapide</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickAction
            href="/leaderboard"
            icon="🏆"
            label="Classement"
            sublabel="Vois ton rang"
          />
          <QuickAction
            href="/shop"
            icon="🎁"
            label="Boutique"
            sublabel="Échange tes points"
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  gradient,
  accent,
}: {
  label: string;
  value: string;
  icon: string;
  gradient: string;
  accent: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border/40 bg-gradient-to-br ${gradient} p-4 text-center backdrop-blur-sm`}
    >
      <div className="text-xl">{icon}</div>
      <div className={`mt-1.5 text-xl font-bold tracking-tight sm:text-2xl ${accent}`}>
        {value}
      </div>
      <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function QuickAction({
  href,
  icon,
  label,
  sublabel,
}: {
  href: string;
  icon: string;
  label: string;
  sublabel: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-border/40 bg-card/60 p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg backdrop-blur-sm"
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs text-muted-foreground">{sublabel}</div>
      </div>
    </a>
  );
}
