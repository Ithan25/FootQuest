import Link from "next/link";
import { cn } from "@/lib/utils";

interface GameCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  gradient: string;
  shadowColor: string;
  disabled?: boolean;
}

export function GameCard({
  title,
  description,
  icon,
  href,
  gradient,
  shadowColor,
  disabled = false,
}: GameCardProps) {
  const content = (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/40 bg-card/60 p-5 backdrop-blur-sm transition-all duration-300",
        !disabled && "hover:-translate-y-1 hover:shadow-xl cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* Background gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 opacity-[0.06] transition-opacity duration-300",
          !disabled && "group-hover:opacity-[0.12]",
          gradient
        )}
      />

      {/* Content */}
      <div className="relative flex items-center gap-4">
        {/* Icon */}
        <div
          className={cn(
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-lg transition-transform duration-300",
            gradient,
            shadowColor,
            !disabled && "group-hover:scale-110"
          )}
        >
          <span className="text-2xl">{icon}</span>
        </div>

        {/* Text */}
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold tracking-tight">{title}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        {/* Arrow */}
        {!disabled && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        )}
      </div>
    </div>
  );

  if (disabled) {
    return content;
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}
