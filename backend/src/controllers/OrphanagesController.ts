import { Request, Response } from 'express';
import Orphanage from '../models/Orphanage';
import { getRepository } from 'typeorm';
import orphView from '../views/orphanages_view';
import * as Yup from 'yup';

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
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        }
        const data_schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required(),
                })
            ),
        })
        await data_schema.validate(data,
            // { ...req.body, open_on_weekends, images },
            { abortEarly: false }
          );
        const orph = orphRep.create(data);

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
        let orph = await orphRep.findOneOrFail(req.params.id, {
            relations: ['images']
        });
        return res.json(orphView.render(orph));
    }

}