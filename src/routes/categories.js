import express from 'express';
const routerCategories = express.Router();
import {
    categorieList,
    categorieCreate,
    categorieUpdate,
    categorieDelete,
} from '../controllers/categories.controllers.js';

routerCategories.get('/', categorieList);
routerCategories.post('/create', categorieCreate);
routerCategories.post('/update', categorieUpdate);
routerCategories.post('/delete', categorieDelete);

export default routerCategories;
