"use client";

import { Gift, ShoppingCart, Crown, Star, Sparkles, Loader2, Zap, Ban } from "lucide-react";
import { useState } from "react";
import { usePremiumContext } from "@/components/premium-context";
import { togglePremium } from "@/app/(dashboard)/profile/actions";

export default function ShopPage() {
  const { isPremium, refresh } = usePremiumContext();
  const [toggling, setToggling] = useState(false);

  const handleToggle = async () => {
    setToggling(true);
    const result = await togglePremium();
    if (!result.error) {
      refresh();
    }
    setToggling(false);
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
          <Gift className="h-6 w-6 text-[#FF007F]" /> Boutique
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Échange tes FootPoints contre des récompenses
        </p>
      </section>

      {/* Premium Card */}
      <section className="relative overflow-hidden rounded-lg border border-amber-500/30 bg-gradient-to-br from-amber-950/50 via-zinc-900 to-yellow-950/30 shadow-xl shadow-amber-500/10">
        {/* Decorative elements */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl" />
        <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-yellow-500/10 blur-3xl" />
        
        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-yellow-400 shadow-lg shadow-amber-500/30">
                <Crown className="h-7 w-7 text-amber-900" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Golden Ball</h2>
                <p className="text-sm text-amber-300/60">Abonnement Premium</p>
              </div>
            </div>
            {isPremium && (
              <span className="flex items-center gap-1 rounded-lg bg-[#00FF87]/20 px-3 py-1 text-xs font-bold text-[#00FF87]">
                <Star className="h-3 w-3 fill-current" /> Actif
              </span>
            )}
          </div>

          {/* Benefits */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <BenefitCard
              icon={<Ban className="h-5 w-5 text-[#FFE600]" />}
              title="Zéro publicité"
              description="Joue sans aucune interruption publicitaire"
            />
            <BenefitCard
              icon={<Zap className="h-5 w-5 text-[#FFE600]" />}
              title="Parties illimitées"
              description="Plus de limite quotidienne de parties"
            />
            <BenefitCard
              icon={<Sparkles className="h-5 w-5 text-[#FFE600]" />}
              title="Badge exclusif"
              description="Affiche ton statut Golden Ball partout"
            />
          </div>

          {/* Price + CTA */}
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">Gratuit</span>
                <span className="text-sm text-amber-300/50">(bientôt payant)</span>
              </div>
              <p className="text-xs text-amber-300/40">Stripe sera intégré prochainement</p>
            </div>

            <button
              onClick={handleToggle}
              disabled={toggling}
              className={`w-full rounded-lg px-8 py-3.5 text-base font-black transition-all hover:-translate-y-0.5 disabled:opacity-50 sm:w-auto ${
                isPremium
                  ? "border border-red-500/30 bg-red-500/15 text-red-400 hover:bg-red-500/25"
                  : "bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-900 shadow-lg shadow-amber-500/30 hover:shadow-xl"
              }`}
            >
              {toggling ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Chargement...
                </span>
              ) : isPremium ? (
                "Désactiver Premium"
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Crown className="h-5 w-5" /> Activer Golden Ball
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Rewards section */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
          <ShoppingCart className="h-5 w-5 text-[#FF007F]" /> Récompenses
        </h2>
        <div className="flex flex-col items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 p-12 text-center">
          <ShoppingCart className="h-12 w-12 text-[#FF007F]" />
          <h3 className="mt-4 text-lg font-bold text-white">Bientôt disponible</h3>
          <p className="mt-1 text-sm text-zinc-500">
            Les récompenses de nos partenaires arrivent bientôt.
          </p>
        </div>
      </section>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-amber-500/10 bg-amber-500/5 p-4">
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="text-sm font-bold text-white">{title}</span>
      </div>
      <p className="mt-1.5 text-xs text-amber-300/50">{description}</p>
    </div>
  );
}
