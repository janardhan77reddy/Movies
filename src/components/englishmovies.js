import React, { useState, useEffect } from "react";
import './englishmovies.css';

function Movie() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    

    useEffect(() => {
        async function fetchSuggestions() {
            try {
                if (searchTerm !== "") {
                    const response = await fetch(
                        `http://localhost:5000/api/movies?term=${searchTerm}`
                    );
                    const data = await response.json();

                    const filteredSuggestions = data
                        .filter((movie) => movie.title.toLowerCase().startsWith(searchTerm.toLowerCase()))
                        .map((movie) => movie.title);

                    setSuggestions(filteredSuggestions);
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        }
        
        fetchSuggestions();
    }, [searchTerm]);

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/movies?term=${searchTerm}`
            );
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <div>
            <h1>Welcome To Movies Website</h1>
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter movie title"
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div>
                <h2>Suggestions:</h2>
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h2>Search Results:</h2>
                {searchResults.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    <ul>
                        {searchResults.map((movie, index) => (
                            <li key={index} className="movie-container">
                                <image className="movie-title">{movie.image}</image>
                                <h3 className="movie-title">{movie.title}</h3>
                                <p className="movie-info">Genre: {movie.genre}</p>
                                <p className="movie-info">Overview: {movie.overview}</p>
                                <p className="movie-info" >Rating: {movie.rating}</p>
                                <p className="movie-info">Release Year: {movie.releaseYear}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Movie;
