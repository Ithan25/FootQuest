import { BottomNav } from "@/components/layout/bottom-nav";
import { DashboardHeader } from "@/components/layout/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-svh bg-background">
      {/* Subtle background texture */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-transparent to-transparent" />
      </div>

      <DashboardHeader />

      <main className="mx-auto max-w-3xl px-4 pb-24 pt-6 sm:px-8">{children}</main>

      <BottomNav />
    </div>
  );
}
