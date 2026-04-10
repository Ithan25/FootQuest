import { Trophy, Medal, Crown } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

// Types
type UserRank = {
  id: string;
  pseudo: string;
  foot_points: number;
  avatar_url?: string;
  role?: string;
  rank: number;
};

// Data Fetching
async function getLeaderboardData(): Promise<{ top50: UserRank[]; currentUserRank?: UserRank }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Get top 50 users
  const { data: topUsers, error } = await supabase
    .from("utilisateur")
    .select("id, pseudo, foot_points, avatar_url, role")
    .order("foot_points", { ascending: false })
    .limit(50);

  if (error || !topUsers) {
    return { top50: [] };
  }

  const top50 = topUsers.map((u, index) => ({
    ...u,
    rank: index + 1,
  }));

  let currentUserRank: UserRank | undefined;

  if (user) {
    // Check if user is in top 50
    const inTop = top50.find((u) => u.id === user.id);
    if (inTop) {
      currentUserRank = inTop;
    } else {
      // User is not in Top 50, figure out their rank
      const { data: userData } = await supabase
        .from("utilisateur")
        .select("id, pseudo, foot_points, avatar_url, role")
        .eq("id", user.id)
        .single();

      if (userData) {
        // Count how many users have strictly more points
        const { count } = await supabase
          .from("utilisateur")
          .select("*", { count: "exact", head: true })
          .gt("foot_points", userData.foot_points);

        currentUserRank = {
          ...userData,
          rank: (count || 0) + 1,
        };
      }
    }
  }

  return { top50, currentUserRank };
}

// Components
export default async function LeaderboardPage() {
  const { top50, currentUserRank } = await getLeaderboardData();

  if (top50.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card/60 p-12 text-center backdrop-blur-sm">
        <Trophy className="h-12 w-12 text-muted-foreground" />
        <h2 className="mt-4 text-lg font-bold">Aucun joueur pour le moment</h2>
        <p className="mt-1 text-sm text-muted-foreground">Le classement est vide.</p>
      </div>
    );
  }

  const podium = top50.slice(0, 3);
  const theRest = top50.slice(3);

  // Pad the podium if less than 3 players
  const first = podium[0];
  const second = podium[1];
  const third = podium[2];

  return (
    <div className="space-y-10 pb-20">
      <section className="text-center">
        <h1 className="flex items-center justify-center gap-2 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          <Trophy className="h-8 w-8 text-amber-500 drop-shadow-md" /> Le Classement
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-white/50">
          Les meilleurs joueurs de FootQuest. Accumule de l'XP en jouant !
        </p>
      </section>

      {/* Podium Section */}
      <section className="flex items-end justify-center gap-2 pt-10 sm:gap-6">
        {/* 2ND PLACE */}
        {second && (
          <div className="flex w-[30%] max-w-[140px] flex-col items-center">
            <PodiumAvatar player={second} rank={2} size="md" color="slate" />
            <div className="relative mt-2 flex w-full flex-col items-center justify-start rounded-t-2xl bg-gradient-to-t from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700/50 px-2 py-3 shadow-lg sm:mt-3 sm:p-4 h-[100px] sm:h-[130px] border-t-4 border-slate-300 dark:border-slate-500">
              <span className="text-lg font-bold text-slate-700 dark:text-slate-300 sm:text-xl">2</span>
              <span className="mt-0.5 text-xs font-bold truncate w-full text-center text-slate-800 dark:text-white sm:text-sm sm:mt-1">{second.pseudo}</span>
              <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mt-0.5 sm:text-xs sm:mt-1">{second.foot_points} FP</span>
            </div>
          </div>
        )}

        {/* 1ST PLACE */}
        {first && (
          <div className="z-10 flex w-[34%] max-w-[160px] flex-col items-center">
            <Crown className="mb-1 h-6 w-6 animate-bounce text-amber-400 drop-shadow-md sm:mb-2 sm:h-8 sm:w-8" />
            <PodiumAvatar player={first} rank={1} size="lg" color="amber" />
            <div className="relative mt-2 flex w-full flex-col items-center justify-start rounded-t-2xl bg-gradient-to-t from-amber-200/40 to-amber-100 dark:from-amber-900/40 dark:to-amber-800/20 px-2 py-3 shadow-xl sm:mt-3 sm:p-4 h-[130px] sm:h-[170px] border-t-4 border-amber-400 shadow-amber-500/20">
              <span className="text-2xl font-black text-amber-600 dark:text-amber-400 drop-shadow-sm sm:text-3xl">1</span>
              <span className="mt-0.5 text-sm font-black truncate w-full text-center text-slate-900 dark:text-white sm:text-lg sm:mt-1">{first.pseudo}</span>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5 sm:text-sm sm:mt-1">{first.foot_points} FP</span>
            </div>
          </div>
        )}

        {/* 3RD PLACE */}
        {third && (
          <div className="flex w-[30%] max-w-[140px] flex-col items-center">
            <PodiumAvatar player={third} rank={3} size="md" color="orange" />
            <div className="relative mt-2 flex w-full flex-col items-center justify-start rounded-t-2xl bg-gradient-to-t from-orange-200/50 to-orange-100/50 dark:from-orange-950/40 dark:to-orange-900/20 px-2 py-3 shadow-lg sm:mt-3 sm:p-4 h-[90px] sm:h-[110px] border-t-4 border-orange-400/70 dark:border-orange-700">
              <span className="text-lg font-bold text-orange-700 dark:text-orange-500 sm:text-xl">3</span>
              <span className="mt-0.5 text-xs font-bold truncate w-full text-center text-slate-800 dark:text-white sm:text-sm sm:mt-1">{third.pseudo}</span>
              <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mt-0.5 sm:text-xs sm:mt-1">{third.foot_points} FP</span>
            </div>
          </div>
        )}
      </section>

      {/* List Section (4 to 50) */}
      {theRest.length > 0 && (
        <section className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] shadow-sm dark:shadow-none p-1 sm:p-2">
          {theRest.map((player) => (
            <LeaderboardRow key={player.id} player={player} isCurrentUser={currentUserRank?.id === player.id} />
          ))}
        </section>
      )}

      {/* Sticky Current User Footer if they are not in the top 50, or just to show their rank always */}
      {currentUserRank && (!theRest.find(p => p.id === currentUserRank.id) && !podium.find(p => p.id === currentUserRank.id)) && (
        <div className="fixed bottom-20 left-0 right-0 z-30 mx-auto w-full max-w-2xl px-4 animate-in fade-in slide-in-from-bottom-8">
          <div className="rounded-2xl border-2 border-emerald-500/30 bg-white/90 dark:bg-[#0B1120]/95 p-3 shadow-2xl backdrop-blur-md">
            <LeaderboardRow player={currentUserRank} isCurrentUser={true} hideBorder />
          </div>
        </div>
      )}
    </div>
  );
}

function PodiumAvatar({ player, rank, size, color }: { player: UserRank; rank: number; size: "md" | "lg", color: "amber" | "slate" | "orange" }) {
  const sizeClasses = size === "lg" ? "h-20 w-20 sm:h-24 sm:w-24 border-4" : "h-16 w-16 sm:h-20 sm:w-20 border-[3px]";
  const borderColors = {
    amber: "border-amber-400 shadow-amber-400/50",
    slate: "border-slate-300 dark:border-slate-500 shadow-slate-400/30",
    orange: "border-orange-400/70 shadow-orange-500/20",
  };

  return (
    <div className={cn("relative rounded-full shadow-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden", sizeClasses, borderColors[color])}>
      {player.avatar_url ? (
        <img src={player.avatar_url} alt={player.pseudo} className="h-full w-full object-cover" />
      ) : (
        <span className={cn("font-black text-slate-400 dark:text-slate-500", size === "lg" ? "text-3xl" : "text-2xl")}>
          {player.pseudo.substring(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}

function LeaderboardRow({ player, isCurrentUser, hideBorder = false }: { player: UserRank; isCurrentUser: boolean; hideBorder?: boolean }) {
  return (
    <div className={cn(
      "flex items-center justify-between p-3 sm:px-5 sm:py-4 transition-colors rounded-2xl",
      !hideBorder && "border-b border-slate-100 dark:border-white/[0.04] last:border-0 rounded-none",
      isCurrentUser && "bg-emerald-50 dark:bg-emerald-500/10"
    )}>
      <div className="flex items-center gap-4">
        {/* Rank */}
        <div className="flex h-8 w-8 items-center justify-center font-bold text-slate-500 dark:text-white/40 sm:h-10 sm:w-10">
          {player.rank}
        </div>
        
        {/* Avatar */}
        <div className="flex h-10 w-10 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10 shrink-0">
          {player.avatar_url ? (
            <img src={player.avatar_url} alt={player.pseudo} className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-xs font-bold text-slate-500 dark:text-white/50">
              {player.pseudo.substring(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        
        {/* Name */}
        <div className="flex flex-col">
          <span className={cn(
            "font-bold text-sm sm:text-base", 
            isCurrentUser ? "text-emerald-700 dark:text-emerald-400" : "text-slate-900 dark:text-white"
          )}>
            {player.pseudo}
          </span>
          {player.role === "golden_ball" && (
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Golden Ball</span>
          )}
        </div>
      </div>

      {/* Points */}
      <div className="font-bold text-amber-500 dark:text-amber-400 tabular-nums">
        {player.foot_points} <span className="text-xs text-amber-600/50 dark:text-amber-500/60 uppercase">FP</span>
      </div>
    </div>
  );
}
