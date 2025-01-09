import { actors } from '../routes/actors.js';

const pretrazivanjeActorsPoId = (req, res, next) => {
    const id = parseInt(req.params.id);
    const actor = actors.find((actor) => actor.id === id);

    if (!actor) {
        return res.status(404).json({ message: 'Nije pronadjen' });
    }

    req.actor = actor;
    next();
};

export { pretrazivanjeActorsPoId };