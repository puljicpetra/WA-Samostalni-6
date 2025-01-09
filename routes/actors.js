import express from 'express';
import { pretrazivanjeActorsPoId } from '../middleware/actors.js';
import { query, param, body, validationResult } from 'express-validator';

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

router.get(
    '/', 
    
    query('name')
        .optional()
        .trim()
        .escape()
        .matches(/^[A-Za-z\s]+$/).withMessage('Name moze sadrzavati samo slova i razmake'),

    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name } = req.query;
        let filtriraniActors = actors;

        if (name) {
            filtriraniActors = actors.filter(actor => actor.name.toLowerCase().includes(name.toLowerCase()));
        }

        if (filtriraniActors.length > 0) {
            return res.status(200).json(filtriraniActors);
        }

        return res.status(404).json({ message: 'Nema glumaca' })
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

    pretrazivanjeActorsPoId,

    (req, res) => {
        return res.status(200).json(req.actor);
    }
);

router.post(
    '/', 
    
    [
        body('name')
            .notEmpty().withMessage('Name je obavezan')
            .trim()
            .escape()
            .matches(/^[\p{L}\s]+$/u).withMessage('Name može sadrzavati samo slova i razmake'),
        body('birthYear')
            .notEmpty().withMessage('BirthYear je obavezan')
            .trim()
            .escape()
            .isInt(),
    ],

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, birthYear, movies } = req.body;
        const noviActor = {
            id: Date.now(),
            name,
            birthYear,
            movies,
        };

        actors.push(noviActor);
        res.status(201).json({ message: "Uspjesno dodano", actor: noviActor });
    }
);

router.patch(
    '/:id', 
    
    [
        body('name')
            .optional()
            .notEmpty().withMessage('Name ne smije biti prazan')
            .trim()
            .escape()
            .matches(/^[\p{L}\s]+$/u).withMessage('Name može sadrzavati samo slova i razmake'),
        body('birthYear')
            .optional()
            .notEmpty().withMessage('BirthYear ne smije biti prazan')
            .trim()
            .escape()
            .isInt(),
    ],
    
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

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
    }
);

export default router;