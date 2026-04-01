import { TriviaGame } from "@/components/games/trivia-game";

export const metadata = {
  title: "Foot Trivia | FootQuest",
  description: "Quiz de culture football — teste tes connaissances !",
};

export default function FootTriviaPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight">❓ Foot Trivia</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Quiz de culture football avec timer
        </p>
      </section>

      <TriviaGame />
    </div>
  );
}
