"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/guide/comment-jouer", label: "Comment jouer" },
  { href: "/guide/systeme-de-points", label: "Points & Récompenses" },
  { href: "/blog/coupe-du-monde-2026", label: "CDM 2026" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-[#09090b]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center transition-transform group-hover:scale-105 sm:h-10 sm:w-10">
            <Image src="/images/Logo.svg" alt="FootQuest Logo" width={40} height={40} className="drop-shadow-md" />
          </div>
          <span className="text-lg font-black tracking-tight text-white sm:text-xl">
            Foot<span className="bg-gradient-to-r from-[#00FF87] to-emerald-300 bg-clip-text text-transparent">Quest</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-[#00FF87]"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg bg-[#00FF87] px-4 py-2 text-sm font-bold text-zinc-950 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(0,255,135,0.4)]"
          >
            Jouer
          </Link>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-zinc-800 bg-[#09090b] px-4 pb-4 pt-2 lg:hidden animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-[#00FF87] bg-[#00FF87]/5"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
