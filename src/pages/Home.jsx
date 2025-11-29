import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../css/home.css";

// import API functions
import { getLatestAnime, searchAnime } from "../services/api";

function Home() {
    const [anime, setAnime] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAnime = async () => {
            try {
                const latestAnime = await getLatestAnime();
                setAnime(latestAnime);
            } catch (err) {
                setError("Failed to fetch latest anime.");
            } finally {
                setLoading(false);
            }
        };

        loadAnime();
    }, []);

    // handle form search
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const results = await searchAnime(searchQuery);
            setAnime(results);
            setError(null);
        } catch (err) {
            setError("Search failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    placeholder="Search for an anime..."
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movies-grid">
                    {anime.map((item) => (
                        <MovieCard key={item.mal_id} movie={item} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
