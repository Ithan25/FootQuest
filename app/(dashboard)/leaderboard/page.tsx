export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight">🏆 Classement</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Les meilleurs joueurs FootQuest
        </p>
      </section>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card/60 p-12 text-center backdrop-blur-sm">
        <span className="text-5xl">🏆</span>
        <h2 className="mt-4 text-lg font-bold">Bientôt disponible</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Le classement sera disponible une fois les jeux lancés.
        </p>
      </div>
    </div>
  );
}
