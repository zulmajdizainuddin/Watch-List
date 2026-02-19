export type WatchType = "anime" | "movie" | "series";

export type WatchStatus =
  | "plan_to_watch"
  | "watching"
  | "completed"
  | "dropped";

export interface WatchItemBase {
  title: string;
  type: WatchType;
  status: WatchStatus;
  rating?: number | null;
  notes?: string | null;
  posterUrl?: string | null;
  genres?: string[] | null;
  episodesTotal?: number | null;
  episodesWatched?: number | null;
}

export interface WatchItem extends WatchItemBase {
  id: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WatchItemCreateInput extends WatchItemBase {}

export type SortOption = "recent" | "title_asc" | "rating_desc";

export interface WatchlistFilters {
  search?: string;
  type?: WatchType | "all";
  status?: WatchStatus | "all";
  sort?: SortOption;
}

