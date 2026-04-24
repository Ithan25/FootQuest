import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GameCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  href: string;
  gradient: string;
  shadowColor: string;
  hoverColor?: "green" | "magenta" | "yellow";
  disabled?: boolean;
}

const HOVER_STYLES = {
  green: "hover:border-[#00FF87]/60 hover:shadow-[0_0_20px_rgba(0,255,135,0.15)]",
  magenta: "hover:border-[#FF007F]/60 hover:shadow-[0_0_20px_rgba(255,0,127,0.15)]",
  yellow: "hover:border-[#FFE600]/60 hover:shadow-[0_0_20px_rgba(255,230,0,0.15)]",
};

const PLAY_BUTTON_STYLES = {
  green: "bg-[#00FF87]/20 text-[#00FF87]",
  magenta: "bg-[#FF007F]/20 text-[#FF007F]",
  yellow: "bg-[#FFE600]/20 text-[#FFE600]",
};

export function GameCard({
  title,
  description,
  icon,
  imageSrc,
  href,
  gradient,
  shadowColor,
  hoverColor = "green",
  disabled = false,
}: GameCardProps) {
  const content = (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 transition-all duration-300",
        !disabled && `hover:-translate-y-1.5 cursor-pointer ${HOVER_STYLES[hoverColor]}`,
        disabled && "opacity-40 cursor-not-allowed"
      )}
    >
      {/* Top gradient banner */}
      <div className={cn("relative h-28 overflow-hidden sm:h-32", gradient)}>
        {/* Animated circles in background */}
        <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-150" />
        <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-black/20" />

        {/* Icon centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn(
            "flex h-16 w-16 items-center justify-center rounded-lg bg-white/15 text-3xl shadow-lg backdrop-blur-sm transition-all duration-300 sm:h-18 sm:w-18 sm:text-4xl",
            !disabled && "group-hover:scale-110 group-hover:rotate-3 group-hover:bg-white/25"
          )}>
            {imageSrc ? (
              <Image src={imageSrc} alt={`${title} logo`} width={48} height={48} className="object-contain" />
            ) : (
              icon
            )}
          </div>
        </div>

        {/* Play button overlay */}
        {!disabled && (
          <div className={cn(
            "absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100",
            PLAY_BUTTON_STYLES[hoverColor]
          )}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <polygon points="5 3 19 12 5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="p-4">
        <h3 className="text-base font-extrabold tracking-tight text-white sm:text-lg">{title}</h3>
        <p className="mt-1 text-xs text-zinc-400 line-clamp-2 sm:text-sm">{description}</p>
      </div>
    </div>
  );

  if (disabled) return content;

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}
