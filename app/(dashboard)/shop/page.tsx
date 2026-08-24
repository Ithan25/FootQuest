"use client";

import {
  Gift,
  ShoppingCart,
  Crown,
  Star,
  Sparkles,
  Loader2,
  Zap,
  Ban,
  CreditCard,
  Settings,
  Coins,
  Package,
  Ticket,
  CheckCircle2,
  AlertTriangle,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { usePremiumContext } from "@/components/premium-context";
import { getShopData, claimReward } from "@/app/(dashboard)/shop/actions";
import type { ShopData } from "@/app/(dashboard)/shop/actions";
import { toast } from "sonner";

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const { isPremium, refresh } = usePremiumContext();
  const searchParams = useSearchParams();
  const [checkingOut, setCheckingOut] = useState(false);
  const [managingPortal, setManagingPortal] = useState(false);
  const [shopData, setShopData] = useState<ShopData | null>(null);
  const [loadingShop, setLoadingShop] = useState(true);
  const [claimingId, setClaimingId] = useState<string | null>(null);

  // Load shop data
  useEffect(() => {
    getShopData()
      .then(setShopData)
      .finally(() => setLoadingShop(false));
  }, []);

  // Handle Stripe redirect results
  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    if (success === "true") {
      toast.success("Bienvenue chez les Golden Ball ! 🏆", {
        description: "Ton abonnement premium est maintenant actif.",
        duration: 6000,
      });
      refresh();
      // Clean URL
      window.history.replaceState({}, "", "/shop");
    } else if (canceled === "true") {
      toast.info("Paiement annulé", {
        description: "Tu peux réessayer quand tu veux.",
        duration: 4000,
      });
      window.history.replaceState({}, "", "/shop");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Erreur lors du paiement");
        setCheckingOut(false);
      }
    } catch {
      toast.error("Erreur de connexion au serveur de paiement");
      setCheckingOut(false);
    }
  };

  const handlePortal = async () => {
    setManagingPortal(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Erreur lors de l'ouverture du portail");
        setManagingPortal(false);
      }
    } catch {
      toast.error("Erreur de connexion");
      setManagingPortal(false);
    }
  };

  const handleClaim = async (rewardId: string) => {
    setClaimingId(rewardId);
    try {
      const result = await claimReward(rewardId);
      if (result.success) {
        toast.success("Récompense obtenue ! 🎉", {
          description: `Code : ${result.code}`,
          duration: 8000,
        });
        // Refresh shop data
        const updated = await getShopData();
        setShopData(updated);
      } else {
        toast.error(result.error || "Erreur");
      }
    } catch {
      toast.error("Erreur lors de la réclamation");
    } finally {
      setClaimingId(null);
    }
  };

  return (
    <div className="space-y-10">
      {/* ─── Header ─── */}
      <section>
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white">
          <Gift className="h-6 w-6 text-[#E2001A]" /> Boutique
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Passe Premium ou échange tes FootPoints contre des récompenses
        </p>
      </section>

      {/* ─── 1. Golden Ball Premium Card ─── */}
      <section className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-950/50 via-[#141420] to-yellow-950/30 shadow-xl shadow-amber-500/10">
        {/* Decorative glows */}
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl" />
        <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-yellow-500/10 blur-3xl" />

        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 shadow-lg shadow-amber-500/30">
                <Crown className="h-7 w-7 text-amber-900" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Golden Ball</h2>
                <p className="text-sm text-amber-300/60">
                  Abonnement Premium
                </p>
              </div>
            </div>
            {isPremium && (
              <span className="flex items-center gap-1 rounded-lg bg-[#00A651]/20 px-3 py-1 text-xs font-bold text-[#00A651]">
                <Star className="h-3 w-3 fill-current" /> Actif
              </span>
            )}
          </div>

          {/* Benefits */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <BenefitCard
              icon={<Ban className="h-5 w-5 text-[#C5E86C]" />}
              title="Zéro publicité"
              description="Joue sans aucune interruption publicitaire"
            />
            <BenefitCard
              icon={<Zap className="h-5 w-5 text-[#C5E86C]" />}
              title="Parties illimitées"
              description="Plus de limite quotidienne de parties"
            />
            <BenefitCard
              icon={<Sparkles className="h-5 w-5 text-[#C5E86C]" />}
              title="Badge exclusif"
              description="Affiche ton statut Golden Ball partout"
            />
          </div>

          {/* Price + CTA */}
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">3,99 €</span>
                <span className="text-sm text-amber-300/50">/ mois</span>
              </div>
              <p className="text-xs text-amber-300/40">
                <CreditCard className="mr-1 inline h-3 w-3" />
                Paiement sécurisé via Stripe
              </p>
            </div>

            {isPremium ? (
              <button
                onClick={handlePortal}
                disabled={managingPortal}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-8 py-3.5 text-sm font-bold text-amber-300 transition-all hover:-translate-y-0.5 hover:bg-amber-500/20 disabled:opacity-50 sm:w-auto"
              >
                {managingPortal ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Chargement...
                  </>
                ) : (
                  <>
                    <Settings className="h-4 w-4" /> Gérer mon abonnement
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleCheckout}
                disabled={checkingOut}
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 px-8 py-3.5 text-base font-black text-amber-900 shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50 sm:w-auto"
              >
                {checkingOut ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Redirection
                    vers Stripe...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Crown className="h-5 w-5" /> Devenir Golden Ball
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ─── 2. Récompenses partenaires ─── */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
          <ShoppingCart className="h-5 w-5 text-[#E2001A]" /> Récompenses
        </h2>

        {loadingShop ? (
          <div className="flex items-center justify-center rounded-xl border border-[#252536] bg-[#141420] p-12">
            <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
          </div>
        ) : shopData && shopData.rewards.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shopData.rewards.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                userPoints={shopData.userPoints}
                claiming={claimingId === reward.id}
                onClaim={() => handleClaim(reward.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#252536] bg-[#141420] p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1E1E2E]">
              <Package className="h-8 w-8 text-zinc-600" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">
              Bientôt disponible
            </h3>
            <p className="mt-1 max-w-xs text-sm text-zinc-500">
              Les récompenses de nos partenaires arrivent bientôt. Accumule tes
              FootPoints en attendant !
            </p>
          </div>
        )}
      </section>

      {/* ─── 3. Mes récompenses ─── */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
          <Ticket className="h-5 w-5 text-[#C5E86C]" /> Mes récompenses
        </h2>

        {loadingShop ? (
          <div className="flex items-center justify-center rounded-xl border border-[#252536] bg-[#141420] p-12">
            <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
          </div>
        ) : shopData && shopData.userRewards.length > 0 ? (
          <div className="grid gap-3">
            {shopData.userRewards.map((ur) => (
              <UserRewardCard key={ur.id} reward={ur} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#252536] bg-[#141420] p-8 text-center">
            <Gift className="h-10 w-10 text-zinc-600" />
            <p className="mt-3 text-sm text-zinc-500">
              Tu n&apos;as pas encore de récompense. Échange tes FootPoints
              ci-dessus !
            </p>
          </div>
        )}
      </section>

      {/* ─── FootPoints info ─── */}
      {shopData && (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-[#252536] bg-[#141420] px-4 py-3">
          <Coins className="h-4 w-4 text-[#C5E86C]" />
          <span className="text-sm font-bold text-[#C5E86C]">
            {shopData.userPoints.toLocaleString("fr-FR")} FootPoints
          </span>
          <span className="text-xs text-zinc-500">disponibles</span>
        </div>
      )}
    </div>
  );
}

/* ─── Sub-components ─── */

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

function RewardCard({
  reward,
  userPoints,
  claiming,
  onClaim,
}: {
  reward: {
    id: string;
    nom: string;
    description: string | null;
    image_url: string | null;
    cout_points: number;
    stock: number;
    partenaire: { nom: string; logo_url: string | null } | null;
  };
  userPoints: number;
  claiming: boolean;
  onClaim: () => void;
}) {
  const canAfford = userPoints >= reward.cout_points;
  const inStock = reward.stock > 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-[#252536] bg-[#141420] transition-all hover:border-[#3B1F8E]/40 hover:shadow-[0_0_20px_rgba(59,31,142,0.1)]">
      {/* Image or placeholder */}
      {reward.image_url ? (
        <div
          className="h-36 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${reward.image_url})` }}
        />
      ) : (
        <div className="flex h-36 items-center justify-center bg-gradient-to-br from-[#1E1E2E] to-[#252536]">
          <Gift className="h-10 w-10 text-zinc-600" />
        </div>
      )}

      <div className="flex flex-1 flex-col p-4">
        {/* Partner name */}
        {reward.partenaire && (
          <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#C5E86C]">
            {reward.partenaire.nom}
          </span>
        )}

        <h3 className="text-sm font-bold text-white">{reward.nom}</h3>

        {reward.description && (
          <p className="mt-1 flex-1 text-xs text-zinc-500 line-clamp-2">
            {reward.description}
          </p>
        )}

        {/* Price & stock */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Coins className="h-3.5 w-3.5 text-[#C5E86C]" />
            <span className="text-sm font-bold text-[#C5E86C]">
              {reward.cout_points.toLocaleString("fr-FR")}
            </span>
          </div>
          <span
            className={`text-[10px] font-medium ${inStock ? "text-zinc-500" : "text-red-500"}`}
          >
            {inStock ? `${reward.stock} restant(s)` : "Épuisé"}
          </span>
        </div>

        {/* Claim button */}
        <button
          onClick={onClaim}
          disabled={!canAfford || !inStock || claiming}
          className={`mt-3 w-full rounded-lg px-4 py-2.5 text-xs font-bold transition-all ${
            canAfford && inStock
              ? "bg-gradient-to-r from-[#3B1F8E] to-purple-800 text-white shadow-lg shadow-[#3B1F8E]/20 hover:-translate-y-0.5 hover:shadow-xl"
              : "border border-[#252536] bg-[#1E1E2E] text-zinc-600 cursor-not-allowed"
          }`}
        >
          {claiming ? (
            <span className="flex items-center justify-center gap-1.5">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Échange...
            </span>
          ) : !inStock ? (
            "Rupture de stock"
          ) : !canAfford ? (
            `Il te manque ${(reward.cout_points - userPoints).toLocaleString("fr-FR")} FP`
          ) : (
            <span className="flex items-center justify-center gap-1.5">
              <ShoppingCart className="h-3.5 w-3.5" /> Échanger
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

function UserRewardCard({
  reward,
}: {
  reward: {
    id: string;
    code_unique: string;
    statut: "actif" | "utilise" | "expire";
    date_obtention: string;
    recompense: {
      nom: string;
      image_url: string | null;
      partenaire: {
        nom: string;
        site_web: string | null;
      } | null;
    } | null;
  };
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reward.code_unique);
    setCopied(true);
    toast.success("Code copié dans le presse-papier !");
    setTimeout(() => setCopied(false), 2000);
  };

  const statusConfig = {
    actif: {
      label: "Actif",
      color: "bg-[#00A651]/15 text-[#00A651]",
      icon: <CheckCircle2 className="h-3 w-3" />,
    },
    utilise: {
      label: "Utilisé",
      color: "bg-zinc-500/15 text-zinc-500",
      icon: <CheckCircle2 className="h-3 w-3" />,
    },
    expire: {
      label: "Expiré",
      color: "bg-red-500/15 text-red-500",
      icon: <AlertTriangle className="h-3 w-3" />,
    },
  };

  const status = statusConfig[reward.statut];
  const date = new Date(reward.date_obtention).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const partnerName = reward.recompense?.partenaire?.nom;
  const rewardName = reward.recompense?.nom || "";
  const isFootQuestItem =
    partnerName === "FootQuest Official" ||
    rewardName.includes("Badge") ||
    rewardName.includes("Titre") ||
    rewardName.includes("Bannière") ||
    rewardName.includes("Banniere") ||
    rewardName.includes("Avatar");

  const siteWeb = reward.recompense?.partenaire?.site_web;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#252536] bg-[#141420] p-4 sm:flex-row sm:items-center sm:justify-between transition-colors hover:border-[#3B1F8E]/30">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1E1E2E]">
          {isFootQuestItem ? (
            <Sparkles className="h-5 w-5 text-[#C5E86C]" />
          ) : (
            <Ticket className="h-5 w-5 text-[#C5E86C]" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-white">
              {reward.recompense?.nom || "Récompense"}
            </p>
            <span
              className={`flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-bold ${status.color}`}
            >
              {status.icon} {status.label}
            </span>
          </div>
          <p className="mt-0.5 text-[11px] text-zinc-500">
            Obtenu le {date}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isFootQuestItem ? (
          <span className="flex items-center gap-1.5 rounded-lg border border-[#00A651]/30 bg-[#00A651]/10 px-3 py-1.5 text-xs font-bold text-[#00A651]">
            <CheckCircle2 className="h-3.5 w-3.5" /> Débloqué sur le profil
          </span>
        ) : (
          <>
            <div className="flex items-center gap-1.5 rounded-lg border border-[#252536] bg-[#1E1E2E] px-3 py-1.5 font-mono text-xs font-bold text-zinc-200">
              <span>{reward.code_unique}</span>
              <button
                onClick={handleCopy}
                className="ml-1 text-zinc-400 hover:text-white transition-colors"
                title="Copier le code"
              >
                {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-[#00A651]" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>

            {siteWeb && (
              <a
                href={siteWeb}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-lg border border-[#3B1F8E]/40 bg-[#3B1F8E]/20 px-3 py-1.5 text-xs font-semibold text-[#C5E86C] hover:bg-[#3B1F8E]/40 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Site
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}
