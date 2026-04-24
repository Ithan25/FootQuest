export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh bg-zinc-950 text-zinc-50">
      <div className="container mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-sm sm:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
