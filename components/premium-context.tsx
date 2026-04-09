"use client";

import { createContext, useContext, ReactNode } from "react";
import { usePremium } from "@/hooks/use-premium";

interface PremiumContextValue {
  isPremium: boolean;
  loading: boolean;
  refresh: () => void;
}

const PremiumContext = createContext<PremiumContextValue>({
  isPremium: false,
  loading: true,
  refresh: () => {},
});

export function PremiumProvider({ children }: { children: ReactNode }) {
  const premium = usePremium();

  return (
    <PremiumContext.Provider value={premium}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremiumContext() {
  return useContext(PremiumContext);
}
