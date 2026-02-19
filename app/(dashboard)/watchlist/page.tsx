"use client";

import HeroFeatured from "@components/watchlist/HeroFeatured";
import WatchRow from "@components/watchlist/WatchRow";
import FilterBar from "@components/ui/FilterBar";

export default function WatchlistPage() {
  return (
    <div className="space-y-8">
      <HeroFeatured />
      <FilterBar />
      <div className="space-y-6">
        <WatchRow title="Continue Watching" filter={{ status: "watching" }} />
        <WatchRow title="Plan to Watch" filter={{ status: "plan_to_watch" }} />
        <WatchRow title="Completed" filter={{ status: "completed" }} />
        <WatchRow title="Top Rated" sort="rating_desc" />
      </div>
    </div>
  );
}

