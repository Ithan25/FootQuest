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
      <div className="relative min-h-svh bg-[#0A0A0F] text-zinc-50">
        {/* Gaming background — subtle WC2026 gradients */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          {/* Purple glow — top-left */}
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#3B1F8E]/[0.06] blur-[120px]" />
          {/* Red glow — bottom-right */}
          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#E2001A]/[0.04] blur-[120px]" />
          
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
