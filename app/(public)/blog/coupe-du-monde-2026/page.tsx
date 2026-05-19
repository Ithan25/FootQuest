import { Metadata } from "next";
import Link from "next/link";
import { Globe, Calendar, Users, MapPin, Trophy, Star, ArrowRight, Gamepad2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Coupe du Monde 2026 — Guide Complet du Mondial à 48 Équipes | FootQuest",
  description: "Tout savoir sur la Coupe du Monde FIFA 2026 : 48 équipes, nouveau format, stades aux USA, Canada et Mexique. Prépare-toi avec FootQuest !",
  alternates: { canonical: "https://footquest.fr/blog/coupe-du-monde-2026" },
};

export default function WorldCup2026Page() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C5E86C]/20 bg-[#C5E86C]/5 px-4 py-1.5 text-sm font-semibold text-[#C5E86C]">
          <Globe className="h-4 w-4" /> Coupe du Monde 2026
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          La Coupe du Monde 2026 :{" "}
          <span className="text-[#E2001A]">un mondial historique</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
          Premier mondial à 48 équipes, co-organisé par trois pays. Tout ce qu&apos;il faut savoir pour se préparer au plus grand événement sportif de la planète.
        </p>
        <p className="mt-2 text-xs text-zinc-600">Publié le 24 avril 2026 • Mis à jour le 6 mai 2026</p>
      </div>

      <div className="mt-14 space-y-12 text-base leading-relaxed text-zinc-300">
        {/* Format */}
        <section className="space-y-4">
          <h2 className="flex items-center gap-3 text-2xl font-black text-white">
            <Users className="h-7 w-7 text-[#00A651]" /> 48 équipes : un format inédit
          </h2>
          <p>La Coupe du Monde FIFA 2026 marque un tournant historique dans l&apos;histoire du football. Pour la première fois, <strong className="text-white">48 équipes nationales</strong> participeront au tournoi, contre 32 lors des éditions précédentes. Cette expansion représente une augmentation de 50 % et offre à de nombreuses nations une première participation à la plus grande compétition de football au monde.</p>
          <p>Le nouveau format prévoit <strong className="text-white">12 groupes de 4 équipes</strong> lors de la phase de poules. Les deux premiers de chaque groupe, ainsi que les 8 meilleurs troisièmes, se qualifient pour les huitièmes de finale. Au total, le tournoi comptera <strong className="text-white">104 matchs</strong> (contre 64 auparavant), répartis sur environ 39 jours de compétition.</p>
          <p>Ce format élargi permet une représentation géographique sans précédent. L&apos;Afrique passe de 5 à 9 places, l&apos;Asie de 4,5 à 8, et même l&apos;Océanie obtient une place directe. C&apos;est une révolution pour le football mondial qui permet à des pays comme l&apos;Indonésie, la Tanzanie ou Trinité-et-Tobago de rêver de Coupe du Monde.</p>
        </section>

        {/* Pays hôtes */}
        <section className="space-y-4">
          <h2 className="flex items-center gap-3 text-2xl font-black text-white">
            <MapPin className="h-7 w-7 text-[#E2001A]" /> Trois pays hôtes
          </h2>
          <p>La compétition sera co-organisée par les <strong className="text-white">États-Unis, le Canada et le Mexique</strong>. C&apos;est la première fois qu&apos;une Coupe du Monde est organisée par trois pays simultanément, et la première fois que le Canada accueille des matchs de Coupe du Monde masculine.</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-[#252536] bg-[#141420]/50 p-5 text-center">
              <p className="text-3xl">🇺🇸</p>
              <h3 className="mt-2 font-bold text-white">États-Unis</h3>
              <p className="mt-1 text-sm text-zinc-400">11 stades dont le MetLife Stadium (finale), le SoFi Stadium (Los Angeles) et le AT&T Stadium (Dallas).</p>
            </div>
            <div className="rounded-xl border border-[#252536] bg-[#141420]/50 p-5 text-center">
              <p className="text-3xl">🇲🇽</p>
              <h3 className="mt-2 font-bold text-white">Mexique</h3>
              <p className="mt-1 text-sm text-zinc-400">3 stades dont le légendaire Estadio Azteca de Mexico, qui accueillera sa troisième Coupe du Monde.</p>
            </div>
            <div className="rounded-xl border border-[#252536] bg-[#141420]/50 p-5 text-center">
              <p className="text-3xl">🇨🇦</p>
              <h3 className="mt-2 font-bold text-white">Canada</h3>
              <p className="mt-1 text-sm text-zinc-400">2 stades à Toronto et Vancouver. Une première historique pour le football canadien.</p>
            </div>
          </div>
          <p>Le match d&apos;ouverture est prévu au Estadio Azteca de Mexico, tandis que la grande finale se jouera au <strong className="text-white">MetLife Stadium</strong> de New York/New Jersey, le plus grand stade de la NFL avec une capacité de plus de 80 000 places.</p>
        </section>

        {/* Calendrier */}
        <section className="space-y-4">
          <h2 className="flex items-center gap-3 text-2xl font-black text-white">
            <Calendar className="h-7 w-7 text-[#C5E86C]" /> Dates clés
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4 rounded-lg border border-[#252536] bg-[#141420]/50 px-5 py-3">
              <span className="shrink-0 text-sm font-bold text-[#00A651]">11 juin 2026</span>
              <span className="text-sm text-zinc-400">Match d&apos;ouverture — Estadio Azteca, Mexico</span>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-[#252536] bg-[#141420]/50 px-5 py-3">
              <span className="shrink-0 text-sm font-bold text-[#C5E86C]">Juin - Juillet</span>
              <span className="text-sm text-zinc-400">Phase de groupes (12 groupes de 4)</span>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-[#252536] bg-[#141420]/50 px-5 py-3">
              <span className="shrink-0 text-sm font-bold text-[#E2001A]">Juillet 2026</span>
              <span className="text-sm text-zinc-400">Phase à élimination directe</span>
            </div>
            <div className="flex items-center gap-4 rounded-lg border border-[#252536] bg-[#141420]/50 px-5 py-3">
              <span className="shrink-0 text-sm font-bold text-[#C5E86C]">19 juillet 2026</span>
              <span className="text-sm text-zinc-400">Finale — MetLife Stadium, New York/New Jersey</span>
            </div>
          </div>
        </section>

        {/* Favoris */}
        <section className="space-y-4">
          <h2 className="flex items-center gap-3 text-2xl font-black text-white">
            <Trophy className="h-7 w-7 text-[#C5E86C]" /> Les favoris du tournoi
          </h2>
          <p>Comme à chaque édition, certaines nations partent avec une longueur d&apos;avance. Le <strong className="text-white">Brésil</strong> (5 titres), l&apos;<strong className="text-white">Argentine</strong> (triple championne en titre, vainqueur en 2022) et la <strong className="text-white">France</strong> (finaliste en 2022) figurent parmi les grands favoris.</p>
          <p>L&apos;<strong className="text-white">Angleterre</strong>, l&apos;<strong className="text-white">Espagne</strong> (championne d&apos;Europe en titre) et l&apos;<strong className="text-white">Allemagne</strong> sont également attendues dans le dernier carré. Mais le format à 48 équipes pourrait favoriser les surprises : des nations comme le <strong className="text-white">Japon</strong>, le <strong className="text-white">Maroc</strong> (demi-finaliste en 2022) ou les <strong className="text-white">États-Unis</strong> (pays hôte) pourraient créer l&apos;exploit.</p>
          <p>Le football africain, avec 9 représentants, n&apos;a jamais eu autant de chances de briller sur la scène mondiale. Le <strong className="text-white">Nigeria</strong>, le <strong className="text-white">Sénégal</strong> et le <strong className="text-white">Cameroun</strong> portent les espoirs d&apos;un continent entier.</p>
        </section>

        {/* FootQuest & CDM */}
        <section className="space-y-4">
          <h2 className="flex items-center gap-3 text-2xl font-black text-white">
            <Gamepad2 className="h-7 w-7 text-white" /> FootQuest et la Coupe du Monde 2026
          </h2>
          <p>FootQuest a été spécialement conçu autour de la Coupe du Monde 2026. Les 48 sélections qualifiées sont intégrées dans nos trois mini-jeux, avec des compositions régulièrement mises à jour pour refléter les choix les plus récents des sélectionneurs.</p>
          <p>Notre design s&apos;inspire directement de l&apos;identité visuelle du mondial avec les couleurs officielles : <strong className="text-[#3B1F8E]">violet</strong>, <strong className="text-[#E2001A]">rouge</strong>, <strong className="text-[#00A651]">vert</strong> et <strong className="text-[#C5E86C]">lime</strong>, qui reflètent l&apos;énergie et la modernité de cet événement historique.</p>
          <p>Que tu sois un fan de longue date ou que tu découvres le football international à l&apos;occasion de ce mondial, FootQuest est l&apos;outil idéal pour apprendre à connaître les 48 équipes, leurs joueurs et leurs histoires. Chaque partie jouée te rapproche un peu plus de la connaissance encyclopédique du football mondial.</p>
        </section>
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-xl border border-[#252536] bg-gradient-to-r from-[#141420] to-[#141420]/50 p-8 text-center">
        <h3 className="text-xl font-bold text-white">Prépare-toi pour la Coupe du Monde 2026</h3>
        <p className="mt-2 text-sm text-zinc-400">Teste tes connaissances sur les 48 sélections qualifiées avec les mini-jeux FootQuest.</p>
        <div className="mt-6">
          <Link href="/signup" className="group inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-sm font-bold text-zinc-950 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]">
            Jouer maintenant <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
