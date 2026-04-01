import { ScoutGame } from "@/components/games/scout-game";

export const metadata = {
  title: "Scout Master | FootQuest",
  description:
    "Devine le club de football en fonction des nationalités de ses joueurs !",
};

export default function ScoutMasterPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight">🔍 Scout Master</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Devine le club à partir des nationalités de ses joueurs
        </p>
      </section>

      <ScoutGame />
    </div>
  );
}
