import Link from "next/link";
import Image from "next/image";

export function PublicFooter() {
  return (
    <footer className="border-t border-[#252536] bg-[#0A0A0F]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/Logo.svg" alt="FootQuest" width={32} height={32} />
              <span className="text-lg font-black text-white">
                Foot<span className="text-white">Quest</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500">
              La plateforme de mini-jeux de football pour tester tes connaissances et devenir le meilleur recruteur.
              Inspirée par la Coupe du Monde 2026.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-zinc-500 transition-colors hover:text-[#C5E86C]">Accueil</Link></li>
              <li><Link href="/guide/comment-jouer" className="text-sm text-zinc-500 transition-colors hover:text-[#C5E86C]">Comment jouer</Link></li>
              <li><Link href="/guide/systeme-de-points" className="text-sm text-zinc-500 transition-colors hover:text-[#C5E86C]">Système de points</Link></li>
              <li><Link href="/blog/coupe-du-monde-2026" className="text-sm text-zinc-500 transition-colors hover:text-[#C5E86C]">Coupe du Monde 2026</Link></li>
            </ul>
          </div>

          {/* Informations */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Informations</h3>
            <ul className="space-y-2">
              <li><Link href="/a-propos" className="text-sm text-zinc-500 transition-colors hover:text-[#C5E86C]">À propos</Link></li>
              <li><Link href="/contact" className="text-sm text-zinc-500 transition-colors hover:text-[#C5E86C]">Contact</Link></li>
              <li><Link href="/login" className="text-sm text-zinc-500 transition-colors hover:text-[#C5E86C]">Se connecter</Link></li>
              <li><Link href="/signup" className="text-sm text-zinc-500 transition-colors hover:text-[#C5E86C]">Créer un compte</Link></li>
            </ul>
          </div>

          {/* Légal */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Légal</h3>
            <ul className="space-y-2">
              <li><Link href="/mentions-legales" className="text-sm text-zinc-500 transition-colors hover:text-[#C5E86C]">Mentions légales</Link></li>
              <li><Link href="/politique-confidentialite" className="text-sm text-zinc-500 transition-colors hover:text-[#C5E86C]">Politique de confidentialité</Link></li>
              <li><Link href="/cgu" className="text-sm text-zinc-500 transition-colors hover:text-[#C5E86C]">CGU</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#252536] pt-6 sm:flex-row">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} FootQuest — Tous droits réservés. Édité par Ithan Boismard--Gillot.
          </p>
          <p className="text-xs text-zinc-600">
            Propulsé par la passion du football ⚽
          </p>
        </div>
      </div>
    </footer>
  );
}
