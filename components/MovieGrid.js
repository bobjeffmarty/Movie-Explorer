import MovieCard from "@/components/MovieCard";

export default function MovieGrid({ movies, favoriteIds, onFavoriteToggle, onViewDetails }) {
  return (
    <div className="grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favoriteIds.has(movie.id)}
          onFavoriteToggle={onFavoriteToggle}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
