import { BottomNav } from "@/components/layout/bottom-nav";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-svh bg-[#080c15]">
      {/* Gaming background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-transparent to-indigo-950/20" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <DashboardHeader />

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-8 sm:px-8">{children}</main>

      <BottomNav />
    </div>
  );
}
