"use client";

import Modal from "./Modal";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  confirmVariant?: "default" | "danger";
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  confirmVariant = "default",
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  const confirmClasses =
    confirmVariant === "danger"
      ? "bg-rose-600 hover:bg-rose-500 text-white"
      : "bg-white text-slate-900 hover:bg-slate-100";

  return (
    <Modal open={open} onClose={onCancel} title={title}>
      {description && (
        <p className="mb-4 text-xs text-white/70">{description}</p>
      )}
      <div className="flex justify-end gap-2 text-xs">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-medium text-white/80 hover:bg-white/10"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => void onConfirm()}
          className={`rounded-full px-3 py-1 font-semibold ${confirmClasses}`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

