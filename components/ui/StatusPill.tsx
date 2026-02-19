import type { WatchStatus } from "@types/watchlist";

const statusStyles: Record<WatchStatus, string> = {
  plan_to_watch:
    "bg-sky-500/15 text-sky-200 border-sky-500/40",
  watching:
    "bg-amber-500/15 text-amber-200 border-amber-500/40",
  completed:
    "bg-emerald-500/15 text-emerald-200 border-emerald-500/40",
  dropped:
    "bg-slate-500/20 text-slate-200 border-slate-500/40"
};

const statusLabel: Record<WatchStatus, string> = {
  plan_to_watch: "Plan to Watch",
  watching: "Watching",
  completed: "Completed",
  dropped: "Dropped"
};

export default function StatusPill({ status }: { status: WatchStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusStyles[status]}`}
    >
      {statusLabel[status]}
    </span>
  );
}

