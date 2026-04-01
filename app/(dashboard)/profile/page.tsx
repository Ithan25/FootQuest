export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight">👤 Mon Profil</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gère ton compte et tes paramètres
        </p>
      </section>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card/60 p-12 text-center backdrop-blur-sm">
        <span className="text-5xl">👤</span>
        <h2 className="mt-4 text-lg font-bold">Bientôt disponible</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          La gestion du profil arrive bientôt.
        </p>
      </div>
    </div>
  );
}
