"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, title, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-50 w-full max-w-md rounded-2xl bg-slate-950/95 p-5 shadow-soft-lg ring-1 ring-white/10">
        {title && (
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/5 px-2 py-1 text-xs text-white/60 hover:bg-white/10"
            >
              ✕
            </button>
          </div>
        )}
        <div className="text-sm text-white/90">{children}</div>
      </div>
    </div>,
    document.body
  );
}

