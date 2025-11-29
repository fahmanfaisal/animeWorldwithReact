import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites.length > 0) {
        return (
            <div className="favorites">
                <h1>Your Favorite Movies</h1>
                <div className="movies-grid">
                    {favorites.map((item) => (
                        <MovieCard key={item.mal_id} movie={item} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-empty">
            <h2>No Favorite Movies yet</h2>
            <p>
                Start adding movies to your favorites and they will appear here.
            </p>
        </div>
    );
}

export default Favorites;