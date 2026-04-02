"use client";

import { useRef, useState } from "react";
import { uploadProfileImage } from "./actions";

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
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File, type: "avatar" | "banner") => {
    // Next.js server actions have a 1MB limit by default.
    // Enforcing 1MB on client side with a clear error message.
    if (file.size > 1 * 1024 * 1024) {
      alert("📸 L'image est trop volumineuse. La taille maximum autorisée est de 1 Mo.");
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
      <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03]">
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
            <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              {uploading === "banner" ? "⏳ Upload..." : "📷 Changer la bannière"}
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
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-[#080c15] bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-xl sm:h-28 sm:w-28">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">⚽</span>
                )}
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl border-4 border-transparent bg-black/0 transition-all group-hover:bg-black/50">
                <span className="text-xl opacity-0 transition-opacity group-hover:opacity-100">
                  {uploading === "avatar" ? "⏳" : "📷"}
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
                  <span className="rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-2.5 py-0.5 text-[10px] font-bold text-black">
                    ⭐ PREMIUM
                  </span>
                )}
              </div>
              <p className="text-sm text-white/40">
                Membre depuis {profile.joinDate}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon="💰" label="FootPoints" value={profile.footPoints.toLocaleString("fr-FR")} color="text-amber-400" />
        <StatCard icon="🎮" label="Parties jouées" value={String(profile.totalGames)} color="text-emerald-400" />
        <StatCard icon="🏅" label="Points gagnés" value={profile.totalPoints.toLocaleString("fr-FR")} color="text-purple-400" />
        <StatCard icon="⭐" label="Meilleur score" value={String(profile.bestScore)} color="text-blue-400" />
      </section>

      {/* Account info */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white">📋 Informations</h2>
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] divide-y divide-white/[0.06]">
          <InfoRow label="Pseudo" value={profile.pseudo} />
          <InfoRow label="Email" value={profile.email} />
          <InfoRow label="Rôle" value={profile.role === "golden_ball" ? "⭐ Golden Ball" : "🟢 Basic"} />
          <InfoRow label="Membre depuis" value={profile.joinDate} />
        </div>
      </section>

      {/* Sign out */}
      <section>
        <form action="/auth/signout" method="POST">
          <button
            type="submit"
            className="w-full rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-3 text-sm font-semibold text-red-400 transition-all hover:bg-red-500/20"
          >
            🚪 Se déconnecter
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
  icon: string;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 text-center">
      <div className="text-xl">{icon}</div>
      <div className={`mt-1.5 text-xl font-bold tabular-nums ${color}`}>{value}</div>
      <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-white/30">
        {label}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <span className="text-sm text-white/40">{label}</span>
      <span className="text-sm font-semibold text-white/80">{value}</span>
    </div>
  );
}
