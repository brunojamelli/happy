import {Router} from 'express';
import OrphanagesController from './controllers/OrphanagesController';
import uploadConf from './config/uploads'
import multer from 'multer';

const routes = Router();
const upload = multer(uploadConf);

routes.post("/orphanages", upload.array('images'),OrphanagesController.create);
routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);


export default routes;