// Fetch latest seasonal anime
export async function getLatestAnime() {
    const response = await fetch("https://api.jikan.moe/v4/seasons/now");
    const data = await response.json();
    return data.data; // return only anime list
}

// Search anime by name
export async function searchAnime(query) {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
    const data = await response.json();
    return data.data;
}