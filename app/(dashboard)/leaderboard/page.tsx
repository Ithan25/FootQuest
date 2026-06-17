import { Trophy, Crown } from "lucide-react";
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
      <div className="flex flex-col items-center justify-center rounded-lg border border-[#252536] bg-[#141420] p-12 text-center">
        <Trophy className="h-12 w-12 text-zinc-600" />
        <h2 className="mt-4 text-lg font-bold text-white">Aucun joueur pour le moment</h2>
        <p className="mt-1 text-sm text-zinc-500">Le classement est vide.</p>
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
        <h1 className="flex items-center justify-center gap-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
          <Trophy className="h-8 w-8 text-[#C5E86C] drop-shadow-md" /> Le Classement
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Les meilleurs joueurs de FootQuest. Accumule de l'XP en jouant !
        </p>
      </section>

      {/* Podium Section */}
      <section className="flex items-end justify-center gap-2 pt-10 sm:gap-6">
        {/* 2ND PLACE */}
        {second && (
          <div className="flex w-[30%] max-w-[140px] flex-col items-center">
            <PodiumAvatar player={second} size="md" color="slate" />
            <div className="relative mt-2 flex w-full flex-col items-center justify-start rounded-t-2xl bg-gradient-to-t from-zinc-700/40 to-zinc-800/20 px-2 py-3 shadow-lg sm:mt-3 sm:p-4 h-[100px] sm:h-[130px] border-t-4 border-zinc-500">
              {/* Neon Base Effect */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-zinc-400/40 blur-sm" />
              <div className="absolute inset-x-2 bottom-0 h-[2px] bg-zinc-400 shadow-[0_0_10px_rgba(148,163,184,0.5)]" />
              
              <span className="text-lg font-bold text-zinc-400 sm:text-xl">2</span>
              <span className="mt-0.5 text-xs font-bold truncate w-full text-center text-white sm:text-sm sm:mt-1">{second.pseudo}</span>
              <span className="text-[10px] font-semibold text-[#C5E86C] mt-0.5 sm:text-xs sm:mt-1">{second.foot_points} FP</span>
            </div>
          </div>
        )}

        {/* 1ST PLACE */}
        {first && (
          <div className="z-10 flex w-[34%] max-w-[160px] flex-col items-center">
            <Crown className="mb-1 h-6 w-6 animate-bounce text-[#C5E86C] drop-shadow-[0_0_8px_rgba(197,232,108,0.8)] sm:mb-2 sm:h-8 sm:w-8" />
            <PodiumAvatar player={first} size="lg" color="gold" />
            <div className="relative mt-2 flex w-full flex-col items-center justify-start rounded-t-2xl bg-gradient-to-t from-[#C5E86C]/15 to-[#3B1F8E]/10 px-2 py-3 shadow-2xl sm:mt-3 sm:p-4 h-[130px] sm:h-[170px] border-t-4 border-[#C5E86C]">
              {/* Neon Base Effect */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-[#C5E86C]/60 blur-sm" />
              <div className="absolute inset-x-2 bottom-0 h-[2px] bg-[#C5E86C] shadow-[0_0_15px_rgba(197,232,108,0.8)]" />
              
              <span className="text-2xl font-black text-[#C5E86C] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] sm:text-3xl">1</span>
              <span className="mt-0.5 text-sm font-black truncate w-full text-center text-white drop-shadow-sm sm:text-lg sm:mt-1">{first.pseudo}</span>
              <span className="text-xs font-bold text-[#C5E86C] mt-0.5 sm:text-sm sm:mt-1">{first.foot_points} FP</span>
            </div>
          </div>
        )}

        {/* 3RD PLACE */}
        {third && (
          <div className="flex w-[30%] max-w-[140px] flex-col items-center">
            <PodiumAvatar player={third} size="md" color="bronze" />
            <div className="relative mt-2 flex w-full flex-col items-center justify-start rounded-t-2xl bg-gradient-to-t from-orange-900/30 to-orange-950/10 px-2 py-3 shadow-lg sm:mt-3 sm:p-4 h-[90px] sm:h-[110px] border-t-4 border-orange-600">
              {/* Neon Base Effect */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-orange-500/40 blur-sm" />
              <div className="absolute inset-x-2 bottom-0 h-[2px] bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
              
              <span className="text-lg font-bold text-orange-500 sm:text-xl">3</span>
              <span className="mt-0.5 text-xs font-bold truncate w-full text-center text-white sm:text-sm sm:mt-1">{third.pseudo}</span>
              <span className="text-[10px] font-semibold text-[#C5E86C] mt-0.5 sm:text-xs sm:mt-1">{third.foot_points} FP</span>
            </div>
          </div>
        )}
      </section>

      {/* List Section (4 to 50) */}
      {theRest.length > 0 && (
        <section className="mx-auto w-full max-w-2xl rounded-2xl border border-[#252536] bg-[#141420] p-1 sm:p-2">
          {theRest.map((player) => (
            <LeaderboardRow key={player.id} player={player} isCurrentUser={currentUserRank?.id === player.id} />
          ))}
        </section>
      )}

      {/* Sticky Current User Footer if they are not in the top 50, or just to show their rank always */}
      {currentUserRank && (!theRest.find(p => p.id === currentUserRank.id) && !podium.find(p => p.id === currentUserRank.id)) && (
        <div className="fixed bottom-20 left-0 right-0 z-30 mx-auto w-full max-w-2xl px-4 animate-in fade-in slide-in-from-bottom-8">
          <div className="rounded-2xl border-2 border-[#3B1F8E]/30 bg-[#0A0A0F]/95 p-3 shadow-2xl backdrop-blur-md">
            <LeaderboardRow player={currentUserRank} isCurrentUser={true} hideBorder />
          </div>
        </div>
      )}
    </div>
  );
}

function PodiumAvatar({ player, size, color }: { player: UserRank; size: "md" | "lg", color: "gold" | "slate" | "bronze" }) {
  const sizeClasses = size === "lg" ? "h-20 w-20 sm:h-24 sm:w-24 border-4" : "h-16 w-16 sm:h-20 sm:w-20 border-[3px]";
  const borderColors = {
    gold: "border-[#C5E86C] shadow-[#C5E86C]/50",
    slate: "border-zinc-500 shadow-zinc-400/30",
    bronze: "border-orange-500 shadow-orange-500/20",
  };

  return (
    <div className={cn("relative rounded-full shadow-xl bg-[#1E1E2E] flex items-center justify-center overflow-hidden", sizeClasses, borderColors[color])}>
      {player.avatar_url ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={player.avatar_url} alt={player.pseudo} className="h-full w-full object-cover" />
      ) : (
        <span className={cn("font-black text-zinc-500", size === "lg" ? "text-3xl" : "text-2xl")}>
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
      !hideBorder && "border-b border-[#252536]/50 last:border-0 rounded-none",
      isCurrentUser && "bg-[#3B1F8E]/10"
    )}>
      <div className="flex items-center gap-4">
        {/* Rank */}
        <div className="flex h-8 w-8 items-center justify-center font-bold text-zinc-500 sm:h-10 sm:w-10">
          {player.rank}
        </div>
        
        {/* Avatar */}
        <div className="flex h-10 w-10 overflow-hidden rounded-full bg-[#1E1E2E] shrink-0">
          {player.avatar_url ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={player.avatar_url} alt={player.pseudo} className="h-full w-full object-cover" />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-xs font-bold text-zinc-500">
              {player.pseudo.substring(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        
        {/* Name */}
        <div className="flex flex-col">
          <span className={cn(
            "font-bold text-sm sm:text-base", 
            isCurrentUser ? "text-[#C5E86C]" : "text-white"
          )}>
            {player.pseudo}
          </span>
          {player.role === "golden_ball" && (
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Golden Ball</span>
          )}
        </div>
      </div>

      {/* Points */}
      <div className="font-bold text-[#C5E86C] tabular-nums">
        {player.foot_points} <span className="text-xs text-[#C5E86C]/50 uppercase">FP</span>
      </div>
    </div>
  );
}
