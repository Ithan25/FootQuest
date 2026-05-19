import { ScoutGame } from "@/components/games/scout-game";
import Image from "next/image";

export const metadata = {
  title: "Scout Master | FootQuest",
  description:
    "Devine le club de football en fonction des nationalités de ses joueurs !",
};

export default function ScoutMasterPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="flex items-center gap-3 text-2xl font-bold tracking-tight">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00A651] to-emerald-800 shadow-md">
            <Image src="/images/ScoutMaster.svg" width={24} height={24} className="drop-shadow-sm" alt="Scout Master logo" />
          </div>
          Scout Master
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Devine la léquipe nationale à partir des clubs de ses joueurs
        </p>
      </section>

      <ScoutGame />
    </div>
  );
}
