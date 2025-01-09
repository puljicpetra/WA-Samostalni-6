import express from 'express';
import { pretrazivanjeMoviesPoId } from '../middleware/movies.js';
import { query, param, body, validationResult } from 'express-validator';

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

router.get(
  '/', 
  
  [
    query('min_year')
      .optional()
      .trim()
      .isInt().withMessage('Min_year treba biti integer'),
    query('max_year')
      .optional()
      .trim()
      .isInt().withMessage('Max_year treba biti integer'),
    query('min_year').custom((value, { req }) => {
      if (value && req.query.max_year && parseInt(value) >= parseInt(req.query.max_year)) {
        throw new Error('Min_year treba biti manji od max_year');
      }
      return true;
    }),
  ],
  
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { min_year, max_year } = req.query;
    let filtriraniMovies = movies;

    if (min_year) {
      filtriraniMovies = filtriraniMovies.filter(movie => movie.year >= parseInt(min_year));
    }
    if (max_year) {
      filtriraniMovies = filtriraniMovies.filter(movie => movie.year <= parseInt(max_year));
    }

    if (filtriraniMovies.length === 0) {
      return res.status(404).json({ message: 'Ne postoji film u ovom rasponu godina' });
    }

    return res.status(200).json(filtriraniMovies);
  }
);

router.get(
  '/:id', 
  
  [
    param('id')
      .isInt().withMessage('Id mora biti integer')
  ], 
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
  },

  pretrazivanjeMoviesPoId, 

  (req, res) => {
    return res.status(200).json(req.movie);
  }
);

router.post(
  '/', 

  [
    body('title')
      .notEmpty().withMessage('Title je obavezan')
      .trim()
      .escape()
      .matches(/^[\p{L}\s]+$/u),
    body('year')
      .notEmpty().withMessage('Year je obavezan')
      .trim()
      .escape()
      .isInt(),
    body('genre')
      .notEmpty().withMessage('Genre je obavezan')
      .trim()
      .escape()
      .matches(/^[\p{L}\s/]+$/u),
    body('director')
      .notEmpty().withMessage('Director je obavezan')
      .trim()
      .escape()
      .matches(/^[\p{L}\s]+$/u),
  ],

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, year, genre, director } = req.body;

    const noviMovie = {
      id: Date.now(),
      title,
      year,
      genre,
      director,
    };

    movies.push(noviMovie);
    res.status(201).json({ message: "Uspjesno dodano", movie: noviMovie });
  }
);

router.patch(
  '/:id', 

  [
    body('title')
      .optional()
      .notEmpty().withMessage('Title ne smije biti prazan')
      .trim()
      .escape()
      .matches(/^[\p{L}\s/]+$/u),
    body('year')
      .optional()
      .notEmpty().withMessage('Year ne smije biti prazan')
      .trim()
      .escape()
      .isInt(),
    body('genre')
      .optional()
      .notEmpty().withMessage('Genre ne smije biti prazan')
      .trim()
      .escape()
      .matches(/^[\p{L}\s/]+$/u),
    body('director')
      .optional()
      .notEmpty().withMessage('Director ne smije biti prazan')
      .trim()
      .escape()
      .matches(/^[\p{L}\s/]+$/u),
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
  }
);

export default router;