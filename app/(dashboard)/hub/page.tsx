import { GameCard } from "@/components/games/game-card";
import { Search, Puzzle, HelpCircle, Gamepad2, Hand, Coins, Trophy, AlertTriangle, Gift, Zap, Star } from "lucide-react";
import { GAME_LIMITS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

const games = [
  {
    title: "Scout Master",
    description:
      "Devine la sélection nationale à partir des clubs de ses joueurs.",
    imageSrc: "/images/ScoutMaster.svg",
    href: "/games/scout-master",
    gradient: "bg-gradient-to-br from-[#00FF87] to-emerald-700",
    shadowColor: "shadow-[#00FF87]/25",
    hoverColor: "green" as const,
  },
  {
    title: "The Missing Piece",
    description:
      "Une compo nationale, un joueur manquant. Retrouve la pièce !",
    imageSrc: "/images/TheMissingPiece.svg",
    href: "/games/missing-piece",
    gradient: "bg-gradient-to-br from-[#FF007F] to-fuchsia-700",
    shadowColor: "shadow-[#FF007F]/25",
    hoverColor: "magenta" as const,
  },
  {
    title: "Foot Trivia",
    description:
      "Quiz Coupe du Monde avec timer ! Teste ta culture foot.",
    imageSrc: "/images/FootTrivia.svg",
    href: "/games/foot-trivia",
    gradient: "bg-gradient-to-br from-[#FFE600] to-amber-600",
    shadowColor: "shadow-[#FFE600]/25",
    hoverColor: "yellow" as const,
  },
];

async function getUserStats() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { pseudo: "Joueur", footPoints: 0, partiesJoueesAujourdHui: 0, role: "basic" as const, recentGames: [] };
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

    const { data: recentGamesData } = await supabase
      .from("session_partie")
      .select(`
        points_gagnes,
        created_at,
        jeu (
          nom,
          icone,
          type
        )
      `)
      .eq("utilisateur_id", user.id)
      .order("created_at", { ascending: false })
      .limit(3);

    const getGameIcon = (iconText: string | any) => {
      if (iconText === "🔍") return <Search className="h-5 w-5" />;
      if (iconText === "🧩") return <Puzzle className="h-5 w-5" />;
      if (iconText === "❓") return <HelpCircle className="h-5 w-5" />;
      return <Gamepad2 className="h-5 w-5" />;
    };

    const recentGames = recentGamesData?.map((session: any) => ({
      gameName: session.jeu?.nom || "Jeu Inconnu",
      gameIcon: getGameIcon(session.jeu?.icone),
      points_gagnes: session.points_gagnes,
      created_at: session.created_at,
    })) || [];

    return {
      pseudo: profile?.pseudo || user.email?.split("@")[0] || "Joueur",
      footPoints: profile?.foot_points || 0,
      partiesJoueesAujourdHui: todayGames || 0,
      role: (profile?.role || "basic") as "basic" | "golden_ball",
      recentGames: recentGames || [],
    };
  } catch {
    return { pseudo: "Joueur", footPoints: 0, partiesJoueesAujourdHui: 0, role: "basic" as const, recentGames: [] };
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
        <div className="min-w-0">
          <h1 className="flex flex-wrap items-center gap-1 text-2xl font-black tracking-tight text-white sm:text-4xl">
            Salut, <span className={`bg-clip-text text-transparent ${
              user.role === "golden_ball"
                ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                : "bg-gradient-to-r from-[#00FF87] to-emerald-300"
            }`}>{user.pseudo}</span>
            {user.role === "golden_ball" && (
              <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-2.5 py-0.5 text-[10px] font-bold text-amber-900 shadow-sm">
                <Star className="h-3 w-3 fill-current" /> Golden Ball
              </span>
            )}
            <Hand className="h-7 w-7 text-[#FFE600] drop-shadow-sm sm:h-8 sm:w-8" />
          </h1>
          <p className="mt-1.5 text-sm text-zinc-500">
            Prêt pour un nouveau défi ? • Coupe du Monde 2026
          </p>
        </div>

        {/* Compact stats row */}
        <div className="flex gap-2 sm:gap-3">
          <StatPill icon={<Coins className="h-4 w-4 text-[#FFE600]" />} value={user.footPoints.toLocaleString("fr-FR")} label="FP" color="text-[#FFE600]" />
          <StatPill icon={<Gamepad2 className="h-4 w-4 text-[#00FF87]" />} value={`${user.partiesJoueesAujourdHui}/${maxGames}`} label="Parties" color="text-[#00FF87]" />
          <StatPill icon={<Trophy className="h-4 w-4 text-[#FF007F]" />} value="—" label="Rang" color="text-[#FF007F]" />
        </div>
      </section>

      {/* Daily limit warning */}
      {user.role === "basic" && user.partiesJoueesAujourdHui >= 8 && (
        <div className="rounded-lg border border-[#FFE600]/20 bg-[#FFE600]/5 px-5 py-3 text-sm text-[#FFE600]">
          <span className="font-bold flex items-center gap-1.5"><AlertTriangle className="h-4 w-4 inline" /> Attention !</span> Il te reste{" "}
          {10 - user.partiesJoueesAujourdHui} partie(s) aujourd&apos;hui.
        </div>
      )}

      {/* Games section */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
            <Gamepad2 className="h-6 w-6 text-[#00FF87]" /> Mini-Jeux
          </h2>
          <span className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1 text-[11px] font-medium text-zinc-500">
            CDM 2026 • 48 équipes
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {games.map((game: any) => (
            <GameCard key={game.href} {...game} />
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-white"><Zap className="h-5 w-5 text-[#FFE600]" /> Accès rapide</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickAction href="/leaderboard" icon={<Trophy className="h-5 w-5 text-[#FFE600]" />} label="Classement" />
          <QuickAction href="/shop" icon={<Gift className="h-5 w-5 text-[#FF007F]" />} label="Boutique" />
        </div>
      </section>

      {/* Recent history */}
      {user.recentGames.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-white">📅 Historique récent</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {user.recentGames.map((game, i) => (
              <RecentGameCard key={i} {...game} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function RecentGameCard({
  gameName,
  gameIcon,
  points_gagnes,
  created_at,
}: {
  gameName: string;
  gameIcon: React.ReactNode;
  points_gagnes: number;
  created_at: string;
}) {
  const timeInfo = new Date(created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 transition-colors hover:border-zinc-700 hover:bg-zinc-800/50">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-lg text-zinc-400">
          {gameIcon}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{gameName}</p>
          <p className="text-[11px] text-zinc-500">{timeInfo}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 font-bold text-[#FFE600]">
        <span>+{points_gagnes}</span>
        <Coins className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}

function StatPill({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 sm:gap-2 sm:px-4 sm:py-2.5">
      <div className="flex items-center justify-center">{icon}</div>
      <div className="flex flex-col leading-none">
        <span className={`text-xs font-bold tabular-nums sm:text-sm ${color}`}>{value}</span>
        <span className="mt-0.5 text-[9px] font-medium uppercase tracking-wider text-zinc-500 sm:text-[10px]">{label}</span>
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
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-[#00FF87]/40 hover:shadow-[0_0_15px_rgba(0,255,135,0.1)]"
    >
      <div className="flex items-center justify-center">{icon}</div>
      <span className="text-sm font-semibold text-zinc-400 transition-colors group-hover:text-white">{label}</span>
    </a>
  );
}
