import { MissingGame } from "@/components/games/missing-game";

export const metadata = {
  title: "The Missing Piece | FootQuest",
  description:
    "Retrouve le joueur manquant dans la composition de l'équipe !",
};

export default function MissingPiecePage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight">
          🧩 The Missing Piece
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Retrouve le joueur manquant dans la composition
        </p>
      </section>

      <MissingGame />
    </div>
  );
}
