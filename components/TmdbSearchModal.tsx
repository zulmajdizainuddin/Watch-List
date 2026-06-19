'use client';

import { useState } from "react";
import { useAuth } from "@hooks/useAuth";

interface TmdbItem {
  id: number;
  media_type: string;
  title?: string;
  name?: string;
  poster_path?: string | null;
}

interface Props {
  onSelect: (item: TmdbItem) => void;
  onClose: () => void;
}

export default function TmdbSearchModal({ onSelect, onClose }: Props) {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TmdbItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async () => {
    if (!query.trim()) return;
    if (!user) {
      setError("You must be signed in to search.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = await user.getIdToken();
      const res = await fetch(`/api/tmdb/search?q=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        setError("Search failed. Please try again.");
        return;
      }
      const data = await res.json();
      setResults(data.results ?? []);
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-start p-10">
      <div className="bg-zinc-900 p-6 w-full max-w-3xl rounded-xl">
        <div className="flex gap-2">
          <input
            className="flex-1 bg-zinc-800 p-2 rounded"
            placeholder="Search movie or anime..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
          />
          <button
            onClick={search}
            disabled={loading}
            className="bg-red-600 px-4 rounded disabled:opacity-50"
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-400">{error}</p>
        )}

        <div className="grid grid-cols-3 gap-4 mt-6">
          {results.map((item) => (
            <div
              key={`${item.media_type}-${item.id}`}
              className="cursor-pointer hover:scale-105 transition"
              onClick={() => onSelect(item)}
            >
              {item.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.title ?? item.name ?? "poster"}
                  className="rounded-lg"
                />
              )}
              <p className="text-sm mt-2">
                {item.title ?? item.name}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-red-500 underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}
