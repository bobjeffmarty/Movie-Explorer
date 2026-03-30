import { formatRuntime } from "@/lib/movie-utils";

export default function MovieDetailsModal({ movie, onClose }) {
  if (!movie) return null;

  return (
    <div className="modalBackdrop" onClick={onClose}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <div className="closeRow">
          <button className="button secondary" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="modalGrid">
          <div>
            {movie.posterUrl ? (
              <img className="poster" src={movie.posterUrl} alt={`${movie.title} poster`} />
            ) : (
              <div className="posterPlaceholder">No poster available</div>
            )}
          </div>

          <div>
            <h2 className="title" style={{ fontSize: "1.8rem", marginBottom: 8 }}>
              {movie.title}
            </h2>
            <p className="muted">
              Year: {movie.releaseYear} {formatRuntime(movie.runtimeMinutes)}
            </p>
            <p className="overview" style={{ marginTop: 16 }}>
              {movie.summary || "No overview available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
