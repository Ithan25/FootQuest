import { MissingGame } from "@/components/games/missing-game";
import Image from "next/image";

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
          <Image src="/images/TheMissingPiece.svg" width={32} height={32} alt="The Missing Piece logo" className="drop-shadow-md" /> The Missing Piece
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Retrouve le joueur manquant dans la composition
        </p>
      </section>

      <MissingGame />
    </div>
  );
}
