"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface UsePremiumReturn {
  isPremium: boolean;
  loading: boolean;
  refresh: () => void;
}

export function usePremium(): UsePremiumReturn {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPremiumStatus = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsPremium(false);
        return;
      }

      const { data } = await supabase
        .from("utilisateur")
        .select("role")
        .eq("id", user.id)
        .single();

      setIsPremium(data?.role === "golden_ball");
    } catch {
      setIsPremium(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPremiumStatus();
  }, [fetchPremiumStatus]);

  return { isPremium, loading, refresh: fetchPremiumStatus };
}
