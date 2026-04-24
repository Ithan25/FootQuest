import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Conditions Générales d'Utilisation - FootQuest",
};

export default function CGUPage() {
  return (
    <div className="space-y-6">
      <Link href="/login" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>
      
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Conditions Générales d'Utilisation (CGU)</h1>
        <p className="mt-2 text-zinc-400">En vigueur au 24/04/2026</p>
      </div>

      <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Objet</h2>
          <p>
            Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités de mise à disposition des services du site et de l'application FootQuest (ci-après "le Service") et les conditions d'utilisation par l'utilisateur.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Accès au service</h2>
          <p>
            L'utilisation du Service nécessite la création d'un compte utilisateur. Vous êtes responsable de la confidentialité de vos identifiants de connexion. L'éditeur s'efforce de permettre l'accès au site 24 heures sur 24, 7 jours sur 7, sauf en cas de force majeure ou d'un événement hors de son contrôle.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Règles de conduite</h2>
          <p>
            L'utilisateur s'engage à utiliser le Service de manière loyale, conformément à sa destination et aux lois en vigueur. Sont notamment interdits :
          </p>
          <ul className="list-inside list-disc space-y-1 ml-2">
            <li>L'utilisation de robots ou de moyens automatisés pour jouer aux mini-jeux ou altérer les classements (Leaderboard).</li>
            <li>Le harcèlement, l'intimidation ou les comportements dégradants envers d'autres utilisateurs.</li>
            <li>La création de multiples comptes pour contourner les limites de jeux ou frauder les systèmes de récompenses.</li>
          </ul>
          <p>En cas de non-respect de ces règles, l'éditeur se réserve le droit de suspendre ou de supprimer le compte de l'utilisateur sans préavis.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Publicité et Monétisation</h2>
          <p>
            L'accès gratuit à certains de nos jeux est financé par la diffusion d'annonces publicitaires, notamment via le programme Google AdSense. L'utilisateur accepte que des publicités soient affichées lors de l'utilisation du Service. Les utilisateurs ayant souscrit à l'offre Premium bénéficient d'une expérience sans publicité.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">5. Limitation de responsabilité</h2>
          <p>
            L'éditeur ne saurait être tenu responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès au site FootQuest. L'éditeur décline toute responsabilité quant à l'utilisation qui pourrait être faite des informations et contenus présents sur le site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">6. Modification des CGU</h2>
          <p>
            L'éditeur se réserve la possibilité de modifier, à tout moment et sans préavis, les présentes CGU afin de les adapter aux évolutions du site et/ou de son exploitation.
          </p>
        </section>
      </div>
    </div>
  );
}
