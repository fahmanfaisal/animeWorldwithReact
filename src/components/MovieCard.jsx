import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {

    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie.mal_id);

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) {
            removeFromFavorites(movie.mal_id);
        } else {
            addToFavorites(movie);
        }
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img
                    src={movie.images.jpg.large_image_url}
                    alt={movie.title}
                />
            </div>

            <div className="movie-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>

            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>
                    {movie.aired?.from
                        ? movie.aired.from.slice(0, 10)    // 2024-05-01
                        : "Unknown release"}
                </p>

                <p className="score">⭐ {movie.score ?? "N/A"}</p>
            </div>
        </div>
    );
}

export default MovieCard;
