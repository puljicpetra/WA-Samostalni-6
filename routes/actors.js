import express from 'express';
import { pretrazivanjeActorsPoId } from '../middleware/actors.js';

const router = express.Router();

export let actors = [
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

router.get('/', (req, res) => {
    if (actors) {
        return res.status(200).json(actors);
    }
    return res.status(404).json({ message: 'Nema glumaca' })
});

router.get('/:id', pretrazivanjeActorsPoId, (req, res) => {
    return res.status(200).json(req.actor);
});

router.post('/', (req, res) => {
    const { name, birthYear, movies } = req.body;
    if (!name || !birthYear || !Array.isArray(movies) || movies.length === 0) {
        return res.status(400).json({ message: "Nedostaju podaci" });
      }

    const noviActor = {
        id: Date.now(),
        name,
        birthYear,
        movies,
    };

    actors.push(noviActor);
    res.status(201).json({ message: "Uspjesno dodano", actor: noviActor });
});

router.patch('/:id', (req, res) => {
    const id_route_param = parseInt(req.params.id);
    const actor = actors.find(actor => actor.id === id_route_param);

    if (!actor) {
        return res.status(404).json({ message: 'Nije pronadjen' });
    }

    const { name, birthYear, movies } = req.body;
    if (name) actor.name = name;
    if (birthYear) actor.birthYear = birthYear;
    if (movies) actor.movies = movies;

    console.log(actors);
    return res.status(200).json({ message: 'Uspjesno azurirano', actor });
});

export default router;