"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

interface AdInterstitialProps {
  onClose: () => void;
}

const AD_DURATION = 5; // seconds before user can skip

export function AdInterstitial({ onClose }: AdInterstitialProps) {
  const [countdown, setCountdown] = useState(AD_DURATION);
  const [canSkip, setCanSkip] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const adPushed = useRef(false);

  const hasAdSense = !!process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (countdown <= 0) {
      setCanSkip(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Push AdSense ad when component mounts (production only)
  useEffect(() => {
    if (hasAdSense && !adPushed.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adPushed.current = true;
      } catch {
        // AdSense not ready yet, that's OK
      }
    }
  }, [hasAdSense]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Ad container */}
      <div className="relative z-10 mx-4 w-full max-w-sm animate-in fade-in zoom-in-95 duration-500">
        {/* Skip / Countdown button */}
        <div className="mb-3 flex justify-end">
          {canSkip ? (
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/25"
            >
              Passer la pub <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white/60 backdrop-blur-sm">
              Passer dans {countdown}s
            </span>
          )}
        </div>

        {/* Ad content */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
          {hasAdSense ? (
            /* Real Google AdSense ad slot */
            <div ref={adRef} className="min-h-[250px] flex items-center justify-center p-2">
              <ins
                className="adsbygoogle"
                style={{ display: "block", width: "100%", minHeight: "250px" }}
                data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
                data-ad-slot="auto"
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>
          ) : (
            /* Dev placeholder — shown when no AdSense ID is configured */
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                <svg className="h-8 w-8 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="18" rx="2" />
                  <path d="M8 7h8M8 11h5M8 15h8" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-white/60">Espace publicitaire</p>
                <p className="mt-1 text-xs text-white/30">
                  Google AdSense s&apos;affichera ici en production
                </p>
                <p className="mt-2 text-[10px] text-white/20">
                  Ajoute NEXT_PUBLIC_ADSENSE_ID dans .env.local
                </p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-white/5 px-4 py-2">
            <p className="text-center text-[10px] text-white/25">
              Publicité · Passe Premium pour jouer sans pub
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
