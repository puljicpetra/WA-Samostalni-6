import express from 'express';
import { pretrazivanjeMoviesPoId } from '../middleware/movies.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

export let movies = [
  {
    id: 4222334,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: "Drama",
    director: "Frank Darabont",
  },
  {
    id: 5211223,
    title: "The Godfather",
    year: 1972,
    genre: "Crime",
    director: "Francis Ford Coppola",
  },
  {
    id: 4123123,
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    director: "Christopher Nolan",
  },
];

router.get('/', (req, res) => {
  if (movies) {
    return res.status(200).json(movies);
  }
  return res.status(404).json({ message: 'Nema filma' })
});

router.get('/:id', pretrazivanjeMoviesPoId, (req, res) => {
  return res.status(200).json(req.movie);
});

router.post(
  '/', 

  [
    body('title').isString().withMessage('Title treba biti string'),
    body('year').isInt().withMessage('Year treba biti integer'),
    body('genre').isString().withMessage('Genre treba biti string'),
    body('director').isString().withMessage('Director treba biti string'),
  ],

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, year, genre, director } = req.body;
    if (!title || !year || !genre || !director) {
      return res.status(400).json({ message: "Nedostaju podaci" });
    }

    const noviMovie = {
      id: Date.now(),
      title,
      year,
      genre,
      director,
    };

    movies.push(noviMovie);
    res.status(201).json({ message: "Uspjesno dodano", movie: noviMovie });
});

router.patch(
  '/:id', 

  [
    body('title').optional().isString().withMessage('Naslov mora biti string.'),
    body('year').optional().isInt().withMessage('Godina mora biti integer.'),
    body('genre').optional().isString().withMessage('Žanr mora biti string.'),
    body('director').optional().isString().withMessage('Redatelj mora biti string.'),
  ],
  
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id_route_param = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id === id_route_param);

    if (!movie) {
      return res.status(404).json({ message: 'Nije pronadjen' });
    }

    const { title, year, genre, director } = req.body;
    if (title) movie.title = title;
    if (year) movie.year = year;
    if (genre) movie.genre = genre;
    if (director) movie.director = director;

    console.log(movies);
    return res.status(200).json({ message: 'Uspjesno azurirano', movie });
});

export default router;