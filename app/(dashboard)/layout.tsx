import { BottomNav } from "@/components/layout/bottom-nav";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { PremiumProvider } from "@/components/premium-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PremiumProvider>
      <div className="relative min-h-svh bg-[#09090b] text-zinc-50">
        {/* Gaming background — subtle neon gradients */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          {/* Neon green glow — top-left */}
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00FF87]/[0.04] blur-[120px]" />
          {/* Magenta glow — bottom-right */}
          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#FF007F]/[0.03] blur-[120px]" />
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <DashboardHeader />

        <main className="mx-auto max-w-5xl px-6 pb-24 pt-8 sm:px-8">{children}</main>

        <BottomNav />
      </div>
    </PremiumProvider>
  );
}
