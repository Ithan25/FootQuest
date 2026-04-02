import { TriviaGame } from "@/components/games/trivia-game";
import { HelpCircle } from "lucide-react";

export const metadata = {
  title: "Foot Trivia | FootQuest",
  description: "Quiz de culture football — teste tes connaissances !",
};

export default function FootTriviaPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight"><HelpCircle className="h-6 w-6 text-amber-500" /> Foot Trivia</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Quiz de culture football avec timer
        </p>
      </section>

      <TriviaGame />
    </div>
  );
}
