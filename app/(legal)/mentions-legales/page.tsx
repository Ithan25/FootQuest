import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Mentions Légales - FootQuest",
};

export default function MentionsLegalesPage() {
  return (
    <div className="space-y-6">
      <Link href="/login" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>

      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Mentions Légales</h1>
        <p className="mt-2 text-zinc-400">En vigueur au 24/04/2026</p>
      </div>

      <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Éditeur du site</h2>
          <p>
            Le site et l'application FootQuest sont édités par :<br />
            <strong>Ithan Boismard--Gillot</strong><br />
            Adresse : 21 rue de la Pelleterie, 44000 Nantes<br />
            Email de contact : ithan.boismard@gmail.com<br />
            Directeur de la publication : Ithan Boismard--Gillot
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Hébergement</h2>
          <p>
            L'hébergement du site est assuré par la société Vercel Inc.<br />
            Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789, USA<br />
            Site web : https://vercel.com
          </p>
          <p>
            La base de données est hébergée par la société Supabase Inc.<br />
            Site web : https://supabase.com
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Propriété intellectuelle</h2>
          <p>
            L'ensemble des éléments figurant sur le site FootQuest (textes, graphismes, logos, icônes, images, clips audio ou vidéo, logiciels, etc.) est la propriété exclusive de l'éditeur, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de l'éditeur.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Cookies et données personnelles</h2>
          <p>
            Pour en savoir plus sur la gestion de vos données personnelles et l'utilisation des cookies (y compris les cookies publicitaires Google AdSense), veuillez consulter notre <Link href="/politique-confidentialite" className="text-[#00FF87] hover:underline">Politique de Confidentialité</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
