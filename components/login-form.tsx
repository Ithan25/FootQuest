"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Trophy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    router.push("/hub");
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Card className="border-zinc-800 bg-zinc-900/80 shadow-2xl backdrop-blur-xl">
      <CardHeader className="space-y-2 text-center">
        {/* Logo */}
        <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-[#00FF87] to-emerald-500 shadow-lg shadow-[#00FF87]/25">
          <Trophy className="h-8 w-8 text-zinc-950 drop-shadow-md" />
        </div>
        <CardTitle className="text-2xl font-black tracking-tight text-white">
          Bienvenue sur FootQuest
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Connecte-toi pour jouer et grimper dans le classement
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Google OAuth */}
        <Button
          variant="outline"
          className="w-full gap-2 border-zinc-700 bg-zinc-800/50 text-zinc-200 transition-all hover:bg-zinc-800 hover:text-white"
          onClick={handleGoogleLogin}
          type="button"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continuer avec Google
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-700/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-zinc-900/80 px-2 text-zinc-500 backdrop-blur-xl">
              ou par email
            </span>
          </div>
        </div>

        {/* Email/Password form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email" className="text-zinc-300">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="ton@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-zinc-700 bg-zinc-800/50 text-white placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password" className="text-zinc-300">Mot de passe</Label>
            <Input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="border-zinc-700 bg-zinc-800/50 text-white placeholder:text-zinc-500"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#00FF87] font-bold text-zinc-950 shadow-lg shadow-[#00FF87]/25 transition-all hover:bg-[#00FF87]/90 hover:shadow-[#00FF87]/40 hover:shadow-xl"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-950/30 border-t-zinc-950" />
                Connexion...
              </span>
            ) : (
              "Se connecter"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col justify-center gap-4">
        <p className="text-sm text-zinc-400">
          Pas encore de compte ?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#00FF87] underline-offset-4 transition-colors hover:text-[#00FF87]/80 hover:underline"
          >
            Créer un compte
          </Link>
        </p>
        
        <div className="flex gap-4 text-xs text-zinc-500">
          <Link href="/cgu" className="hover:text-zinc-300 hover:underline">CGU</Link>
          <Link href="/politique-confidentialite" className="hover:text-zinc-300 hover:underline">Confidentialité</Link>
          <Link href="/mentions-legales" className="hover:text-zinc-300 hover:underline">Légal</Link>
        </div>
      </CardFooter>
    </Card>
  );
}
