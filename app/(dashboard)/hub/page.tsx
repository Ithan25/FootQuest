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
    gradient: "bg-gradient-to-br from-[#00A651] to-emerald-800",
    shadowColor: "shadow-[#00A651]/25",
    hoverColor: "green" as const,
  },
  {
    title: "The Missing Piece",
    description:
      "Une compo nationale, un joueur manquant. Retrouve la pièce !",
    imageSrc: "/images/TheMissingPiece.svg",
    href: "/games/missing-piece",
    gradient: "bg-gradient-to-br from-[#E2001A] to-red-800",
    shadowColor: "shadow-[#E2001A]/25",
    hoverColor: "red" as const,
  },
  {
    title: "Foot Trivia",
    description:
      "Quiz Coupe du Monde avec timer ! Teste ta culture foot.",
    imageSrc: "/images/FootTrivia.svg",
    href: "/games/foot-trivia",
    gradient: "bg-gradient-to-br from-[#3B1F8E] to-purple-900",
    shadowColor: "shadow-[#3B1F8E]/25",
    hoverColor: "purple" as const,
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
            Salut, <span className={`${
              user.role === "golden_ball"
                ? "bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent"
                : "text-white"
            }`}>{user.pseudo}</span>
            {user.role === "golden_ball" && (
              <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-2.5 py-0.5 text-[10px] font-bold text-amber-900 shadow-sm">
                <Star className="h-3 w-3 fill-current" /> Golden Ball
              </span>
            )}
            <Hand className="h-7 w-7 text-[#C5E86C] drop-shadow-sm sm:h-8 sm:w-8" />
          </h1>
          <p className="mt-1.5 text-sm text-zinc-500">
            Prêt pour un nouveau défi ? • Coupe du Monde 2026
          </p>
        </div>

        {/* Compact stats row */}
        <div className="flex gap-2 sm:gap-3">
          <StatPill icon={<Coins className="h-4 w-4 text-[#C5E86C]" />} value={user.footPoints.toLocaleString("fr-FR")} label="FP" color="text-[#C5E86C]" />
          <StatPill icon={<Gamepad2 className="h-4 w-4 text-[#00A651]" />} value={`${user.partiesJoueesAujourdHui}/${maxGames}`} label="Parties" color="text-[#00A651]" />
          <StatPill icon={<Trophy className="h-4 w-4 text-[#E2001A]" />} value="—" label="Rang" color="text-[#E2001A]" />
        </div>
      </section>

      {/* Daily limit warning */}
      {user.role === "basic" && user.partiesJoueesAujourdHui >= 8 && (
        <div className="rounded-lg border border-[#C5E86C]/20 bg-[#C5E86C]/5 px-5 py-3 text-sm text-[#C5E86C]">
          <span className="font-bold flex items-center gap-1.5"><AlertTriangle className="h-4 w-4 inline" /> Attention !</span> Il te reste{" "}
          {10 - user.partiesJoueesAujourdHui} partie(s) aujourd&apos;hui.
        </div>
      )}

      {/* Games section */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
            <Gamepad2 className="h-6 w-6 text-white" /> Mini-Jeux
          </h2>
          <span className="rounded-lg border border-[#252536] bg-[#141420] px-3 py-1 text-[11px] font-medium text-zinc-500">
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
        <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-white"><Zap className="h-5 w-5 text-[#C5E86C]" /> Accès rapide</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickAction href="/leaderboard" icon={<Trophy className="h-5 w-5 text-[#C5E86C]" />} label="Classement" />
          <QuickAction href="/shop" icon={<Gift className="h-5 w-5 text-[#E2001A]" />} label="Boutique" />
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
    <div className="flex items-center justify-between rounded-lg border border-[#252536] bg-[#141420] px-4 py-3 transition-colors hover:border-[#3B1F8E]/30 hover:bg-[#1E1E2E]/50">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1E1E2E] text-lg text-zinc-400">
          {gameIcon}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{gameName}</p>
          <p className="text-[11px] text-zinc-500">{timeInfo}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 font-bold text-[#C5E86C]">
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
    <div className="flex items-center gap-1.5 rounded-lg border border-[#252536] bg-[#141420] px-3 py-2 sm:gap-2 sm:px-4 sm:py-2.5">
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
      className="group flex items-center gap-3 rounded-lg border border-[#252536] bg-[#141420] px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-[#3B1F8E]/40 hover:shadow-[0_0_15px_rgba(59,31,142,0.1)]"
    >
      <div className="flex items-center justify-center">{icon}</div>
      <span className="text-sm font-semibold text-zinc-400 transition-colors group-hover:text-white">{label}</span>
    </a>
  );
}
