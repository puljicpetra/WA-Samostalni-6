import { movies } from '../routes/movies.js';

const pretrazivanjeMoviesPoId = (req, res, next) => {
    const id = parseInt(req.params.id);
    const movie = movies.find((movie) => movie.id === id);

    if (!movie) {
        return res.status(404).json({ message: 'Nije pronadjen' });
    }

    req.movie = movie;
    next();
};

export { pretrazivanjeMoviesPoId };