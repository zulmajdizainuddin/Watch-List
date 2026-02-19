export default function RatingBadge({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400/15 px-2.5 py-0.5 text-[11px] font-semibold text-yellow-200 ring-1 ring-yellow-400/40">
      <span className="text-xs">★</span>
      <span>{rating.toFixed(1)}/10</span>
    </span>
  );
}

