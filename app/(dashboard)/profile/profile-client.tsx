"use client";

import { useRef, useState } from "react";
import { User, Star, Coins, Gamepad2, Medal, Trophy, Camera, Loader2, ClipboardList, Circle, LogOut, Crown, Sparkles } from "lucide-react";
import { uploadProfileImage, togglePremium } from "./actions";

export type ProfileData = {
  id: string;
  email: string;
  pseudo: string;
  footPoints: number;
  role: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  totalGames: number;
  totalPoints: number;
  bestScore: number;
  joinDate: string;
};

export function ProfileClient({ initialProfile }: { initialProfile: ProfileData }) {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [uploading, setUploading] = useState<"avatar" | "banner" | null>(null);
  const [toggling, setToggling] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File, type: "avatar" | "banner") => {
    // Next.js server actions have a 1MB limit by default.
    // Enforcing 1MB on client side with a clear error message.
    if (file.size > 1 * 1024 * 1024) {
      alert("L'image est trop volumineuse. La taille maximum autorisée est de 1 Mo.");
      return;
    }

    setUploading(type);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    const result = await uploadProfileImage(formData);

    if (result.url) {
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              ...(type === "avatar" ? { avatarUrl: result.url } : { bannerUrl: result.url }),
            }
          : prev
      );
    } else {
      alert(result.error || "Erreur lors de l'upload");
    }
    setUploading(null);
  };

  return (
    <div className="space-y-8">
      {/* Profile card with banner + avatar */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white shadow-sm dark:shadow-none dark:bg-white/[0.03]">
        {/* Banner */}
        <div
          className="group relative h-32 cursor-pointer overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 sm:h-40"
          onClick={() => bannerInputRef.current?.click()}
        >
          {profile.bannerUrl && (
            <img
              src={profile.bannerUrl}
              alt="Bannière"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          {/* Decorative circles fallback */}
          {!profile.bannerUrl && (
            <>
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
              <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-black/10" />
            </>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/40">
            <span className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              {uploading === "banner" ? <><Loader2 className="h-3 w-3 animate-spin" /> Upload...</> : <><Camera className="h-3 w-3" /> Changer la bannière</>}
            </span>
          </div>
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleUpload(file, "banner");
            }}
          />
        </div>

        {/* Avatar + info */}
        <div className="relative px-6 pb-6">
          <div className="-mt-12 flex items-end gap-4 sm:-mt-14">
            {/* Avatar */}
            <div
              className="group relative shrink-0 cursor-pointer"
              onClick={() => avatarInputRef.current?.click()}
            >
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-white dark:border-[#080c15] bg-gradient-to-br from-emerald-400 to-emerald-500 dark:from-emerald-500 dark:to-emerald-700 shadow-xl sm:h-28 sm:w-28">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-emerald-100" />
                )}
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl border-4 border-transparent bg-black/0 transition-all group-hover:bg-black/50">
                <span className="flex items-center text-xl opacity-0 transition-opacity group-hover:opacity-100 text-white">
                  {uploading === "avatar" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
                </span>
              </div>
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUpload(file, "avatar");
                }}
              />
            </div>

            {/* Name + role */}
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900 dark:text-white sm:text-2xl">
                  {profile.pseudo}
                </h1>
                {profile.role === "golden_ball" && (
                  <span className="flex items-center rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-2.5 py-0.5 text-[10px] font-bold text-black">
                    <Star className="mr-1 h-3 w-3 fill-current" /> PREMIUM
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-white/40">
                Membre depuis {profile.joinDate}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={<Coins className="h-6 w-6 text-amber-500 mx-auto" />} label="FootPoints" value={profile.footPoints.toLocaleString("fr-FR")} color="text-amber-400" />
        <StatCard icon={<Gamepad2 className="h-6 w-6 text-emerald-500 mx-auto" />} label="Parties jouées" value={String(profile.totalGames)} color="text-emerald-400" />
        <StatCard icon={<Medal className="h-6 w-6 text-purple-500 mx-auto" />} label="Points" value={profile.totalPoints.toLocaleString("fr-FR")} color="text-purple-400" />
        <StatCard icon={<Trophy className="h-6 w-6 text-blue-500 mx-auto" />} label="Best score" value={String(profile.bestScore)} color="text-blue-400" />
      </section>

      {/* Account info */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white"><ClipboardList className="h-5 w-5 text-indigo-500" /> Informations</h2>
        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white shadow-sm dark:shadow-none dark:bg-white/[0.03] divide-y divide-slate-100 dark:divide-white/[0.06]">
          <InfoRow label="Pseudo" value={profile.pseudo} />
          <InfoRow label="Email" value={profile.email} />
          <InfoRow label="Rôle" value={profile.role === "golden_ball" ? <><Star className="inline h-4 w-4 text-amber-500 mr-1" /> Golden Ball</> : <><Circle className="inline h-4 w-4 font-bold text-emerald-500 mr-1" /> Basic</>} />
          <InfoRow label="Membre depuis" value={profile.joinDate} />
        </div>
      </section>

      {/* Premium toggle */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <Crown className="h-5 w-5 text-amber-500" /> Premium
        </h2>
        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white shadow-sm dark:shadow-none dark:bg-white/[0.03] p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  {profile.role === "golden_ball" ? "Golden Ball" : "Compte Basic"}
                </span>
                {profile.role === "golden_ball" && (
                  <span className="flex items-center rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                    <Star className="mr-0.5 h-3 w-3 fill-current" /> ACTIF
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-white/40">
                {profile.role === "golden_ball"
                  ? "Tu profites de FootQuest sans publicité !"
                  : "Passe Premium pour jouer sans pub"}
              </p>
            </div>
            <button
              onClick={async () => {
                setToggling(true);
                const result = await togglePremium();
                if (!result.error) {
                  setProfile((prev) => ({ ...prev, role: result.role }));
                }
                setToggling(false);
              }}
              disabled={toggling}
              className={`shrink-0 rounded-xl px-5 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5 disabled:opacity-50 ${
                profile.role === "golden_ball"
                  ? "border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  : "bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-900 shadow-lg shadow-amber-500/25 hover:shadow-xl"
              }`}
            >
              {toggling ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : profile.role === "golden_ball" ? (
                "Désactiver"
              ) : (
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4" /> Activer Premium
                </span>
              )}
            </button>
          </div>

          {profile.role !== "golden_ball" && (
            <div className="mt-4 space-y-2 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 p-3">
              <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                <Star className="h-3.5 w-3.5" /> Zéro publicité
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                <Star className="h-3.5 w-3.5" /> Badge exclusif Golden Ball
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
                <Star className="h-3.5 w-3.5" /> Accès prioritaire aux nouveautés
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sign out */}
      <section>
        <form action="/auth/signout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-3 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20"
          >
            <LogOut className="h-4 w-4" /> Se déconnecter
          </button>
        </form>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/[0.06] bg-white shadow-sm dark:shadow-none dark:bg-white/[0.03] p-4 text-center">
      <div className="flex justify-center">{icon}</div>
      <div className={`mt-1.5 text-xl font-bold tabular-nums ${color.replace('text-', 'text-emerald-600 dark:text-')}`}>{value}</div>
      <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-white/30">
        {label}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <span className="text-sm text-slate-500 dark:text-white/40">{label}</span>
      <span className="text-sm font-semibold text-slate-900 dark:text-white/80">{value}</span>
    </div>
  );
}
