import { Montserrat, Inter, Geist_Mono } from "next/font/google"
import { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { CookieConsent } from "@/components/cookie-consent";
import { AdSenseScript } from "@/components/adsense-script";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['700', '800', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "FootQuest — Mini-jeux de Football | Coupe du Monde 2026",
    template: "%s | FootQuest",
  },
  description: "Plateforme gratuite de mini-jeux de football : Scout Master, The Missing Piece et Foot Trivia. Teste tes connaissances sur les 48 sélections de la Coupe du Monde 2026 !",
  icons: {
    icon: "/images/icon-192.png",
    shortcut: "/favicon.ico",
    apple: "/images/apple-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FootQuest",
  },
  metadataBase: new URL("https://footquest.fr"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "FootQuest",
  },
  robots: {
    index: true,
    follow: true,
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
      lang="fr"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, inter.variable, montserrat.variable, "font-sans")}
    >
      <body>
        <ThemeProvider>
          {children}
          <CookieConsent />
          <AdSenseScript />
        </ThemeProvider>
      </body>
    </html>
  )
}