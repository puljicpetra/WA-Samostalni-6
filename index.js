import express from 'express';
import moviesRoutes from './routes/movies.js';
import actorsRoutes from './routes/actors.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
  const method = req.method;
  const url = req.originalUrl;

  console.log(`[movie-server] [${timestamp}] ${method} ${url}`);
  next();
});

app.get('/', (req, res) => {
    res.send('movie-server');
});

app.use('/movies', moviesRoutes);
app.use('/actors', actorsRoutes);
  
app.listen(PORT, error => {
    if (error) {
        console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
    } else {
        console.log(`Poslužitelj dela na http://localhost:${PORT}`);
    }
});
