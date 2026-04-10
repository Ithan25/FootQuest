import { ScoutGame } from "@/components/games/scout-game";
import { Shield } from "lucide-react";

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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-md">
            <Shield className="h-6 w-6 text-white" />
          </div>
          Scout Master
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Devine le club à partir des nationalités de ses joueurs
        </p>
      </section>

      <ScoutGame />
    </div>
  );
}
