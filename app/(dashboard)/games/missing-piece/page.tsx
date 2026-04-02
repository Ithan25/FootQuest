import { MissingGame } from "@/components/games/missing-game";
import { Puzzle } from "lucide-react";

export const metadata = {
  title: "The Missing Piece | FootQuest",
  description:
    "Retrouve le joueur manquant dans la composition de l'équipe !",
};

export default function MissingPiecePage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Puzzle className="h-6 w-6 text-purple-500" /> The Missing Piece
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Retrouve le joueur manquant dans la composition
        </p>
      </section>

      <MissingGame />
    </div>
  );
}
