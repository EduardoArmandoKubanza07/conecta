import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favoriteEventIds: string[];
  addFavorite: (eventId: string) => void;
  removeFavorite: (eventId: string) => void;
  isFavorite: (eventId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteEventIds: [],

      addFavorite: (eventId: string) =>
        set((state) => ({
          favoriteEventIds: [...state.favoriteEventIds, eventId],
        })),

      removeFavorite: (eventId: string) =>
        set((state) => ({
          favoriteEventIds: state.favoriteEventIds.filter((id) => id !== eventId),
        })),

      isFavorite: (eventId: string) => get().favoriteEventIds.includes(eventId),
    }),
    {
      name: "favorites-storage", // unique name for localStorage key
    },
  ),
);
