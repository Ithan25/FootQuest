export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B1F8E]/30 via-background to-[#E2001A]/10" />

        {/* Floating orbs */}
        <div className="absolute -left-32 -top-32 h-96 w-96 animate-pulse rounded-full bg-[#3B1F8E]/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 animate-pulse rounded-full bg-[#E2001A]/8 blur-3xl [animation-delay:2s]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#00A651]/5 blur-3xl [animation-delay:4s]" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="z-10 w-full max-w-md px-4">{children}</div>
    </div>
  );
}
