"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  createContext,
  useContext
} from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "@lib/firebaseClient";
import { useAuth } from "@hooks/useAuth";
import type {
  WatchItem,
  WatchItemCreateInput,
  WatchStatus,
  WatchlistFilters
} from "@types/watchlist";

const COLLECTION = "watchlist";

interface UseWatchlistState {
  items: WatchItem[];
  loading: boolean;
  error?: string;
}

interface WatchlistContextValue extends UseWatchlistState {
  items: WatchItem[];
  rawItems: WatchItem[];
  filters: WatchlistFilters;
  setFilters: (partial: Partial<WatchlistFilters>) => void;
  addItem: (input: WatchItemCreateInput) => Promise<void>;
  updateItem: (
    id: string,
    input: Partial<WatchItemCreateInput>
  ) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  updateStatusQuick: (id: string, status: WatchStatus) => Promise<void>;
}

const WatchlistContext = createContext<WatchlistContextValue | undefined>(
  undefined
);

function fromFirestore(id: string, data: any): WatchItem {
  return {
    id,
    title: data.title,
    type: data.type,
    status: data.status,
    rating: data.rating ?? null,
    notes: data.notes ?? null,
    posterUrl: data.posterUrl ?? null,
    genres: data.genres ?? null,
    episodesTotal: data.episodesTotal ?? null,
    episodesWatched: data.episodesWatched ?? null,
    userId: data.userId,
    createdAt: data.createdAt?.toDate?.() ?? new Date(),
    updatedAt: data.updatedAt?.toDate?.() ?? new Date()
  };
}

function useWatchlistInternal(): WatchlistContextValue {
  const { user } = useAuth();
  const [state, setState] = useState<UseWatchlistState>({
    items: [],
    loading: true
  });
  const [filters, setFiltersInternal] = useState<WatchlistFilters>({
    sort: "recent"
  });

  useEffect(() => {
    if (!user) {
      setState({ items: [], loading: false });
      return;
    }

    const baseRef = collection(db, COLLECTION);
    const q = query(baseRef, where("userId", "==", user.uid));

    const unsub = onSnapshot(
      q,
      snapshot => {
        const items = snapshot.docs.map(d => fromFirestore(d.id, d.data()));
        setState({ items, loading: false });
      },
      err => {
        setState(prev => ({
          ...prev,
          loading: false,
          error: err.message ?? "Failed to load watchlist"
        }));
      }
    );

    return () => unsub();
  }, [user]);

  const setFilters = useCallback((partial: Partial<WatchlistFilters>) => {
    setFiltersInternal(prev => ({ ...prev, ...partial }));
  }, []);

  const filteredItems = useMemo(() => {
    let items = [...state.items];

    if (filters.search) {
      const term = filters.search.toLowerCase();
      items = items.filter(i => i.title.toLowerCase().includes(term));
    }

    if (filters.type && filters.type !== "all") {
      items = items.filter(i => i.type === filters.type);
    }

    if (filters.status && filters.status !== "all") {
      items = items.filter(i => i.status === filters.status);
    }

    if (filters.sort === "title_asc") {
      items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sort === "rating_desc") {
      items.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else {
      items.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    }

    return items;
  }, [state.items, filters]);

  const addItem = useCallback(
    async (input: WatchItemCreateInput) => {
      if (!user) throw new Error("Not authenticated");
      const ref = collection(db, COLLECTION);
      await addDoc(ref, {
        ...input,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    },
    [user]
  );

  const updateItem = useCallback(
    async (id: string, input: Partial<WatchItemCreateInput>) => {
      if (!user) throw new Error("Not authenticated");
      const ref = doc(db, COLLECTION, id);
      await updateDoc(ref, {
        ...input,
        updatedAt: serverTimestamp()
      });
    },
    [user]
  );

  const deleteItem = useCallback(
    async (id: string) => {
      if (!user) throw new Error("Not authenticated");
      const ref = doc(db, COLLECTION, id);
      await deleteDoc(ref);
    },
    [user]
  );

  const updateStatusQuick = useCallback(
    async (id: string, status: WatchStatus) => {
      await updateItem(id, { status });
    },
    [updateItem]
  );

  return {
    ...state,
    items: filteredItems,
    rawItems: state.items,
    filters,
    setFilters,
    addItem,
    updateItem,
    deleteItem,
    updateStatusQuick
  };
}

export function WatchlistProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const value = useWatchlistInternal();
  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) {
    throw new Error("useWatchlist must be used within WatchlistProvider");
  }
  return ctx;
}

