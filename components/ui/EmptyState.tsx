export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-950/40 px-4 py-8 text-center text-xs text-white/50">
      {message}
    </div>
  );
}

