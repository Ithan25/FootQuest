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
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#3B1F8E]/30 bg-[#3B1F8E]/10 px-4 py-1.5 text-sm font-semibold text-[#C5E86C]">
          <Gamepad2 className="h-4 w-4" /> Guide complet
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          Comment jouer à <span className="text-white">FootQuest</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
          Découvre les règles, les mécaniques et les astuces de chaque mini-jeu pour maximiser tes FootPoints et grimper dans le classement mondial.
        </p>
      </div>

      <nav className="mx-auto mt-12 max-w-md rounded-xl border border-[#252536] bg-[#141420]/50 p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Sommaire</h2>
        <ul className="mt-3 space-y-2">
          <li><a href="#scout-master" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-[#00A651]"><ChevronRight className="h-3 w-3 text-[#00A651]" /> Scout Master</a></li>
          <li><a href="#missing-piece" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-[#E2001A]"><ChevronRight className="h-3 w-3 text-[#E2001A]" /> The Missing Piece</a></li>
          <li><a href="#foot-trivia" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white"><ChevronRight className="h-3 w-3 text-white" /> Foot Trivia</a></li>
          <li><a href="#astuces" className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white"><ChevronRight className="h-3 w-3 text-zinc-500" /> Astuces générales</a></li>
        </ul>
      </nav>

      <div className="mt-16 space-y-20">
        {/* SCOUT MASTER */}
        <section id="scout-master" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00A651] to-emerald-800 shadow-lg shadow-[#00A651]/20">
              <Search className="h-7 w-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Scout Master</h2>
              <p className="text-sm text-zinc-500">Devine la sélection nationale</p>
            </div>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-zinc-300">
            <h3 className="text-lg font-bold text-white">🎯 Objectif</h3>
            <p>Dans Scout Master, tu incarnes un recruteur international. On te présente une liste de clubs dans lesquels évoluent les joueurs d&apos;une sélection nationale qualifiée pour la Coupe du Monde 2026. Ton objectif : <strong className="text-white">deviner de quelle équipe nationale il s&apos;agit</strong>.</p>

            <h3 className="text-lg font-bold text-white">📋 Règles du jeu</h3>
            <ul className="ml-4 list-inside list-disc space-y-2 text-zinc-400">
              <li>Le jeu affiche les clubs (pas les noms des joueurs) d&apos;une sélection nationale sur un terrain.</li>
              <li>Tu dois <strong className="text-white">taper le nom du pays</strong> dans un champ de recherche — une autocomplétion te propose des suggestions au fur et à mesure de ta saisie.</li>
              <li>Tu peux demander à <strong className="text-white">révéler plus de clubs</strong> si tu es bloqué, mais moins tu utilises d&apos;indices, plus tu gagnes de points.</li>
              <li>Tu peux aussi utiliser la fonction <strong className="text-white">Passer</strong> pour sauter une question difficile.</li>
              <li>Un <strong className="text-white">timer</strong> décompte le temps — un bonus de points est accordé si tu réponds rapidement.</li>
            </ul>

            <h3 className="text-lg font-bold text-white">⚙️ Niveaux de difficulté</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-[#00A651]/20 bg-[#00A651]/5 p-4">
                <span className="text-sm font-bold text-[#00A651]">Facile</span>
                <p className="mt-1 text-xs text-zinc-400">5 clubs affichés dès le départ, 90 secondes pour répondre. Idéal pour découvrir le jeu.</p>
              </div>
              <div className="rounded-lg border border-[#C5E86C]/20 bg-[#C5E86C]/5 p-4">
                <span className="text-sm font-bold text-[#C5E86C]">Moyen</span>
                <p className="mt-1 text-xs text-zinc-400">3 clubs affichés, 60 secondes. Points multipliés par 1,5.</p>
              </div>
              <div className="rounded-lg border border-[#E2001A]/20 bg-[#E2001A]/5 p-4">
                <span className="text-sm font-bold text-[#E2001A]">Difficile</span>
                <p className="mt-1 text-xs text-zinc-400">1 seul club affiché, 30 secondes. Points multipliés par 2 !</p>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white">💡 Astuces</h3>
            <p>Observe les ligues : si tu vois plusieurs clubs de Premier League, cela pourrait indiquer l&apos;Angleterre, mais aussi le Nigeria ou le Ghana dont les joueurs évoluent souvent en Angleterre. Regarde les clubs du championnat local : un joueur dans un club saoudien, turc ou japonais peut être un indice fort. N&apos;hésite pas à demander plus d&apos;indices si tu es bloqué, même si cela réduit tes points — mieux vaut une bonne réponse avec plus d&apos;indices qu&apos;un Skip !</p>
          </div>
        </section>

        {/* THE MISSING PIECE */}
        <section id="missing-piece" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#E2001A] to-red-800 shadow-lg shadow-[#E2001A]/20">
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
              <li>Le joueur manquant peut être à n&apos;importe quel poste : gardien, défenseur, milieu ou attaquant. Son <strong className="text-white">poste et son numéro</strong> sont affichés comme indices.</li>
              <li>Tu dois <strong className="text-white">taper le nom du joueur</strong> dans un champ de recherche — une autocomplétion te propose des suggestions dès 2 lettres saisies.</li>
              <li>Un <strong className="text-white">timer</strong> décompte le temps. Un bonus de points est accordé si tu réponds rapidement.</li>
              <li>La fonction Passer te permet de passer à la question suivante si tu es bloqué.</li>
            </ul>

            <h3 className="text-lg font-bold text-white">💡 Astuces</h3>
            <p>Le poste et le numéro du joueur manquant sont affichés — utilise-les ! Si c&apos;est un numéro 9, c&apos;est probablement l&apos;avant-centre titulaire. Regarde aussi les noms des autres joueurs affichés : ils te donnent le contexte de l&apos;équipe et te permettent de deviner qui manque. Par exemple, si tu vois l&apos;équipe de France sans Mbappé, c&apos;est sûrement lui la pièce manquante.</p>
          </div>
        </section>

        {/* FOOT TRIVIA */}
        <section id="foot-trivia" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#3B1F8E] to-purple-900 shadow-lg shadow-[#3B1F8E]/20">
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
              <div className="rounded-lg border border-[#252536] bg-[#141420]/50 p-4">
                <span className="text-sm font-bold text-[#C5E86C]">🏆 Palmarès</span>
                <p className="mt-1 text-xs text-zinc-400">Qui a remporté le mondial en 1998 ? Combien d&apos;étoiles pour le Brésil ?</p>
              </div>
              <div className="rounded-lg border border-[#252536] bg-[#141420]/50 p-4">
                <span className="text-sm font-bold text-[#C5E86C]">⚽ Records</span>
                <p className="mt-1 text-xs text-zinc-400">Meilleur buteur de l&apos;histoire des Coupes du Monde, plus jeune joueur…</p>
              </div>
              <div className="rounded-lg border border-[#252536] bg-[#141420]/50 p-4">
                <span className="text-sm font-bold text-[#C5E86C]">🌍 Géographie</span>
                <p className="mt-1 text-xs text-zinc-400">Quels pays ont accueilli le mondial ? Où se jouera 2026 ?</p>
              </div>
              <div className="rounded-lg border border-[#252536] bg-[#141420]/50 p-4">
                <span className="text-sm font-bold text-[#C5E86C]">🔥 Faits marquants</span>
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
            <Star className="h-7 w-7 text-[#C5E86C]" /> Astuces générales pour progresser
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

      <div className="mt-16 rounded-xl border border-[#252536] bg-gradient-to-r from-[#141420] to-[#141420]/50 p-8 text-center">
        <h3 className="text-xl font-bold text-white">Prêt à jouer ?</h3>
        <p className="mt-2 text-sm text-zinc-400">Maintenant que tu connais les règles, prouve tes connaissances !</p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/signup" className="group flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-bold text-zinc-950 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]">
            Créer mon compte <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/guide/systeme-de-points" className="flex items-center gap-2 rounded-xl border border-zinc-700 px-8 py-3 text-sm font-semibold text-zinc-300 hover:border-[#3B1F8E]/50 hover:text-white">
            Comprendre les points
          </Link>
        </div>
      </div>
    </div>
  );
}
