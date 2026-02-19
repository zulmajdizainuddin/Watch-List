import AppNavbar from "@components/layout/AppNavbar";
import AuthGuard from "@components/layout/AuthGuard";
import { WatchlistProvider } from "@hooks/useWatchlist";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <WatchlistProvider>
        <div className="min-h-screen flex flex-col bg-[#05010b]">
          <AppNavbar />
          <main className="flex-1 px-3 md:px-8 pb-12 pt-4 max-w-7xl mx-auto w-full space-y-8">
            {children}
          </main>
        </div>
      </WatchlistProvider>
    </AuthGuard>
  );
}

