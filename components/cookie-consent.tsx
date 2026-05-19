"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
    // Reload to allow AdSense to load if it was blocked
    window.location.reload();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000] border-t border-[#252536] bg-[#0A0A0F]/95 p-4 shadow-2xl backdrop-blur-md sm:p-6 animate-in slide-in-from-bottom-full duration-500">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-sm text-zinc-300">
          <p>
            Nous utilisons des cookies pour améliorer votre expérience et financer notre site via la publicité (Google AdSense). 
            Des tiers peuvent collecter des données à des fins de ciblage publicitaire.
            En savoir plus dans notre <Link href="/politique-confidentialite" className="text-[#C5E86C] hover:underline font-semibold">Politique de confidentialité</Link>.
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <button
            onClick={handleDecline}
            className="rounded-lg border border-[#252536] bg-[#141420] px-4 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:bg-[#1E1E2E] hover:text-white"
          >
            Refuser l'essentiel
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-zinc-950 transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          >
            Tout Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
