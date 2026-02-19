"use client";

import { useWatchlist } from "@hooks/useWatchlist";
import type { WatchStatus, WatchType, SortOption } from "@types/watchlist";

const typeOptions: { value: WatchType | "all"; label: string }[] = [
  { value: "all", label: "All types" },
  { value: "anime", label: "Anime" },
  { value: "movie", label: "Movies" },
  { value: "series", label: "Series" }
];

const statusOptions: { value: WatchStatus | "all"; label: string }[] = [
  { value: "all", label: "All status" },
  { value: "plan_to_watch", label: "Plan to Watch" },
  { value: "watching", label: "Watching" },
  { value: "completed", label: "Completed" },
  { value: "dropped", label: "Dropped" }
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "recent", label: "Recently added" },
  { value: "title_asc", label: "Title A–Z" },
  { value: "rating_desc", label: "Rating high–low" }
];

export default function FilterBar() {
  const { filters, setFilters } = useWatchlist();

  return (
    <div className="glass-surface flex flex-wrap items-center gap-3 rounded-2xl px-3 py-2.5 text-xs">
      <div className="flex gap-2">
        <select
          value={filters.type ?? "all"}
          onChange={e =>
            setFilters({ type: e.target.value as WatchType | "all" })
          }
          className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white outline-none focus:border-rose-500/70"
        >
          {typeOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={filters.status ?? "all"}
          onChange={e =>
            setFilters({ status: e.target.value as WatchStatus | "all" })
          }
          className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white outline-none focus:border-rose-500/70"
        >
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="ml-auto">
        <select
          value={filters.sort ?? "recent"}
          onChange={e => setFilters({ sort: e.target.value as SortOption })}
          className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white outline-none focus:border-rose-500/70"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

