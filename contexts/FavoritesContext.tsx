"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface FavoritesContextType {
  favorites: string[];
  isSidebarOpen: boolean;
  justAddedId: string | null;
  toggleFavorite: (activityId: string) => void;
  removeFavorite: (activityId: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const toggleFavorite = (activityId: string) => {
    setFavorites((prev) => {
      if (prev.includes(activityId)) {
        // Remove from favorites
        return prev.filter((id) => id !== activityId);
      } else {
        // Add to favorites and trigger glow animation
        setJustAddedId(activityId);
        setTimeout(() => setJustAddedId(null), 1000);
        return [...prev, activityId];
      }
    });
  };

  const removeFavorite = (activityId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== activityId));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const setSidebarOpen = (open: boolean) => {
    setIsSidebarOpen(open);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isSidebarOpen,
        justAddedId,
        toggleFavorite,
        removeFavorite,
        toggleSidebar,
        setSidebarOpen,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
