export default function MovieCard({ movie, isFavorite, onFavoriteToggle, onViewDetails }) {
  const shortOverview =
    movie.summary && movie.summary.length > 140
      ? `${movie.summary.slice(0, 140)}...`
      : movie.summary || "No description available.";

  return (
    <article className="card">
      {movie.posterUrl ? (
        <img className="poster" src={movie.posterUrl} alt={`${movie.title} poster`} />
      ) : (
        <div className="posterPlaceholder">No poster available</div>
      )}

      <div className="cardBody">
        <div>
          <h3 className="movieTitle">{movie.title}</h3>
          <p className="muted">{movie.releaseYear}</p>
        </div>

        <p className="overview">{shortOverview}</p>

        <div className="cardActions">
          <button className="button secondary" onClick={() => onViewDetails(movie.id)}>
            Details
          </button>
          <button className="button" onClick={() => onFavoriteToggle(movie)}>
            {isFavorite ? "Remove Favorite" : "Add Favorite"}
          </button>
        </div>
      </div>
    </article>
  );
}
