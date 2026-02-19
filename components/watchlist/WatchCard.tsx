"use client";

import { WatchItem } from "@types/watchlist";
import StatusPill from "@components/ui/StatusPill";
import RatingBadge from "@components/ui/RatingBadge";
import { useWatchlist } from "@hooks/useWatchlist";
import { useState } from "react";
import WatchForm from "./WatchForm";
import Modal from "@components/ui/Modal";
import ConfirmDialog from "@components/ui/ConfirmDialog";
import toast from "react-hot-toast";

export default function WatchCard({ item }: { item: WatchItem }) {
  const { updateStatusQuick, deleteItem } = useWatchlist();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleQuickStatus = async () => {
    const next =
      item.status === "plan_to_watch"
        ? "watching"
        : item.status === "watching"
        ? "completed"
        : "plan_to_watch";
    try {
      await updateStatusQuick(item.id, next);
      toast.success("Status updated");
    } catch (err: any) {
      toast.error(err.message ?? "Failed to update");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem(item.id);
      toast.success("Item deleted");
    } catch (err: any) {
      toast.error(err.message ?? "Failed to delete");
    } finally {
      setOpenDelete(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenEdit(true)}
        className="group relative flex w-[150px] md:w-[180px] flex-col overflow-hidden rounded-md bg-slate-900/80 text-left shadow-soft-lg ring-1 ring-black/60 transition-transform duration-200 hover:-translate-y-2 hover:scale-105 hover:bg-slate-900 hover:ring-rose-500/80"
      >
        <div className="relative h-[225px] md:h-[270px] w-full overflow-hidden bg-slate-800">
          {item.posterUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.posterUrl}
              alt={item.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900 text-xs text-white/70">
              No poster
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80" />
          <div className="absolute bottom-2 left-2 flex flex-col gap-1">
            <StatusPill status={item.status} />
            {item.rating != null && <RatingBadge rating={item.rating} />}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1 px-3 py-2">
          <p className="line-clamp-2 text-xs font-medium text-white">
            {item.title}
          </p>
          {item.genres && item.genres.length > 0 && (
            <p className="line-clamp-1 text-[10px] text-white/55">
              {item.genres.slice(0, 2).join(" • ")}
            </p>
          )}
          <div className="mt-1 flex items-center justify-between text-[10px] text-white/50">
            {item.episodesTotal && item.episodesWatched != null ? (
              <span>
                Ep {item.episodesWatched}/{item.episodesTotal}
              </span>
            ) : (
              <span className="capitalize">{item.type}</span>
            )}
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                void handleQuickStatus();
              }}
              className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-white/80 group-hover:bg-rose-500/80 group-hover:text-white"
            >
              Next status
            </button>
          </div>
        </div>
      </button>

      <Modal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        title="Edit item"
      >
        <WatchForm itemId={item.id} onSaved={() => setOpenEdit(false)} />
        <div className="mt-4 flex justify-between pt-3 text-xs text-white/60 border-t border-white/10">
          <button
            type="button"
            onClick={() => setOpenDelete(true)}
            className="rounded-full border border-rose-500/40 bg-rose-500/10 px-3 py-1 font-medium text-rose-100 hover:bg-rose-500/20"
          >
            Delete
          </button>
        </div>
      </Modal>

      <ConfirmDialog
        open={openDelete}
        title="Delete item?"
        description="This will permanently remove this title from your watchlist."
        confirmLabel="Delete"
        confirmVariant="danger"
        onCancel={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

