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
        <h1 className="flex items-center gap-3 text-2xl font-bold tracking-tight">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-md">
            <Puzzle className="h-6 w-6 text-white" />
          </div>
          The Missing Piece
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Retrouve le joueur manquant dans la composition
        </p>
      </section>

      <MissingGame />
    </div>
  );
}
