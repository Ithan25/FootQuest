import { Metadata } from "next";
import { Mail, MapPin, Clock, MessageCircle, HelpCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — FootQuest | Nous contacter",
  description:
    "Contactez l'équipe FootQuest pour toute question, suggestion ou signalement. Nous sommes à votre écoute pour améliorer votre expérience de jeu.",
  openGraph: {
    title: "Contactez FootQuest",
    description: "Contactez l'équipe FootQuest pour toute question ou suggestion.",
    url: "https://footquest.fr/contact",
  },
  alternates: {
    canonical: "https://footquest.fr/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Header */}
      <div className="text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#3B1F8E]/30 bg-[#3B1F8E]/10 px-4 py-1.5 text-sm font-semibold text-[#C5E86C]">
          <MessageCircle className="h-4 w-4" />
          Nous contacter
        </div>
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          Une question ? On est là.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-400">
          Tu as une question, une suggestion d'amélioration, ou tu souhaites signaler un bug ?
          N'hésite pas à nous contacter, nous répondons à tous les messages.
        </p>
      </div>

      {/* Contact info cards */}
      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-[#252536] bg-[#141420]/50 p-6 text-center transition-all hover:border-[#3B1F8E]/30">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#3B1F8E]/15">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <h3 className="mt-4 text-base font-bold text-white">Email</h3>
          <a
            href="mailto:ithan.boismard@gmail.com"
            className="mt-2 block text-sm text-[#C5E86C] transition-colors hover:underline"
          >
            ithan.boismard@gmail.com
          </a>
        </div>

        <div className="rounded-xl border border-[#252536] bg-[#141420]/50 p-6 text-center transition-all hover:border-[#3B1F8E]/30">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#C5E86C]/10">
            <Clock className="h-6 w-6 text-[#C5E86C]" />
          </div>
          <h3 className="mt-4 text-base font-bold text-white">Délai de réponse</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Nous répondons sous 48 heures ouvrables
          </p>
        </div>

        <div className="rounded-xl border border-[#252536] bg-[#141420]/50 p-6 text-center transition-all hover:border-[#3B1F8E]/30">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#E2001A]/10">
            <MapPin className="h-6 w-6 text-[#E2001A]" />
          </div>
          <h3 className="mt-4 text-base font-bold text-white">Localisation</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Nantes, France 🇫🇷
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-20">
        <div className="text-center">
          <h2 className="flex items-center justify-center gap-2 text-2xl font-black tracking-tight text-white">
            <HelpCircle className="h-6 w-6 text-[#C5E86C]" />
            Questions fréquentes
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Avant de nous écrire, peut-être trouves-tu ta réponse ici.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <FaqItem
            question="FootQuest est-il vraiment gratuit ?"
            answer="Oui, FootQuest est entièrement gratuit. Tous les mini-jeux sont accessibles sans aucun paiement. Nous proposons également une option Premium (Golden Ball) qui supprime les publicités et offre des parties illimitées, mais elle n'est en aucun cas nécessaire pour profiter du jeu."
          />
          <FaqItem
            question="Comment créer un compte ?"
            answer="Tu peux t'inscrire gratuitement en quelques secondes avec ton email ou ton compte Google. Aucune carte bancaire n'est requise. Il te suffit de cliquer sur « Créer un compte » depuis la page d'accueil ou la page de connexion."
          />
          <FaqItem
            question="Comment fonctionne le système de points (FootPoints) ?"
            answer="Chaque bonne réponse dans un mini-jeu te rapporte des FootPoints. Le nombre de points dépend de la difficulté du jeu et de ta rapidité. Ces points sont cumulés dans un classement mondial visible depuis l'onglet Classement. Pour en savoir plus, consulte notre page dédiée au système de points."
          />
          <FaqItem
            question="Combien de parties puis-je jouer par jour ?"
            answer="Les comptes gratuits peuvent jouer jusqu'à 10 parties par jour. Les utilisateurs Premium (Golden Ball) bénéficient de parties illimitées. La limite se réinitialise chaque jour à minuit."
          />
          <FaqItem
            question="Les données de jeu sont-elles à jour ?"
            answer="Oui, nous mettons régulièrement à jour les compositions des 48 sélections nationales qualifiées pour la Coupe du Monde 2026. Les questions du quiz sont aussi mises à jour pour refléter l'actualité du football international."
          />
          <FaqItem
            question="J'ai trouvé un bug, comment le signaler ?"
            answer="Tu peux nous contacter directement par email à ithan.boismard@gmail.com en décrivant le problème rencontré. Si possible, précise le jeu concerné, le navigateur utilisé et une capture d'écran. Nous corrigeons les bugs le plus rapidement possible."
          />
          <FaqItem
            question="Puis-je installer FootQuest sur mon téléphone ?"
            answer="Oui ! FootQuest est une Progressive Web App (PWA). Sur Android, ouvre le site dans Chrome et clique sur « Ajouter à l'écran d'accueil ». Sur iPhone, ouvre le site dans Safari, appuie sur le bouton Partager puis « Sur l'écran d'accueil »."
          />
        </div>
      </div>

      {/* Final note */}
      <div className="mt-16 rounded-xl border border-[#252536] bg-[#141420]/50 p-8 text-center">
        <p className="text-base text-zinc-300">
          Tu peux aussi consulter nos{" "}
          <Link href="/cgu" className="text-[#C5E86C] hover:underline">Conditions Générales d'Utilisation</Link>,
          notre{" "}
          <Link href="/politique-confidentialite" className="text-[#C5E86C] hover:underline">Politique de Confidentialité</Link>{" "}
          et nos{" "}
          <Link href="/mentions-legales" className="text-[#C5E86C] hover:underline">Mentions Légales</Link>{" "}
          pour plus d'informations sur le fonctionnement du site.
        </p>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-xl border border-[#252536] bg-[#141420]/50 transition-all hover:border-[#3B1F8E]/30">
      <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-bold text-white [&::-webkit-details-marker]:hidden">
        {question}
        <span className="ml-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="border-t border-[#252536] px-6 py-4 text-sm leading-relaxed text-zinc-400">
        {answer}
      </div>
    </details>
  );
}
