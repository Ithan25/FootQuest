import { Metadata } from "next";
import Link from "next/link";
import { Heart, Globe, Gamepad2, Code, Trophy, Users, Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos de FootQuest — Notre Mission & Notre Équipe",
  description:
    "Découvrez l'histoire de FootQuest, la plateforme de mini-jeux de football créée par un passionné pour les fans du monde entier. Notre mission : rendre le football plus ludique.",
  openGraph: {
    title: "À propos de FootQuest",
    description: "Découvrez l'histoire et la mission de FootQuest.",
    url: "https://footquest.fr/a-propos",
  },
  alternates: {
    canonical: "https://footquest.fr/a-propos",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Header */}
      <div className="text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00FF87]/20 bg-[#00FF87]/5 px-4 py-1.5 text-sm font-semibold text-[#00FF87]">
          <Heart className="h-4 w-4" />
          Notre histoire
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          À propos de <span className="bg-gradient-to-r from-[#00FF87] to-emerald-300 bg-clip-text text-transparent">FootQuest</span>
        </h1>
      </div>

      {/* Content */}
      <div className="mt-12 space-y-10 text-base leading-relaxed text-zinc-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Globe className="h-6 w-6 text-[#00FF87]" />
            Notre mission
          </h2>
          <p>
            FootQuest est né d'une idée simple : <strong className="text-white">rendre le football plus ludique et accessible à tous</strong>.
            À l'approche de la Coupe du Monde 2026, le premier mondial à 48 équipes de l'histoire, nous avons voulu créer
            un espace où chaque fan de football peut tester, approfondir et partager ses connaissances sur le sport le plus
            populaire au monde.
          </p>
          <p>
            Notre mission est de proposer une expérience de jeu gratuite, originale et éducative. Nous croyons que la
            connaissance du football ne se limite pas aux grands clubs européens — elle s'étend aux 48 nations qualifiées
            pour le mondial, des sélections les plus titrées aux outsiders les plus surprenants. FootQuest te permet de
            découvrir des joueurs, des équipes et des histoires que tu n'aurais peut-être jamais explorés autrement.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Gamepad2 className="h-6 w-6 text-[#FF007F]" />
            Nos jeux
          </h2>
          <p>
            FootQuest propose actuellement trois mini-jeux, chacun conçu pour tester une facette différente de ta
            culture footballistique :
          </p>
          <ul className="ml-4 list-inside list-disc space-y-2 text-zinc-400">
            <li>
              <strong className="text-white">Scout Master</strong> — Devine quelle sélection nationale se cache
              derrière la liste des clubs de ses joueurs. Comme un vrai recruteur, tu dois analyser les indices
              pour identifier l'équipe.
            </li>
            <li>
              <strong className="text-white">The Missing Piece</strong> — Une composition nationale, un joueur
              manquant. Retrouve la pièce manquante du puzzle tactique parmi plusieurs propositions.
            </li>
            <li>
              <strong className="text-white">Foot Trivia</strong> — Le quiz de culture footballistique par excellence.
              Des questions variées sur l'histoire de la Coupe du Monde, les records, les joueurs légendaires et
              les faits marquants du football international.
            </li>
          </ul>
          <p>
            Chaque jeu propose plusieurs niveaux de difficulté et des parties rapides de 2 à 5 minutes, idéales
            pour jouer pendant une pause, dans les transports ou entre amis.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Code className="h-6 w-6 text-[#FFE600]" />
            Qui se cache derrière FootQuest ?
          </h2>
          <p>
            FootQuest a été créé par <strong className="text-white">Ithan Boismard--Gillot</strong>, développeur web
            passionné de football et de technologie. Le projet est né de l'envie de combiner deux passions :
            le développement web moderne et l'amour du football international.
          </p>
          <p>
            L'application est construite avec les technologies web les plus récentes : Next.js pour le rendu,
            Supabase pour la base de données et l'authentification, et déployée sur Vercel pour garantir des
            performances optimales partout dans le monde. FootQuest est également une Progressive Web App (PWA),
            ce qui signifie que tu peux l'installer sur ton téléphone comme une application native.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="h-6 w-6 text-[#FFE600]" />
            Coupe du Monde 2026
          </h2>
          <p>
            FootQuest s'inscrit pleinement dans l'esprit de la Coupe du Monde 2026 qui se déroulera aux États-Unis,
            au Canada et au Mexique. Pour la première fois, 48 équipes participeront au tournoi, offrant une
            représentation sans précédent du football mondial.
          </p>
          <p>
            Notre design s'inspire directement de l'identité visuelle du mondial avec des couleurs néon vibrantes
            (vert, magenta et jaune) qui reflètent l'énergie et la modernité de cet événement historique. Les données
            de nos jeux sont régulièrement mises à jour pour refléter les compositions les plus récentes de chaque sélection.
          </p>
        </section>

        {/* Values */}
        <section className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
            <Users className="mx-auto h-8 w-8 text-[#00FF87]" />
            <h3 className="mt-3 text-lg font-bold text-white">Communauté</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Un classement mondial pour se comparer et progresser ensemble.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
            <Star className="mx-auto h-8 w-8 text-[#FFE600]" />
            <h3 className="mt-3 text-lg font-bold text-white">Qualité</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Des données vérifiées et une expérience soignée pour chaque joueur.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center">
            <Heart className="mx-auto h-8 w-8 text-[#FF007F]" />
            <h3 className="mt-3 text-lg font-bold text-white">Passion</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Créé par un fan pour les fans. Le football, c'est plus qu'un sport.
            </p>
          </div>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Link
          href="/signup"
          className="group inline-flex items-center gap-2 rounded-xl bg-[#00FF87] px-8 py-4 text-base font-bold text-zinc-950 shadow-lg shadow-[#00FF87]/25 transition-all hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(0,255,135,0.4)]"
        >
          Rejoindre FootQuest
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
