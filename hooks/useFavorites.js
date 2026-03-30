"use client";

import { useEffect, useMemo, useState } from "react";
import { readFavorites, writeFavorites } from "@/lib/favorites-storage";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(readFavorites());
  }, []);

  useEffect(() => {
    writeFavorites(favorites);
  }, [favorites]);

  const favoriteIds = useMemo(() => {
    return new Set(favorites.map((movie) => movie.id));
  }, [favorites]);

  function addFavorite(movie) {
    setFavorites((current) => {
      if (current.some((item) => item.id === movie.id)) return current;

      return [
        {
          id: movie.id,
          title: movie.title,
          releaseDate: movie.releaseDate || "",
          posterPath: movie.posterPath || null,
          posterUrl: movie.posterUrl || null,
          personalRating: "",
          note: ""
        },
        ...current
      ];
    });
  }

  function removeFavorite(id) {
    setFavorites((current) => current.filter((item) => item.id !== id));
  }

  function updateFavorite(id, updates) {
    setFavorites((current) =>
      current.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }

  return {
    favorites,
    favoriteIds,
    addFavorite,
    removeFavorite,
    updateFavorite
  };
}
