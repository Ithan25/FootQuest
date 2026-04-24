"use client";

import { useRef, useState } from "react";
import { User, Star, Coins, Gamepad2, Medal, Trophy, Camera, Loader2, ClipboardList, Circle, LogOut, Crown, Sparkles, Pencil, Check, X } from "lucide-react";
import { uploadProfileImage, togglePremium, updatePseudo } from "./actions";

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
  const [isEditingPseudo, setIsEditingPseudo] = useState(false);
  const [pseudoInput, setPseudoInput] = useState(initialProfile.pseudo);
  const [updatingPseudo, setUpdatingPseudo] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleUpdatePseudo = async () => {
    if (pseudoInput === profile.pseudo) {
      setIsEditingPseudo(false);
      return;
    }
    setUpdatingPseudo(true);
    const result = await updatePseudo(pseudoInput);
    if (result.error) {
      alert(result.error);
    } else {
      setProfile((prev) => ({ ...prev, pseudo: result.pseudo }));
      setIsEditingPseudo(false);
    }
    setUpdatingPseudo(false);
  };

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
      <section className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
        {/* Banner */}
        <div
          className="group relative h-32 cursor-pointer overflow-hidden bg-gradient-to-r from-[#00FF87] via-emerald-600 to-teal-600 sm:h-40"
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
              <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-black/20" />
            </>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/40">
            <span className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
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
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg border-4 border-[#09090b] bg-gradient-to-br from-[#00FF87] to-emerald-600 shadow-xl sm:h-28 sm:w-28">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-12 w-12 text-zinc-950" />
                )}
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center rounded-lg border-4 border-transparent bg-black/0 transition-all group-hover:bg-black/50">
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
                <h1 className="text-xl font-black text-white sm:text-2xl">
                  {profile.pseudo}
                </h1>
                {profile.role === "golden_ball" && (
                  <span className="flex items-center rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-2.5 py-0.5 text-[10px] font-bold text-black ml-2">
                    <Star className="mr-1 h-3 w-3 fill-current" /> PREMIUM
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-500">
                Membre depuis {profile.joinDate}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={<Coins className="h-6 w-6 text-[#FFE600] mx-auto" />} label="FootPoints" value={profile.footPoints.toLocaleString("fr-FR")} color="text-[#FFE600]" />
        <StatCard icon={<Gamepad2 className="h-6 w-6 text-[#00FF87] mx-auto" />} label="Parties jouées" value={String(profile.totalGames)} color="text-[#00FF87]" />
        <StatCard icon={<Medal className="h-6 w-6 text-[#FF007F] mx-auto" />} label="Points" value={profile.totalPoints.toLocaleString("fr-FR")} color="text-[#FF007F]" />
        <StatCard icon={<Trophy className="h-6 w-6 text-sky-400 mx-auto" />} label="Best score" value={String(profile.bestScore)} color="text-sky-400" />
      </section>

      {/* Account info */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-white"><ClipboardList className="h-5 w-5 text-[#FF007F]" /> Informations</h2>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 divide-y divide-zinc-800">
          <InfoRow 
            label="Pseudo" 
            value={
              isEditingPseudo ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    className="rounded-md border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#00FF87] w-32"
                    value={pseudoInput}
                    onChange={(e) => setPseudoInput(e.target.value)}
                    disabled={updatingPseudo}
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handleUpdatePseudo()}
                  />
                  <button
                    onClick={handleUpdatePseudo}
                    disabled={updatingPseudo}
                    className="rounded-md bg-[#00FF87] p-1 text-zinc-950 hover:bg-[#00FF87]/80 disabled:opacity-50"
                  >
                    {updatingPseudo ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3" />}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingPseudo(false);
                      setPseudoInput(profile.pseudo);
                    }}
                    disabled={updatingPseudo}
                    className="rounded-md bg-zinc-800 p-1 text-zinc-400 hover:bg-zinc-700 disabled:opacity-50"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <span className="group flex items-center gap-2 cursor-pointer" onClick={() => setIsEditingPseudo(true)}>
                  {profile.pseudo}
                  <button
                    className="text-zinc-500 transition-colors hover:text-[#00FF87]"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                </span>
              )
            } 
          />
          <InfoRow label="Email" value={profile.email} />
          <InfoRow label="Rôle" value={profile.role === "golden_ball" ? <><Star className="inline h-4 w-4 text-amber-500 mr-1" /> Golden Ball</> : <><Circle className="inline h-4 w-4 font-bold text-[#00FF87] mr-1" /> Basic</>} />
          <InfoRow label="Membre depuis" value={profile.joinDate} />
        </div>
      </section>

      {/* Premium toggle */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-lg font-bold text-white">
          <Crown className="h-5 w-5 text-amber-500" /> Premium
        </h2>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">
                  {profile.role === "golden_ball" ? "Golden Ball" : "Compte Basic"}
                </span>
                {profile.role === "golden_ball" && (
                  <span className="flex items-center rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                    <Star className="mr-0.5 h-3 w-3 fill-current" /> ACTIF
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-zinc-500">
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
              className={`shrink-0 rounded-lg px-5 py-2.5 text-sm font-bold transition-all hover:-translate-y-0.5 disabled:opacity-50 ${
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
            <div className="mt-4 space-y-2 rounded-lg bg-[#FFE600]/5 p-3">
              <div className="flex items-center gap-2 text-xs text-[#FFE600]">
                <Star className="h-3.5 w-3.5" /> Zéro publicité
              </div>
              <div className="flex items-center gap-2 text-xs text-[#FFE600]">
                <Star className="h-3.5 w-3.5" /> Badge exclusif Golden Ball
              </div>
              <div className="flex items-center gap-2 text-xs text-[#FFE600]">
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
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-6 py-3 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20"
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
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-center">
      <div className="flex justify-center">{icon}</div>
      <div className={`mt-1.5 text-xl font-bold tabular-nums ${color}`}>{value}</div>
      <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <span className="text-sm text-zinc-500">{label}</span>
      <span className="text-sm font-semibold text-zinc-200">{value}</span>
    </div>
  );
}
