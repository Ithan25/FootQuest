import { GameCard } from "@/components/games/game-card";
import { Search, Puzzle, HelpCircle, Gamepad2, Hand, Coins, Trophy, AlertTriangle, Gift, Zap } from "lucide-react";
import { GAME_LIMITS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

const games = [
  {
    title: "Scout Master",
    description:
      "Devine la sélection nationale à partir des clubs de ses joueurs.",
    imageSrc: "/images/ScoutMaster.svg",
    href: "/games/scout-master",
    gradient: "bg-gradient-to-br from-blue-600 to-indigo-700",
    shadowColor: "shadow-blue-600/25",
  },
  {
    title: "The Missing Piece",
    description:
      "Une compo nationale, un joueur manquant. Retrouve la pièce !",
    imageSrc: "/images/TheMissingPiece.svg",
    href: "/games/missing-piece",
    gradient: "bg-gradient-to-br from-purple-600 to-fuchsia-600",
    shadowColor: "shadow-purple-500/25",
  },
  {
    title: "Foot Trivia",
    description:
      "Quiz Coupe du Monde avec timer ! Teste ta culture foot.",
    imageSrc: "/images/FootTrivia.svg",
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
        <div>
          <h1 className="flex items-center text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Salut, <span className="ml-2 bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent">{user.pseudo}</span> <Hand className="ml-3 h-8 w-8 text-amber-400 drop-shadow-sm" />
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-white/40">
            Prêt pour un nouveau défi ? • Coupe du Monde 2026
          </p>
        </div>

        {/* Compact stats row */}
        <div className="flex gap-3">
          <StatPill icon={<Coins className="h-4 w-4 text-amber-500" />} value={user.footPoints.toLocaleString("fr-FR")} label="FP" color="text-amber-400" />
          <StatPill icon={<Gamepad2 className="h-4 w-4 text-emerald-500" />} value={`${user.partiesJoueesAujourdHui}/${maxGames}`} label="Parties" color="text-emerald-400" />
          <StatPill icon={<Trophy className="h-4 w-4 text-blue-500" />} value="—" label="Rang" color="text-blue-400" />
        </div>
      </section>

      {/* Daily limit warning */}
      {user.role === "basic" && user.partiesJoueesAujourdHui >= 8 && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-3 text-sm text-amber-400">
          <span className="font-bold flex items-center gap-1.5"><AlertTriangle className="h-4 w-4 inline" /> Attention !</span> Il te reste{" "}
          {10 - user.partiesJoueesAujourdHui} partie(s) aujourd&apos;hui.
        </div>
      )}

      {/* Games section */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            <Gamepad2 className="h-6 w-6 text-emerald-500" /> Mini-Jeux
          </h2>
          <span className="rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-500 dark:text-white/40">
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
        <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900 dark:text-white"><Zap className="h-5 w-5 text-amber-500" /> Accès rapide</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <QuickAction href="/leaderboard" icon={<Trophy className="h-5 w-5 text-amber-500" />} label="Classement" />
          <QuickAction href="/shop" icon={<Gift className="h-5 w-5 text-purple-500" />} label="Boutique" />
        </div>
      </section>

      {/* Recent history */}
      {user.recentGames.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">📅 Historique récent</h2>
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
    <div className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-white/[0.06] bg-white shadow-sm dark:shadow-none dark:bg-white/[0.03] px-4 py-3 transition-colors hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-white/[0.06]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 text-lg">
          {gameIcon}
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{gameName}</p>
          <p className="text-[11px] text-slate-500 dark:text-white/40">{timeInfo}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 font-bold text-amber-500 dark:text-amber-400">
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
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-white shadow-sm dark:shadow-none dark:bg-white/[0.03] px-4 py-2.5">
      <div className="flex items-center justify-center">{icon}</div>
      <div className="flex flex-col leading-none">
        <span className={`text-sm font-bold tabular-nums ${color.replace('text-', 'text-emerald-600 dark:text-')}`}>{value}</span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-white/30">{label}</span>
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
      className="group flex items-center gap-3 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-white shadow-sm dark:shadow-none dark:bg-white/[0.03] px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-50 dark:hover:bg-white/[0.06] hover:shadow-md dark:hover:shadow-lg"
    >
      <div className="flex items-center justify-center">{icon}</div>
      <span className="text-sm font-semibold text-slate-600 dark:text-white/70 transition-colors group-hover:text-slate-900 dark:group-hover:text-white">{label}</span>
    </a>
  );
}
