import { Metadata } from "next";
import Link from "next/link";
import { Coins, Trophy, Zap, Star, Crown, Gamepad2, ArrowRight, TrendingUp, Gift } from "lucide-react";

export const metadata: Metadata = {
  title: "Système de Points FootQuest — FootPoints, Classement & Récompenses",
  description: "Comprends comment gagner des FootPoints, monter dans le classement mondial et débloquer des récompenses sur FootQuest. Guide complet du système de progression.",
  alternates: { canonical: "https://footquest.fr/guide/systeme-de-points" },
};

export default function PointsSystemPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FFE600]/20 bg-[#FFE600]/5 px-4 py-1.5 text-sm font-semibold text-[#FFE600]">
          <Coins className="h-4 w-4" /> Système de progression
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          FootPoints, Classement{" "}
          <span className="bg-gradient-to-r from-[#FFE600] to-amber-300 bg-clip-text text-transparent">&amp; Récompenses</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
          Découvre comment fonctionne le système de points de FootQuest, comment grimper dans le classement mondial et quelles récompenses t&apos;attendent.
        </p>
      </div>

      <div className="mt-14 space-y-16 text-base leading-relaxed text-zinc-300">
        {/* FootPoints */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-3 text-2xl font-black text-white">
            <Coins className="h-7 w-7 text-[#FFE600]" /> Qu&apos;est-ce qu&apos;un FootPoint ?
          </h2>
          <p>Les <strong className="text-[#FFE600]">FootPoints (FP)</strong> sont la monnaie virtuelle de FootQuest. Tu en gagnes à chaque bonne réponse dans n&apos;importe quel mini-jeu. Plus tu accumules de FootPoints, plus tu montes dans le classement mondial. C&apos;est la mesure de ton expertise footballistique globale sur la plateforme.</p>
          <p>Les FootPoints ne peuvent pas être achetés avec de l&apos;argent réel — ils se gagnent uniquement en jouant. Cela garantit que le classement reflète les véritables connaissances des joueurs.</p>
        </section>

        {/* Comment gagner */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-3 text-2xl font-black text-white">
            <TrendingUp className="h-7 w-7 text-[#00FF87]" /> Comment gagner des FootPoints ?
          </h2>
          <p>Chaque mini-jeu a son propre barème de points. Voici les facteurs qui influencent le nombre de FootPoints gagnés :</p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <div className="flex items-center gap-2 text-[#00FF87]">
                <Zap className="h-5 w-5" />
                <h3 className="font-bold">Difficulté</h3>
              </div>
              <p className="mt-2 text-sm text-zinc-400">Les niveaux Difficile rapportent plus de points que les niveaux Facile. Le risque est récompensé : si tu réussis une question difficile, tu gagnes un bonus significatif.</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <div className="flex items-center gap-2 text-[#FFE600]">
                <Star className="h-5 w-5" />
                <h3 className="font-bold">Précision</h3>
              </div>
              <p className="mt-2 text-sm text-zinc-400">Répondre correctement du premier coup rapporte le maximum de points. Chaque tentative incorrecte réduit le nombre de FootPoints pour cette question.</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <div className="flex items-center gap-2 text-[#FF007F]">
                <Gamepad2 className="h-5 w-5" />
                <h3 className="font-bold">Rapidité (Foot Trivia)</h3>
              </div>
              <p className="mt-2 text-sm text-zinc-400">Dans le quiz Foot Trivia, répondre rapidement te donne un bonus de temps. Plus tu réponds vite, plus tu gagnes de points supplémentaires.</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <div className="flex items-center gap-2 text-white">
                <Trophy className="h-5 w-5 text-amber-500" />
                <h3 className="font-bold">Régularité</h3>
              </div>
              <p className="mt-2 text-sm text-zinc-400">Jouer régulièrement chaque jour te permet d&apos;accumuler un capital de FootPoints significatif. La constance est la clé du classement.</p>
            </div>
          </div>
        </section>

        {/* Classement */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-3 text-2xl font-black text-white">
            <Trophy className="h-7 w-7 text-[#FFE600]" /> Le classement mondial
          </h2>
          <p>Le <strong className="text-white">classement mondial FootQuest</strong> affiche les 50 meilleurs joueurs par nombre de FootPoints accumulés. Il est visible par tous les utilisateurs depuis l&apos;onglet Classement dans l&apos;application.</p>
          <p>Le classement est mis à jour en temps réel : chaque partie terminée met immédiatement à jour ta position. Si tu n&apos;es pas dans le top 50, ta position exacte est calculée et affichée en bas de l&apos;écran pour que tu puisses suivre ta progression.</p>
          <p>Le podium (top 3) bénéficie d&apos;un affichage spécial avec des avatars agrandis, une couronne dorée pour le premier et des effets visuels néon pour mettre en valeur les meilleurs joueurs.</p>
        </section>

        {/* Limites quotidiennes */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-3 text-2xl font-black text-white">
            <Gamepad2 className="h-7 w-7 text-[#FF007F]" /> Limites quotidiennes
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <h3 className="text-lg font-bold text-white">Compte Gratuit</h3>
              <p className="mt-2 text-3xl font-black text-[#00FF87]">10 <span className="text-base font-semibold text-zinc-500">parties / jour</span></p>
              <p className="mt-2 text-sm text-zinc-400">Tu peux jouer jusqu&apos;à 10 parties par jour, réparties comme tu le souhaites entre les 3 mini-jeux. La limite se réinitialise à minuit.</p>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Golden Ball</h3>
                <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                  <Crown className="h-3 w-3" /> PREMIUM
                </span>
              </div>
              <p className="mt-2 text-3xl font-black text-[#FFE600]">∞ <span className="text-base font-semibold text-zinc-500">parties illimitées</span></p>
              <p className="mt-2 text-sm text-zinc-400">Les membres Premium n&apos;ont aucune limite de parties. Ils bénéficient aussi de la suppression des publicités et d&apos;un badge exclusif.</p>
            </div>
          </div>
        </section>

        {/* Golden Ball */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-3 text-2xl font-black text-white">
            <Crown className="h-7 w-7 text-amber-500" /> L&apos;abonnement Golden Ball
          </h2>
          <p>Le <strong className="text-[#FFE600]">Golden Ball</strong> est l&apos;offre Premium de FootQuest. Elle offre trois avantages principaux :</p>
          <ul className="ml-4 list-inside list-disc space-y-2 text-zinc-400">
            <li><strong className="text-white">Zéro publicité</strong> — Joue sans aucune interruption publicitaire entre les parties.</li>
            <li><strong className="text-white">Parties illimitées</strong> — Plus de limite de 10 parties par jour, joue autant que tu veux.</li>
            <li><strong className="text-white">Badge exclusif</strong> — Un badge doré &quot;Golden Ball&quot; s&apos;affiche à côté de ton pseudo dans le classement et sur ton profil.</li>
          </ul>
          <p>L&apos;offre Premium est actuellement en phase de test et peut être activée gratuitement depuis la Boutique ou la page Profil. L&apos;intégration d&apos;un système de paiement (Stripe) est prévue pour permettre un abonnement mensuel à un prix accessible.</p>
        </section>

        {/* Récompenses futures */}
        <section className="space-y-6">
          <h2 className="flex items-center gap-3 text-2xl font-black text-white">
            <Gift className="h-7 w-7 text-[#FF007F]" /> Récompenses à venir
          </h2>
          <p>Nous travaillons sur un système de récompenses qui te permettra d&apos;échanger tes FootPoints contre des avantages exclusifs. Parmi les idées à l&apos;étude :</p>
          <ul className="ml-4 list-inside list-disc space-y-2 text-zinc-400">
            <li>Avatars et thèmes visuels personnalisés pour ton profil.</li>
            <li>Badges de compétence à débloquer selon tes performances dans chaque jeu.</li>
            <li>Récompenses saisonnières liées aux grands événements football (Coupe du Monde, Euro, etc.).</li>
          </ul>
          <p>Ces fonctionnalités seront déployées progressivement. Suis les mises à jour de FootQuest pour être informé des nouveautés !</p>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Link href="/signup" className="group inline-flex items-center gap-2 rounded-xl bg-[#00FF87] px-8 py-4 text-base font-bold text-zinc-950 shadow-lg shadow-[#00FF87]/25 transition-all hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,255,135,0.4)]">
          Commencer à accumuler des FootPoints <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
