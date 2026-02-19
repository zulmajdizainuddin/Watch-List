"use client";

import { useMemo } from "react";
import { useWatchlist } from "@hooks/useWatchlist";
import type { WatchStatus, WatchType } from "@appTypes/watchlist";
import WatchCard from "./WatchCard";

interface WatchRowProps {
  title: string;
  filter?: { status?: WatchStatus; type?: WatchType };
  sort?: "rating_desc" | "recent";
  limit?: number;
}

export default function WatchRow({ title, filter, sort, limit }: WatchRowProps) {
  const { items } = useWatchlist();

  const rowItems = useMemo(() => {
    let list = [...items];

    if (filter?.status) {
      list = list.filter(i => i.status === filter.status);
    }

    if (filter?.type) {
      list = list.filter(i => i.type === filter.type);
    }

    if (sort === "rating_desc") {
      list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      list = list.filter(i => i.rating != null);
    } else if (sort === "recent") {
      list.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    }

    if (typeof limit === "number") {
      list = list.slice(0, limit);
    }
    return list;
  }, [items, filter, sort, limit]);

  if (!rowItems.length) {
    return null;
  }

  return (
    <section className="space-y-2 fade-in-up">
      <div className="flex items-center justify-between pr-3 md:pr-0">
        <h2 className="text-base md:text-lg font-semibold text-white">
          {title}
        </h2>
        <span className="text-[11px] text-white/40">
          {rowItems.length} item{rowItems.length !== 1 ? "s" : ""}
        </span>
      </div>
      <div className="scrollbar-hide overflow-x-auto pb-3">
        <div className="flex gap-3 pl-1 pr-6">
          {rowItems.map(item => (
            <WatchCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

