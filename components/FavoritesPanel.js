export default function FavoritesPanel({ favorites, onRemove, onUpdate }) {
  return (
    <section className="panel">
      <h2 className="sectionTitle">Favorites</h2>

      {!favorites.length ? (
        <div className="status info">No favorites yet. Add a movie from the search results.</div>
      ) : (
        <div className="favoriteList">
          {favorites.map((movie) => (
            <div className="favoriteItem" key={movie.id}>
              <div className="favoriteHeader">
                {movie.posterUrl ? (
                  <img className="favoriteThumb" src={movie.posterUrl} alt={`${movie.title} poster`} />
                ) : (
                  <div className="favoriteThumb" />
                )}

                <div className="favoriteBody">
                  <h3 className="movieTitle">{movie.title}</h3>
                  <p className="muted">{movie.releaseDate ? movie.releaseDate.slice(0, 4) : "N/A"}</p>
                </div>
              </div>

              <label className="label" htmlFor={`rating-${movie.id}`}>
                Personal rating
              </label>
              <select
                id={`rating-${movie.id}`}
                className="field"
                value={movie.personalRating}
                onChange={(event) =>
                  onUpdate(movie.id, { personalRating: event.target.value })
                }
              >
                <option value="">Select a rating</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>

              <label className="label" htmlFor={`note-${movie.id}`}>
                Note
              </label>
              <textarea
                id={`note-${movie.id}`}
                className="field textarea"
                placeholder="Add an optional note..."
                value={movie.note}
                onChange={(event) => onUpdate(movie.id, { note: event.target.value })}
              />

              <button className="button danger" onClick={() => onRemove(movie.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
