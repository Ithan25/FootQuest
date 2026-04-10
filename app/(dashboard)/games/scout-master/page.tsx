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
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight"><Image src="/images/ScoutMaster.svg" width={32} height={32} alt="Scout Master logo" className="drop-shadow-md" /> Scout Master</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Devine le club à partir des nationalités de ses joueurs
        </p>
      </section>

      <ScoutGame />
    </div>
  );
}
