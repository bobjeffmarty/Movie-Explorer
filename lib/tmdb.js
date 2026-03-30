const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export function getTmdbHeaders() {
  const token = process.env.TMDB_API_TOKEN;

  if (!token) {
    throw new Error("TMDB_API_TOKEN is missing.");
  }

  return {
    Authorization: `Bearer ${token}`,
    accept: "application/json"
  };
}

export function buildImageUrl(path) {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}${path}`;
}

export function buildSearchUrl(query) {
  return `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false`;
}

export function buildDetailsUrl(id) {
  return `${TMDB_BASE_URL}/movie/${id}`;
}

export function normalizeSearchResult(movie) {
  return {
    id: movie.id,
    title: movie.title,
    summary: movie.overview || "No description available.",
    releaseDate: movie.release_date || "",
    releaseYear: movie.release_date ? movie.release_date.slice(0, 4) : "N/A",
    posterPath: movie.poster_path || null,
    posterUrl: buildImageUrl(movie.poster_path),
    hasPoster: Boolean(movie.poster_path)
  };
}

export function normalizeMovieDetails(movie) {
  return {
    id: movie.id,
    title: movie.title,
    summary: movie.overview || "No description available.",
    releaseDate: movie.release_date || "",
    releaseYear: movie.release_date ? movie.release_date.slice(0, 4) : "N/A",
    runtimeMinutes: movie.runtime ?? null,
    posterPath: movie.poster_path || null,
    posterUrl: buildImageUrl(movie.poster_path),
    hasPoster: Boolean(movie.poster_path)
  };
}
