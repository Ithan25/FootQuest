import { GameCard } from "@/components/games/game-card";
import { GAME_LIMITS } from "@/lib/constants";

const games = [
  {
    title: "Scout Master",
    description:
      "Trouve l'équipe en devinant les nationalités de ses joueurs. Plus tu avances, plus c'est dur !",
    icon: "🔍",
    href: "/games/scout-master",
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
    shadowColor: "shadow-blue-500/25",
  },
  {
    title: "The Missing Piece",
    description:
      "Une compo, un joueur manquant. Sauras-tu retrouver la pièce manquante du puzzle ?",
    icon: "🧩",
    href: "/games/missing-piece",
    gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
    shadowColor: "shadow-purple-500/25",
  },
  {
    title: "Foot Trivia",
    description:
      "Quiz foot avec timer ! Teste ta culture football et bats tes records.",
    icon: "❓",
    href: "/games/foot-trivia",
    gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
    shadowColor: "shadow-amber-500/25",
  },
];

export default function HubPage() {
  // TODO: Fetch user data from Supabase
  const user = {
    pseudo: "Joueur",
    role: "basic" as const,
    footPoints: 0,
    partiesJoueesAujourdHui: 0,
  };

  const maxGames =
    GAME_LIMITS[user.role].maxGamesPerDay === Infinity
      ? "∞"
      : GAME_LIMITS[user.role].maxGamesPerDay;

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <section>
        <h1 className="text-2xl font-bold tracking-tight">
          Salut, <span className="text-emerald-500">{user.pseudo}</span> 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Prêt pour un nouveau défi ?
        </p>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-3 gap-3">
        <StatCard
          label="FootPoints"
          value={user.footPoints.toLocaleString("fr-FR")}
          icon="🏅"
          gradient="from-amber-500/15 to-amber-600/5"
        />
        <StatCard
          label="Parties"
          value={`${user.partiesJoueesAujourdHui}/${maxGames}`}
          icon="🎮"
          gradient="from-emerald-500/15 to-emerald-600/5"
        />
        <StatCard
          label="Rang"
          value="—"
          icon="🏆"
          gradient="from-blue-500/15 to-blue-600/5"
        />
      </section>

      {/* Daily limit warning for basic users */}
      {user.role === "basic" && user.partiesJoueesAujourdHui >= 8 && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-500">
          <span className="font-semibold">⚠️ Attention !</span> Il te reste{" "}
          {10 - user.partiesJoueesAujourdHui} partie(s) aujourd'hui.{" "}
          <span className="underline underline-offset-2 cursor-pointer hover:text-amber-400">
            Passe Golden Ball
          </span>{" "}
          pour jouer sans limite !
        </div>
      )}

      {/* Games section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight">Mini-Jeux</h2>
          <span className="text-xs text-muted-foreground">3 jeux disponibles</span>
        </div>

        <div className="space-y-3">
          {games.map((game) => (
            <GameCard key={game.href} {...game} />
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold tracking-tight">Accès rapide</h2>
        <div className="grid grid-cols-2 gap-3">
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
}: {
  label: string;
  value: string;
  icon: string;
  gradient: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-br ${gradient} p-3 text-center backdrop-blur-sm`}
    >
      <div className="text-lg">{icon}</div>
      <div className="mt-1 text-lg font-bold tracking-tight">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
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
      className="group flex items-center gap-3 rounded-xl border border-border/40 bg-card/60 p-3.5 transition-all hover:-translate-y-0.5 hover:shadow-lg backdrop-blur-sm"
    >
      <span className="text-xl">{icon}</span>
      <div>
        <div className="text-sm font-semibold">{label}</div>
        <div className="text-xs text-muted-foreground">{sublabel}</div>
      </div>
    </a>
  );
}
