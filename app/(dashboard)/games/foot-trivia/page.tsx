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
        <h1 className="flex items-center gap-3 text-2xl font-bold tracking-tight">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-md">
            <Image src="/images/FootTrivia.svg" width={24} height={24} className="drop-shadow-sm" alt="Foot Trivia logo" />
          </div>
          Foot Trivia
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Quiz de culture football avec timer
        </p>
      </section>

      <TriviaGame />
    </div>
  );
}
