import express from 'express';
import './database/connection';
import Orphanage from './models/Orphanage';
import { getRepository } from 'typeorm';

const app = express();

app.use(express.json());

app.listen(3333);

app.post("/orphanages",async (req, res) => {

    const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
    } = req.body;

    const orphRep = getRepository(Orphanage);

    const orph = orphRep.create({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
    });

    await orphRep.save(orph);

    return res.json(orph);
})
