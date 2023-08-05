const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ['x-auth-token'],
    allowedHeaders: ['Content-Type', 'x-auth-token'],
    preflightContinue: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'


}));

// Replace 'YOUR_TMDB_API_KEY' with your actual TMDB API key
const TMDB_API_KEY = '37d2e20eae76a43d750489e1155ff691';

app.get('/api/movies', async (req, res) => {
  try {
    const searchTerm = req.query.term;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchTerm}`;

    const response = await fetch(url);
    const data = await response.json();
    
    const movieData = data.results.map(movie => ({
      title: movie.title,
      genre: movie.genre_ids,
      overview: movie.overview,
      rating: movie.vote_average,
      releaseYear: movie.release_date.substring(0, 4)
    }));

    res.json(movieData);
  } catch (error) {
    console.error('Error fetching movie data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
