"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface AdInterstitialProps {
  onClose: () => void;
}

const AD_DURATION = 5; // seconds before user can skip

export function AdInterstitial({ onClose }: AdInterstitialProps) {
  const [countdown, setCountdown] = useState(AD_DURATION);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCanSkip(true);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Ad container */}
      <div className="relative z-10 mx-4 w-full max-w-sm animate-in fade-in zoom-in-95 duration-500">
        {/* Header : "Publicité" label + Close / Skip Button */}
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded bg-black/40 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50 backdrop-blur-sm">
            Publicité
          </span>
          {canSkip ? (
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/25"
            >
              Passer <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-white/60">
                Passer dans {countdown}s
              </span>
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
                title="Fermer la publicité"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Ad content — static image */}
        <div className="overflow-hidden rounded-lg border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-2xl">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/pub.png"
              alt="Publicité"
              fill
              className="object-cover"
              priority
            />
          </div>

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
