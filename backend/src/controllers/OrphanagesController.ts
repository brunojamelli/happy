import { Request, Response } from 'express';
import Orphanage from '../models/Orphanage';
import { getRepository } from 'typeorm';
import orphView from '../views/orphanages_view';

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

        const reqImgs = req.files as Express.Multer.File[];
        const images = reqImgs.map(image => {
            return { path: image.filename }
        })

        const orph = orphRep.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        });

        await orphRep.save(orph);

        return res.status(201).json(orph);
    },

    async index(req: Request, res: Response) {
        let orphRep = getRepository(Orphanage);
        let orphList = await orphRep.find({
            relations: ['images']
        });
        return res.json(orphView.renderMany(orphList));
    },

    async show(req: Request, res: Response) {
        let orphRep = getRepository(Orphanage);
        let orph = await orphRep.findOneOrFail(req.params.id,{
            relations:['images']
        });
        return res.json(orphView.render(orph));
    }

}