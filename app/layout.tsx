import { Montserrat, Inter, Geist_Mono } from "next/font/google"
import { Metadata } from "next"
import Script from "next/script"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";

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
  title: "FootQuest",
  description: "L'application ultime de mini-jeux de football.",
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