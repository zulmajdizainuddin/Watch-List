"use client";

import { FormEvent, useMemo, useState } from "react";
import { useWatchlist } from "@hooks/useWatchlist";
import type { WatchItem, WatchItemCreateInput, WatchStatus, WatchType } from "@types/watchlist";
import toast from "react-hot-toast";

const TYPE_OPTIONS: { value: WatchType; label: string }[] = [
  { value: "anime", label: "Anime" },
  { value: "movie", label: "Movie" },
  { value: "series", label: "Series" }
];

const STATUS_OPTIONS: { value: WatchStatus; label: string }[] = [
  { value: "plan_to_watch", label: "Plan to Watch" },
  { value: "watching", label: "Watching" },
  { value: "completed", label: "Completed" },
  { value: "dropped", label: "Dropped" }
];

interface WatchFormProps {
  itemId?: string;
  onSaved?: () => void;
}

export default function WatchForm({ itemId, onSaved }: WatchFormProps) {
  const { rawItems, addItem, updateItem } = useWatchlist();
  const existing = useMemo<WatchItem | undefined>(
    () => rawItems.find(i => i.id === itemId),
    [rawItems, itemId]
  );

  const [title, setTitle] = useState(existing?.title ?? "");
  const [type, setType] = useState<WatchType>(existing?.type ?? "anime");
  const [status, setStatus] = useState<WatchStatus>(
    existing?.status ?? "plan_to_watch"
  );
  const [posterUrl, setPosterUrl] = useState(existing?.posterUrl ?? "");
  const [genres, setGenres] = useState(
    existing?.genres?.join(", ") ?? ""
  );
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    const payload: WatchItemCreateInput = {
      title: title.trim(),
      type,
      status,
      posterUrl: posterUrl.trim() || null,
      genres: genres
        ? genres
            .split(",")
            .map(g => g.trim())
            .filter(Boolean)
        : null
    };

    try {
      setSubmitting(true);
      if (existing) {
        await updateItem(existing.id, payload);
        toast.success("Item updated");
      } else {
        await addItem(payload);
        toast.success("Item added to watchlist");
        setTitle("");
      }
      onSaved?.();
    } catch (err: any) {
      toast.error(err.message ?? "Failed to save item");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-xs">
      <div>
        <label className="mb-1 block text-[11px] font-medium text-white/75">
          Title
        </label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white outline-none placeholder:text-white/40 focus:border-rose-500/70"
          placeholder="Attack on Titan"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="mb-1 block text-[11px] font-medium text-white/75">
            Type
          </label>
          <select
            value={type}
            onChange={e => setType(e.target.value as WatchType)}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:border-rose-500/70"
          >
            {TYPE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-[11px] font-medium text-white/75">
            Status
          </label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value as WatchStatus)}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white outline-none focus:border-rose-500/70"
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="mb-1 block text-[11px] font-medium text-white/75">
            Poster URL
          </label>
          <input
            value={posterUrl}
            onChange={e => setPosterUrl(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white outline-none placeholder:text-white/40 focus:border-rose-500/70"
            placeholder="https://..."
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-[11px] font-medium text-white/75">
          Genres (comma separated)
        </label>
        <input
          value={genres}
          onChange={e => setGenres(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-white outline-none placeholder:text-white/40 focus:border-rose-500/70"
          placeholder="Action, Fantasy, Drama"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 px-4 py-2.5 text-xs font-semibold text-white shadow-soft-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {existing ? "Save changes" : "Add to watchlist"}
      </button>
    </form>
  );
}

