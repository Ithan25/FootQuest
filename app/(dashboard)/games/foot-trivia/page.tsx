import { TriviaGame } from "@/components/games/trivia-game";
import Image from "next/image";

export const metadata = {
  title: "Foot Trivia | FootQuest",
  description: "Quiz de culture football — teste tes connaissances !",
};

export default function FootTriviaPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight"><Image src="/images/FootTrivia.svg" width={32} height={32} alt="Foot Trivia logo" className="drop-shadow-md" /> Foot Trivia</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Quiz de culture football avec timer
        </p>
      </section>

      <TriviaGame />
    </div>
  );
}
