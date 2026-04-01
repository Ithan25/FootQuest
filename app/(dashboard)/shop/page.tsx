export default function ShopPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight">🎁 Boutique</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Échange tes FootPoints contre des récompenses
        </p>
      </section>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-border/40 bg-card/60 p-12 text-center backdrop-blur-sm">
        <span className="text-5xl">🛒</span>
        <h2 className="mt-4 text-lg font-bold">Bientôt disponible</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Les récompenses de nos partenaires arrivent bientôt.
        </p>
      </div>
    </div>
  );
}
