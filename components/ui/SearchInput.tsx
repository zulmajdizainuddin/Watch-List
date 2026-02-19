"use client";

import { useWatchlist } from "@hooks/useWatchlist";

export default function SearchInput() {
  const { filters, setFilters } = useWatchlist();

  return (
    <div className="relative">
      <input
        type="search"
        value={filters.search ?? ""}
        onChange={e => setFilters({ search: e.target.value })}
        placeholder="Search by title..."
        className="w-full rounded-full border border-white/10 bg-black/30 px-9 py-2 text-xs text-white placeholder:text-white/40 outline-none focus:border-rose-500/80 focus:bg-black/40"
      />
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-white/50">
        🔍
      </span>
    </div>
  );
}

