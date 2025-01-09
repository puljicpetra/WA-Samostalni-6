import express from 'express';
import moviesRoutes from './routes/movies.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('movie-server');
});

let actors = [
    {
      id: 123,
      name: "Morgan Freeman",
      birthYear: 1937,
      movies: [4222334],
    },
    {
      id: 234,
      name: "Marlon Brando",
      birthYear: 1924,
      movies: [5211223],
    },
    {
      id: 345,
      name: "Al Pacino",
      birthYear: 1940,
      movies: [5211223],
    },
];

app.use('/movies', moviesRoutes);
  
app.listen(PORT, error => {
    if (error) {
        console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
    } else {
        console.log(`Poslužitelj dela na http://localhost:${PORT}`);
    }
});
