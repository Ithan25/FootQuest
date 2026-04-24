"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export function AdSenseScript() {
  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    // Check if user has accepted cookies
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "accepted") {
      setConsentGranted(true);
    }
  }, []);

  if (!consentGranted) return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9874141990888959"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
