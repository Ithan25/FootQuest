import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResetConsentButton } from "@/components/reset-consent-button";

export const metadata = {
  title: "Politique de Confidentialité - FootQuest",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-50 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>
      
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Politique de Confidentialité</h1>
        <p className="mt-2 text-zinc-400">En vigueur au 24/04/2026</p>
      </div>

      <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">1. Collecte des données personnelles</h2>
          <p>
            Lors de l'utilisation de FootQuest, nous sommes susceptibles de collecter les informations suivantes : adresse e-mail (lors de l'inscription), pseudo, scores dans les mini-jeux, adresse IP de connexion.
          </p>
          <p>
            Ces données sont utilisées uniquement dans le but de faire fonctionner le service (authentification, classements, progression dans le jeu).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">2. Utilisation des Cookies et Publicité Google AdSense</h2>
          <p>
            Nous utilisons des cookies (de petits fichiers textes stockés sur votre navigateur) pour améliorer votre expérience et financer le site via la publicité.
          </p>
          <ul className="list-inside list-disc space-y-1 ml-2">
            <li><strong>Cookies fonctionnels :</strong> Utilisés pour vous maintenir connecté(e) et sauvegarder vos préférences.</li>
            <li><strong>Cookies publicitaires (Google AdSense) :</strong> Des tiers, y compris Google, utilisent des cookies pour diffuser des annonces en fonction de vos visites antérieures sur notre site Web ou sur d'autres sites.</li>
          </ul>
          <p>
            L'utilisation des cookies publicitaires par Google permet à Google et à ses partenaires de diffuser des annonces pertinentes auprès de nos utilisateurs.
          </p>
          <p className="bg-zinc-800/50 p-3 rounded-lg border border-zinc-700">
            <strong>Important :</strong> Vous pouvez en savoir plus sur la façon dont Google collecte et utilise vos données en consultant la page : <br />
            <a href="https://www.google.com/policies/privacy/partners/" target="_blank" rel="noopener noreferrer" className="text-[#00FF87] hover:underline break-all">
              Comment Google utilise les données collectées via les sites ou applications de ses partenaires
            </a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">3. Gérer votre consentement publicitaire</h2>
          <p>
            Lors de votre première visite, une bannière vous a permis d'accepter ou de refuser le dépôt de cookies publicitaires. Si vous souhaitez modifier ce choix, vous pouvez <ResetConsentButton />.
          </p>
          <p>
            Vous pouvez également désactiver la publicité personnalisée dans les paramètres de votre compte Google, ou via le site <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#00FF87] hover:underline">aboutads.info</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">4. Vos droits (RGPD)</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition au traitement de vos données. Vous pouvez exercer ce droit en nous contactant à l'adresse fournie dans nos <Link href="/mentions-legales" className="text-[#00FF87] hover:underline">Mentions Légales</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
