"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";
import FavoritesPanel from "@/components/FavoritesPanel";
import MovieDetailsModal from "@/components/MovieDetailsModal";
import { useFavorites } from "@/hooks/useFavorites";

export default function HomePage() {
  
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [emptyStateMessage, setEmptyStateMessage] = useState("Search for a movie to get started.");

  const [activeMovie, setActiveMovie] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState("");

  const { favorites, favoriteIds, addFavorite, removeFavorite, updateFavorite } = useFavorites();

  async function handleSearch(rawQuery) {
    const query = rawQuery.trim();

    setSearchError("");
    setEmptyStateMessage("");

    if (!query) {
      setSearchResults([]);
      setEmptyStateMessage("Enter a movie title to search.");
      return;
    }

    try {
      setIsSearching(true);

      const response = await fetch(`/api/movies/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Search failed.");
      }

      setSearchResults(data.results || []);

      if (!data.results?.length) {
        setEmptyStateMessage("No matching movies were found.");
      }
    } catch (error) {
      setSearchResults([]);
      setSearchError(error.message || "Search failed.");
    } finally {
      setIsSearching(false);
    }
  }

  async function handleViewDetails(id) {
    setDetailsError("");
    setActiveMovie(null);

    try {
      setIsLoadingDetails(true);

      const response = await fetch(`/api/movies/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load details.");
      }

      setActiveMovie(data.movie);
    } catch (error) {
      setDetailsError(error.message || "Failed to load details.");
    } finally {
      setIsLoadingDetails(false);
    }
  }

  function handleFavoriteToggle(movie) {
    if (favoriteIds.has(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }

  return (
    <main className="page">
      <header className="header">
        <h1 className="title">Movie Explorer</h1>
        <p className="subtitle">
          Search movies, view details, and save favorites with your own rating and note.
        </p>
      </header>

      <div className="layout">
        <section className="panel">
          <h2 className="sectionTitle">Search</h2>
          <SearchBar onSearch={handleSearch} loading={isSearching} />

          {searchError ? <div className="status error">{searchError}</div> : null}
          {detailsError ? <div className="status error">{detailsError}</div> : null}
          {isLoadingDetails ? <div className="status info">Loading movie details...</div> : null}

          {!searchResults.length && !searchError ? (
            <div className="status info">{emptyStateMessage}</div>
          ) : null}

          {searchResults.length ? (
            <MovieGrid
              movies={searchResults}
              favoriteIds={favoriteIds}
              onFavoriteToggle={handleFavoriteToggle}
              onViewDetails={handleViewDetails}
            />
          ) : null}
        </section>

        <FavoritesPanel
          favorites={favorites}
          onRemove={removeFavorite}
          onUpdate={updateFavorite}
        />
      </div>

      <MovieDetailsModal movie={activeMovie} onClose={() => setActiveMovie(null)} />
    </main>
  );
}
