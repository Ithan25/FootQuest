import { Geist, Geist_Mono, Roboto } from "next/font/google"
import { Metadata } from "next"
import Script from "next/script"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

const roboto = Roboto({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "FootQuest",
  description: "L'application ultime de mini-jeux de football.",
  icons: {
    icon: "/images/Logo.svg",
    apple: "/images/icon-pwa.svg",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FootQuest",
  },
  // C'est ici que l'on ajoute la balise meta pour AdSense :
  other: {
    "google-adsense-account": "ca-pub-9874141990888959",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr" // Je me suis permis de passer la langue en "fr" puisque votre description est en français
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", roboto.variable)}
    >
      <head>
        {/* On place le script AdSense en dur ici */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9874141990888959"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}