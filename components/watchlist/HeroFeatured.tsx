"use client";

import { useMemo } from "react";
import { useWatchlist } from "@hooks/useWatchlist";
import StatusPill from "@components/ui/StatusPill";
import RatingBadge from "@components/ui/RatingBadge";
import WatchForm from "@components/watchlist/WatchForm";
import Modal from "@components/ui/Modal";
import { useState } from "react";
import ConfirmDialog from "@components/ui/ConfirmDialog";
import toast from "react-hot-toast";
import AddItemButton from "@components/watchlist/AddItemButton";

export default function HeroFeatured() {
  const { rawItems, updateStatusQuick, deleteItem } = useWatchlist();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const featured = useMemo(() => {
    if (!rawItems.length) return null;

    // Sort newest first based on createdAt so the latest
    // item you added is considered first.
    const sorted = [...rawItems].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );

    // Prefer something you're actively watching,
    // then newest "plan to watch", otherwise just newest item.
    const watching = sorted.find(i => i.status === "watching");
    if (watching) return watching;

    const planToWatch = sorted.find(i => i.status === "plan_to_watch");
    if (planToWatch) return planToWatch;

    if (sorted.length) return sorted[0];
    return null;
  }, [rawItems]);

  if (!featured) {
    return (
      <div className="glass-surface flex flex-col items-center justify-center rounded-3xl px-6 py-10 text-center fade-in-up">
        <h2 className="text-xl font-semibold tracking-tight">
          Start your personal watchlist
        </h2>
        <p className="mt-2 max-w-md text-sm text-white/60">
          Add anime, movies, or series you plan to watch. Your progress and
          ratings stay private to you.
        </p>
        <div className="mt-5">
          <AddItemButton variant="hero" />
        </div>
      </div>
    );
  }

  const handleQuickStatus = async (status: typeof featured.status) => {
    try {
      await updateStatusQuick(featured.id, status);
      toast.success("Status updated");
    } catch (err: any) {
      toast.error(err.message ?? "Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await deleteItem(confirmDeleteId);
      toast.success("Item deleted");
    } catch (err: any) {
      toast.error(err.message ?? "Failed to delete item");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const progress =
    featured.episodesTotal && featured.episodesWatched
      ? Math.min(
          100,
          Math.round(
            (featured.episodesWatched / featured.episodesTotal) * 100
          )
        )
      : null;

  return (
    <>
      <section className="relative overflow-hidden rounded-none md:rounded-3xl border border-black/70 bg-gradient-to-br from-black via-slate-950 to-black shadow-soft-lg fade-in-up">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(244,63,94,0.35),_transparent_60%),radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.18),_transparent_60%)]" />
        <div className="relative flex min-h-[260px] flex-col gap-6 px-6 py-7 md:min-h-[340px] md:flex-row-reverse md:px-10 md:py-9">
          <div className="flex-1 space-y-4 md:pr-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
              <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rose-200">
                Featured
              </span>
              <span className="text-xs text-white/60">
                {featured.type.toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-4xl md:leading-tight">
              {featured.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/70">
              <StatusPill status={featured.status} />
              {featured.rating != null && (
                <RatingBadge rating={featured.rating} />
              )}
              {featured.genres && featured.genres.length > 0 && (
                <span className="truncate text-white/60">
                  {featured.genres.slice(0, 3).join(" • ")}
                  {featured.genres.length > 3 ? " +" : ""}
                </span>
              )}
            </div>

            {featured.notes && (
              <p className="max-w-xl text-sm text-white/70">
                {featured.notes}
              </p>
            )}

            {progress != null && (
              <div className="mt-1 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-white/60">
                  <span>
                    Episodes {featured.episodesWatched}/{featured.episodesTotal}
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 to-purple-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-3 text-xs">
              <button
                type="button"
                onClick={() => handleQuickStatus("watching")}
                className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-xs font-semibold text-black shadow-soft-lg hover:bg-slate-100"
              >
                <span className="text-sm">▶</span>
                Continue watching
              </button>
              <button
                type="button"
                onClick={() => handleQuickStatus("completed")}
                className="inline-flex items-center gap-2 rounded-md bg-white/15 px-4 py-2 text-xs font-semibold text-white hover:bg-white/25"
              >
                Mark as Completed
              </button>
              <button
                type="button"
                onClick={() => handleQuickStatus("dropped")}
                className="inline-flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-xs font-medium text-white/80 hover:bg-white/10"
              >
                Drop
              </button>
              <button
                type="button"
                onClick={() => setEditingId(featured.id)}
                className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-xs font-medium text-white hover:bg-white/20"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setConfirmDeleteId(featured.id)}
                className="inline-flex items-center gap-2 rounded-md bg-rose-600/80 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-500"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="flex w-full justify-center md:w-72 md:justify-end">
            <div className="relative h-44 w-32 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/70 md:h-64 md:w-44">
              {featured.posterUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.posterUrl}
                  alt={featured.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-rose-500/40 to-purple-600/40 text-xs text-white/80">
                  No Poster
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Modal
        open={editingId != null}
        onClose={() => setEditingId(null)}
        title="Edit item"
      >
        {editingId && (
          <WatchForm itemId={editingId} onSaved={() => setEditingId(null)} />
        )}
      </Modal>

      <ConfirmDialog
        open={confirmDeleteId != null}
        title="Delete item?"
        description="This will permanently remove this item from your watchlist."
        confirmLabel="Delete"
        confirmVariant="danger"
        onCancel={() => setConfirmDeleteId(null)}
        onConfirm={handleDelete}
      />
    </>
  );
}

