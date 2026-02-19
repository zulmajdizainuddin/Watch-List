"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@hooks/useAuth";
import SearchInput from "@components/ui/SearchInput";
import { useState } from "react";
import AddItemButton from "@components/watchlist/AddItemButton";

export default function AppNavbar() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-black bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <div className="flex items-center gap-2">
          <Link href="/watchlist" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-gradient-to-br from-rose-500 to-purple-600 shadow-soft-lg" />
            <span className="text-xl font-semibold tracking-tight">
              Watchlist
            </span>
          </Link>
          {pathname === "/watchlist" && (
            <nav className="ml-6 hidden items-center gap-4 text-xs font-medium text-white/70 md:flex">
              <button className="text-white">Home</button>
              <button className="hover:text-white">My List</button>
            </nav>
          )}
        </div>

        {pathname === "/watchlist" && (
          <div className="hidden flex-1 max-w-md md:block">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          {pathname === "/watchlist" && <AddItemButton variant="navbar" />}

          {pathname === "/watchlist" && (
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 hover:bg-white/10 md:hidden"
            >
              Filter
            </button>
          )}

          {user && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen(open => !open)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1 hover:bg-white/10"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-800 text-xs font-semibold">
                  {user.displayName?.charAt(0).toUpperCase() ??
                    user.email?.charAt(0).toUpperCase() ??
                    "U"}
                </div>
                <span className="hidden text-xs text-white/70 sm:inline">
                  {user.displayName ?? user.email}
                </span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-xl border border-white/10 bg-slate-900/95 p-1 text-sm shadow-soft-lg">
                  <button
                    type="button"
                    onClick={signOut}
                    className="w-full rounded-lg px-3 py-2 text-left text-white/80 hover:bg-white/10"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {pathname === "/watchlist" && (
        <div className="block border-t border-white/5 px-4 pb-3 pt-2 md:hidden">
          <SearchInput />
        </div>
      )}
    </header>
  );
}

