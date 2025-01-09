import express from 'express';
const router = express.Router();

let movies = [
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

router.get('/', async (req, res) => {
    if (movies) {
        return res.status(200).json(movies);
    }
    return res.status(404).json({ message: 'Nema filma' })
});

router.get('/:id', async (req, res) => {
    const id_route_param = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id === id_route_param);
    if (movie) {
        return res.status(200).json(movie);
    }
    return res.status(404).json({ message: 'Film nije pronadjen' })
});

router.post('/', async (req, res) => {
    const { title, year, genre, director } = req.body;
    if (!title || !year || !genre || !director) {
        return res.status(400).json({ message: "Nedostaju podaci" });
      }

    const noviMovie = {
      id: Date.now(),
      title: req.body.title,
      year: req.body.year,
      genre: req.body.genre,
      director: req.body.director,
    };

    movies.push(noviMovie);
    res.status(201).json({ message: "Uspjesno dodano", movie: noviMovie });
});

router.patch('/:id', async (req, res) => {
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