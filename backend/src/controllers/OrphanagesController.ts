import {Request, Response} from 'express';
import Orphanage from '../models/Orphanage';
import { getRepository } from 'typeorm';

export default {
    async create(req: Request, res: Response) {
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

        return res.status(201).json(orph);
    },

    async index(req: Request, res: Response){
        let orphRep = getRepository(Orphanage);
        let list = await orphRep.find();
        return res.json(list);
    }
}