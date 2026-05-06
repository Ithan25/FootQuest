import { Metadata } from "next";
import Link from "next/link";
import { Search, Puzzle, HelpCircle, Star, ArrowRight, Gamepad2, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Comment jouer à FootQuest — Guide Complet des Mini-Jeux",
  description: "Guide complet pour maîtriser les 3 mini-jeux FootQuest : Scout Master, The Missing Piece et Foot Trivia. Règles, astuces et stratégies.",
  alternates: { canonical: "https://footquest.fr/guide/comment-jouer" },
};

export default function HowToPlayPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00FF87]/20 bg-[#00FF87]/5 px-4 py-1.5 text-sm font-semibold text-[#00FF87]">
          <Gamepad2 className="h-4 w-4" /> Guide complet
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          Comment jouer à <span className="bg-gradient-to-r from-[#00FF87] to-emerald-300 bg-clip-text text-transparent">FootQuest</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
          Découvre les règles, les mécaniques et les astuces de chaque mini-jeu pour maximiser tes FootPoints et grimper dans le classement mondial.
        </p>
      </div>

      <nav className="mx-auto mt-12 max-w-md rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Sommaire</h2>
        <ul className="mt-3 space-y-2">
          <li><a href="#scout-master" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-[#00FF87]"><ChevronRight className="h-3 w-3 text-[#00FF87]" /> Scout Master</a></li>
          <li><a href="#missing-piece" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-[#FF007F]"><ChevronRight className="h-3 w-3 text-[#FF007F]" /> The Missing Piece</a></li>
          <li><a href="#foot-trivia" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-[#FFE600]"><ChevronRight className="h-3 w-3 text-[#FFE600]" /> Foot Trivia</a></li>
          <li><a href="#astuces" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white"><ChevronRight className="h-3 w-3 text-zinc-500" /> Astuces générales</a></li>
        </ul>
      </nav>

      <div className="mt-16 space-y-20">
        {/* SCOUT MASTER */}
        <section id="scout-master" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00FF87] to-emerald-700 shadow-lg shadow-[#00FF87]/20">
              <Search className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Scout Master</h2>
              <p className="text-sm text-zinc-500">Devine la sélection nationale</p>
            </div>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-zinc-300">
            <h3 className="text-lg font-bold text-white">🎯 Objectif</h3>
            <p>Dans Scout Master, tu incarnes un recruteur international. On te présente une liste de clubs dans lesquels jouent les membres d&apos;une sélection nationale qualifiée pour la Coupe du Monde 2026. Ton objectif : <strong className="text-white">deviner de quelle équipe nationale il s&apos;agit</strong>.</p>

            <h3 className="text-lg font-bold text-white">📋 Règles du jeu</h3>
            <ul className="ml-4 list-inside list-disc space-y-2 text-zinc-400">
              <li>Le jeu affiche les clubs (pas les noms des joueurs) d&apos;une sélection nationale.</li>
              <li>Tu disposes de <strong className="text-white">plusieurs propositions</strong> parmi lesquelles tu dois choisir la bonne équipe.</li>
              <li>Si tu te trompes, tu peux réessayer — mais chaque erreur réduit le nombre de points gagnés.</li>
              <li>Tu peux utiliser la fonction <strong className="text-white">Skip</strong> pour passer à une autre question.</li>
              <li>Chaque bonne réponse rapporte des FootPoints en fonction de la difficulté et de ta rapidité.</li>
            </ul>

            <h3 className="text-lg font-bold text-white">⚙️ Niveaux de difficulté</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-[#00FF87]/20 bg-[#00FF87]/5 p-4">
                <span className="text-sm font-bold text-[#00FF87]">Facile</span>
                <p className="mt-1 text-xs text-zinc-400">7 clubs affichés + 3 choix de réponse. Idéal pour découvrir le jeu.</p>
              </div>
              <div className="rounded-lg border border-[#FFE600]/20 bg-[#FFE600]/5 p-4">
                <span className="text-sm font-bold text-[#FFE600]">Moyen</span>
                <p className="mt-1 text-xs text-zinc-400">5 clubs affichés + 4 choix. Les sélections sont plus variées.</p>
              </div>
              <div className="rounded-lg border border-[#FF007F]/20 bg-[#FF007F]/5 p-4">
                <span className="text-sm font-bold text-[#FF007F]">Difficile</span>
                <p className="mt-1 text-xs text-zinc-400">3 clubs seulement + 6 choix. Seuls les vrais experts réussissent !</p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white">💡 Astuces</h3>
            <p>Observe les ligues : si tu vois plusieurs clubs de Premier League, cela pourrait indiquer l&apos;Angleterre, mais aussi le Nigeria ou le Ghana dont les joueurs évoluent souvent en Angleterre. Regarde les clubs du championnat local : un joueur dans un club saoudien, turc ou japonais peut être un indice fort pour identifier la sélection. La diversité des ligues est souvent un indicateur clé.</p>
          </div>
        </section>

        {/* THE MISSING PIECE */}
        <section id="missing-piece" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF007F] to-fuchsia-700 shadow-lg shadow-[#FF007F]/20">
              <Puzzle className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">The Missing Piece</h2>
              <p className="text-sm text-zinc-500">Retrouve le joueur manquant</p>
            </div>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-zinc-300">
            <h3 className="text-lg font-bold text-white">🎯 Objectif</h3>
            <p>On te montre la composition type d&apos;une sélection nationale avec <strong className="text-white">un joueur manquant</strong>. Tu vois le nom de l&apos;équipe, la formation tactique (4-3-3, 4-4-2, etc.) et les noms de 10 joueurs. Ton rôle : identifier le 11ème joueur parmi les propositions.</p>

            <h3 className="text-lg font-bold text-white">📋 Règles du jeu</h3>
            <ul className="ml-4 list-inside list-disc space-y-2 text-zinc-400">
              <li>La composition correspond au onze type habituel de la sélection (données les plus récentes).</li>
              <li>Le joueur manquant peut être à n&apos;importe quel poste : gardien, défenseur, milieu ou attaquant.</li>
              <li>Tu dois choisir parmi <strong className="text-white">4 à 6 propositions</strong> de joueurs.</li>
              <li>Une seule réponse est correcte. Chaque erreur diminue tes points potentiels.</li>
              <li>La fonction Skip te permet de passer sans pénalité.</li>
            </ul>

            <h3 className="text-lg font-bold text-white">💡 Astuces</h3>
            <p>Commence par observer la formation tactique. Si tu vois un 4-3-3 avec seulement 2 milieux affichés, le joueur manquant est probablement un milieu. Regarde aussi les clubs des autres joueurs : si un club important de la sélection n&apos;est pas représenté, le joueur manquant y joue probablement. Par exemple, si la France est affichée sans aucun joueur du Real Madrid, un joueur madrilène est sûrement la réponse.</p>
          </div>
        </section>

        {/* FOOT TRIVIA */}
        <section id="foot-trivia" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFE600] to-amber-600 shadow-lg shadow-[#FFE600]/20">
              <HelpCircle className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Foot Trivia</h2>
              <p className="text-sm text-zinc-500">Quiz de culture football</p>
            </div>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-zinc-300">
            <h3 className="text-lg font-bold text-white">🎯 Objectif</h3>
            <p>Foot Trivia est un quiz chronométré de culture footballistique. Chaque question porte sur l&apos;histoire de la Coupe du Monde, les records du football international, les joueurs légendaires, les équipes qualifiées pour le mondial 2026 et bien plus encore.</p>

            <h3 className="text-lg font-bold text-white">📋 Règles du jeu</h3>
            <ul className="ml-4 list-inside list-disc space-y-2 text-zinc-400">
              <li>Chaque question est accompagnée d&apos;un <strong className="text-white">timer</strong> — tu as un temps limité pour répondre.</li>
              <li>Tu choisis parmi 4 propositions. Il n&apos;y a qu&apos;une seule bonne réponse.</li>
              <li>Plus tu réponds vite, plus tu gagnes de points bonus.</li>
              <li>Un quiz se compose de <strong className="text-white">10 questions</strong> enchaînées.</li>
              <li>À la fin, tu vois ton score total et le détail de tes réponses.</li>
            </ul>

            <h3 className="text-lg font-bold text-white">📚 Catégories de questions</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <span className="text-sm font-bold text-[#FFE600]">🏆 Palmarès</span>
                <p className="mt-1 text-xs text-zinc-400">Qui a remporté le mondial en 1998 ? Combien d&apos;étoiles pour le Brésil ?</p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <span className="text-sm font-bold text-[#FFE600]">⚽ Records</span>
                <p className="mt-1 text-xs text-zinc-400">Meilleur buteur de l&apos;histoire des Coupes du Monde, plus jeune joueur…</p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <span className="text-sm font-bold text-[#FFE600]">🌍 Géographie</span>
                <p className="mt-1 text-xs text-zinc-400">Quels pays ont accueilli le mondial ? Où se jouera 2026 ?</p>
              </div>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <span className="text-sm font-bold text-[#FFE600]">🔥 Moments iconiques</span>
                <p className="mt-1 text-xs text-zinc-400">Le coup de tête de Zidane, la main de Dieu, le 7-1 de 2014…</p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white">💡 Astuces</h3>
            <p>Ne perds pas de temps à hésiter trop longtemps : le timer te pénalise. Si tu ne connais pas la réponse, élimine d&apos;abord les propositions les plus improbables et fais un choix éduqué. Revenir régulièrement jouer au quiz t&apos;aidera à mémoriser les réponses.</p>
          </div>
        </section>

        {/* ASTUCES GÉNÉRALES */}
        <section id="astuces" className="scroll-mt-24 space-y-6">
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
            <Star className="h-7 w-7 text-[#FFE600]" /> Astuces générales pour progresser
          </h2>
          <ol className="ml-4 list-inside list-decimal space-y-3 text-base leading-relaxed text-zinc-400">
            <li><strong className="text-white">Joue tous les jours</strong> — La régularité est la clé. Avec 10 parties par jour, tu accumules des FootPoints rapidement.</li>
            <li><strong className="text-white">Varie les jeux</strong> — Chaque jeu entraîne une compétence différente. Alterne pour progresser de manière équilibrée.</li>
            <li><strong className="text-white">Commence en Facile</strong> — Les niveaux faciles permettent de se familiariser avec les mécaniques.</li>
            <li><strong className="text-white">Apprends de tes erreurs</strong> — Quand tu te trompes, note la bonne réponse pour la prochaine fois.</li>
            <li><strong className="text-white">Suis l&apos;actualité football</strong> — Les compositions changent avec les transferts et blessures.</li>
          </ol>
        </section>
      </div>

      <div className="mt-16 rounded-xl border border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-900/50 p-8 text-center">
        <h3 className="text-xl font-bold text-white">Prêt à jouer ?</h3>
        <p className="mt-2 text-sm text-zinc-400">Maintenant que tu connais les règles, prouve tes connaissances !</p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/signup" className="group flex items-center gap-2 rounded-xl bg-[#00FF87] px-8 py-3 text-sm font-bold text-zinc-950 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(0,255,135,0.4)]">
            Créer mon compte <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/guide/systeme-de-points" className="flex items-center gap-2 rounded-xl border border-zinc-700 px-8 py-3 text-sm font-semibold text-zinc-300 hover:border-zinc-500 hover:text-white">
            Comprendre les points
          </Link>
        </div>
      </div>
    </div>
  );
}
