import Link from "next/link";
import { Metadata } from "next";
import { Trophy, Search, Puzzle, HelpCircle, Zap, Users, Target, Star, ArrowRight, Gamepad2, Shield, Award } from "lucide-react";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";

export const metadata: Metadata = {
  title: "FootQuest — Mini-jeux de Football Gratuits | Coupe du Monde 2026",
  description:
    "Teste tes connaissances football avec 3 mini-jeux gratuits inspirés de la Coupe du Monde 2026. Scout Master, The Missing Piece et Foot Trivia t'attendent. Rejoins la communauté FootQuest !",
  openGraph: {
    title: "FootQuest — Mini-jeux de Football Gratuits",
    description: "Teste tes connaissances football avec 3 mini-jeux gratuits inspirés de la Coupe du Monde 2026.",
    url: "https://footquest.fr",
    siteName: "FootQuest",
    type: "website",
    locale: "fr_FR",
  },
  alternates: { canonical: "https://footquest.fr" },
};

export default function LandingPage() {
  return (
    <div className="min-h-svh bg-[#09090b] text-zinc-50">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00FF87]/[0.03] blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#FF007F]/[0.02] blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>
      <PublicHeader />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#00FF87]/[0.06] blur-[100px]" />
          <div className="relative mx-auto max-w-5xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00FF87]/20 bg-[#00FF87]/5 px-4 py-1.5 text-sm font-semibold text-[#00FF87]">
              <Gamepad2 className="h-4 w-4" /> Coupe du Monde 2026 • 48 équipes
            </div>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Deviens le meilleur{" "}
              <span className="bg-gradient-to-r from-[#00FF87] via-emerald-300 to-[#00FF87] bg-clip-text text-transparent">expert football</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
              FootQuest est une plateforme gratuite de mini-jeux de football conçue pour tester tes connaissances
              sur les sélections nationales, les joueurs et l&apos;histoire de la Coupe du Monde. Trois jeux originaux,
              un classement mondial, et des défis quotidiens t&apos;attendent.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup" className="group flex items-center gap-2 rounded-xl bg-[#00FF87] px-8 py-4 text-base font-bold text-zinc-950 shadow-lg shadow-[#00FF87]/25 transition-all hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,255,135,0.4)]">
                Commencer à jouer <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/guide/comment-jouer" className="flex items-center gap-2 rounded-xl border border-zinc-700 px-8 py-4 text-base font-semibold text-zinc-300 transition-all hover:border-zinc-500 hover:text-white">
                Découvrir les jeux
              </Link>
            </div>
            <div className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500 sm:gap-10">
              <div className="flex items-center gap-2"><Users className="h-4 w-4 text-[#00FF87]" /><span>Communauté active</span></div>
              <div className="flex items-center gap-2"><Gamepad2 className="h-4 w-4 text-[#FF007F]" /><span>3 mini-jeux uniques</span></div>
              <div className="flex items-center gap-2"><Trophy className="h-4 w-4 text-[#FFE600]" /><span>Classement mondial</span></div>
            </div>
          </div>
        </section>

        {/* JEUX */}
        <section id="jeux" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Trois jeux, un seul objectif : <span className="text-[#00FF87]">prouver que tu es le meilleur</span></h2>
              <p className="mx-auto mt-4 max-w-2xl text-zinc-400">Chaque jeu teste une facette différente de tes connaissances footballistiques. Du recrutement à la culture générale, montre que tu maîtrises le football mondial.</p>
            </div>
            <div className="mt-14 grid gap-8 lg:grid-cols-3">
              <GameArticle icon={<Search className="h-7 w-7 text-white" />} gradient="from-[#00FF87] to-emerald-700" shadow="shadow-[#00FF87]/20" hoverBorder="hover:border-[#00FF87]/30" hoverShadow="hover:shadow-[0_0_30px_rgba(0,255,135,0.08)]" title="Scout Master" tagColor="text-[#00FF87]" tag="Reconnaissance • Déduction • Culture club" tagIcon={<Target className="h-4 w-4" />}>
                <p className="mt-3 leading-relaxed text-zinc-400">Mets-toi dans la peau d&apos;un recruteur de talent. On te montre les clubs dans lesquels jouent les membres d&apos;une sélection nationale et tu dois deviner de quelle équipe il s&apos;agit en tapant le nom du pays. Connais-tu assez bien les effectifs des 48 nations qualifiées pour la Coupe du Monde 2026 ?</p>
                <p className="mt-3 leading-relaxed text-zinc-400">Le jeu propose plusieurs niveaux de difficulté : en mode Facile, tu vois 5 clubs et tu as 90 secondes ; en mode Difficile, un seul indice et 30 secondes. Plus tu joues, plus tu apprends à reconnaître les profils de chaque sélection.</p>
              </GameArticle>
              <GameArticle icon={<Puzzle className="h-7 w-7 text-white" />} gradient="from-[#FF007F] to-fuchsia-700" shadow="shadow-[#FF007F]/20" hoverBorder="hover:border-[#FF007F]/30" hoverShadow="hover:shadow-[0_0_30px_rgba(255,0,127,0.08)]" title="The Missing Piece" tagColor="text-[#FF007F]" tag="Mémoire • Tactique • Connaissance des effectifs" tagIcon={<Puzzle className="h-4 w-4" />}>
                <p className="mt-3 leading-relaxed text-zinc-400">Une composition nationale, un joueur manquant. On te présente le onze type d&apos;une équipe nationale avec une place vide, son poste et son numéro. À toi de retrouver le joueur manquant en tapant son nom.</p>
                <p className="mt-3 leading-relaxed text-zinc-400">Ce jeu teste ta connaissance approfondie des compositions. Connais-tu le titulaire habituel en milieu de terrain de l&apos;Arabie Saoudite ? Le gardien titulaire du Japon ? Plus la sélection est méconnue, plus le défi est grand.</p>
              </GameArticle>
              <GameArticle icon={<HelpCircle className="h-7 w-7 text-white" />} gradient="from-[#FFE600] to-amber-600" shadow="shadow-[#FFE600]/20" hoverBorder="hover:border-[#FFE600]/30" hoverShadow="hover:shadow-[0_0_30px_rgba(255,230,0,0.08)]" title="Foot Trivia" tagColor="text-[#FFE600]" tag="Culture générale • Rapidité • Histoire" tagIcon={<Zap className="h-4 w-4" />}>
                <p className="mt-3 leading-relaxed text-zinc-400">Le quiz ultime sur la Coupe du Monde ! Des questions variées couvrant toute l&apos;histoire du football international : records, palmarès, moments iconiques et statistiques. Chaque question est chronométrée.</p>
                <p className="mt-3 leading-relaxed text-zinc-400">Qui a marqué le plus de buts en Coupe du Monde ? Quel pays a accueilli le premier tournoi en 1930 ? Le quiz couvre aussi la préparation pour le mondial 2026.</p>
              </GameArticle>
            </div>
          </div>
        </section>

        {/* COMMENT ÇA MARCHE */}
        <section className="border-y border-zinc-800 bg-zinc-900/30 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Comment fonctionne FootQuest ?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-zinc-400">FootQuest est conçu pour être simple d&apos;accès mais difficile à maîtriser. Voici comment commencer.</p>
            </div>
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <StepCard step="1" title="Crée ton compte" description="Inscris-toi gratuitement avec ton email ou ton compte Google. C'est rapide et sans engagement." />
              <StepCard step="2" title="Choisis un jeu" description="Sélectionne l'un des trois mini-jeux depuis le Hub. Chaque jeu a ses propres règles et niveaux." />
              <StepCard step="3" title="Gagne des FootPoints" description="Chaque bonne réponse te rapporte des FootPoints. Plus tu es rapide et précis, plus tu gagnes." />
              <StepCard step="4" title="Grimpe au classement" description="Compare-toi aux autres joueurs dans le classement mondial. Les meilleurs sont sur le podium." />
            </div>
          </div>
        </section>

        {/* POURQUOI FOOTQUEST */}
        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Pourquoi jouer sur FootQuest ?</h2>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard icon={<Shield className="h-6 w-6 text-[#00FF87]" />} title="100% Gratuit" description="Tous les jeux sont accessibles gratuitement. Pas d'achat nécessaire pour jouer." />
              <FeatureCard icon={<Trophy className="h-6 w-6 text-[#FFE600]" />} title="Compétition mondiale" description="Affronte des joueurs du monde entier dans un classement unique." />
              <FeatureCard icon={<Zap className="h-6 w-6 text-[#FF007F]" />} title="Parties rapides" description="Chaque partie dure entre 2 et 5 minutes. Parfait pour une pause." />
              <FeatureCard icon={<Award className="h-6 w-6 text-[#00FF87]" />} title="Apprends en jouant" description="Découvre les compositions de toutes les sélections et enrichis ta culture foot." />
              <FeatureCard icon={<Star className="h-6 w-6 text-[#FFE600]" />} title="Coupe du Monde 2026" description="Contenu mis à jour pour le mondial : 48 sélections, nouveaux groupes, format élargi." />
              <FeatureCard icon={<Gamepad2 className="h-6 w-6 text-[#FF007F]" />} title="3 jeux variés" description="Scout Master, The Missing Piece, Foot Trivia — il y en a pour tous les profils." />
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="border-t border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-[#09090b] px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Prêt à prouver tes connaissances ?</h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">Rejoins FootQuest dès maintenant. Inscription gratuite, pas de carte bancaire. Juste toi et ta passion du football.</p>
            <div className="mt-8">
              <Link href="/signup" className="group inline-flex items-center gap-2 rounded-xl bg-[#00FF87] px-10 py-4 text-lg font-bold text-zinc-950 shadow-lg shadow-[#00FF87]/25 transition-all hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,255,135,0.4)]">
                Créer mon compte gratuitement <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

function GameArticle({ icon, gradient, shadow, hoverBorder, hoverShadow, title, tagColor, tag, tagIcon, children }: { icon: React.ReactNode; gradient: string; shadow: string; hoverBorder: string; hoverShadow: string; title: string; tagColor: string; tag: string; tagIcon: React.ReactNode; children: React.ReactNode }) {
  return (
    <article className={`group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-all hover:-translate-y-1 ${hoverBorder} ${hoverShadow}`}>
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg ${shadow}`}>{icon}</div>
      <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
      {children}
      <div className={`mt-5 flex items-center gap-2 text-sm font-semibold ${tagColor}`}>{tagIcon} {tag}</div>
    </article>
  );
}

function StepCard({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00FF87]/10 text-lg font-black text-[#00FF87]">{step}</div>
      <h3 className="mt-4 text-base font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:border-zinc-700">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800">{icon}</div>
      <h3 className="mt-4 text-base font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{description}</p>
    </div>
  );
}
