import express, { request, response } from 'express';
import {celebrate, Joi} from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

// Importando as rotas
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

//  Estanciando as classes
const routes = express.Router();
const upload = multer(multerConfig);

const pointsCrontroller = new PointsController();
const itemsController = new ItemsController();



routes.get('/items', itemsController.index);
routes.get('/points', pointsCrontroller.index);
routes.get('/points/:id', pointsCrontroller.show);

routes.post('/points',
 upload.single('image'),
 celebrate({
     body: Joi.object({}).keys({
         name: Joi.string().required(),
         email: Joi.string().required().email(),
         whatsapp: Joi.number().required(),
         latitude: Joi.number().required(),
         longitude: Joi.number().required(),
         city: Joi.string().required(),
         uf: Joi.string().required().max(2),
         items: Joi.string().required()
     })
    }, {
        abortEarly: false
    }  
 ),
 pointsCrontroller.create
 
 );

export default routes;