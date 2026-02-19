"use client";

import { useState } from "react";
import Modal from "@components/ui/Modal";
import WatchForm from "@components/watchlist/WatchForm";

interface AddItemButtonProps {
  variant?: "navbar" | "hero";
}

export default function AddItemButton({ variant = "navbar" }: AddItemButtonProps) {
  const [open, setOpen] = useState(false);

  const baseClasses =
    "inline-flex items-center gap-2 rounded-md text-xs font-semibold transition";

  const styles =
    variant === "navbar"
      ? "bg-rose-600 px-3 py-2 text-white shadow-soft-lg hover:bg-rose-500"
      : "bg-white/15 px-4 py-2 text-white hover:bg-white/25";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${baseClasses} ${styles}`}
      >
        <span className="text-sm">+</span>
        <span>Add to Watchlist</span>
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Add new item">
        <WatchForm onSaved={() => setOpen(false)} />
      </Modal>
    </>
  );
}

