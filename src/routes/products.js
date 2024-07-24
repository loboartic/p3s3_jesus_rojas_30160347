import express from 'express';
const routerProducts = express.Router();
import {
    productsList,
    productsCreate,
    productsUpdate,
    productsDelete,
} from '../controllers/products.controllers.js';

routerProducts.get('/', productsList);
routerProducts.post('/create', productsCreate);
routerProducts.post('/update', productsUpdate);
routerProducts.post('/delete', productsDelete);

export default routerProducts;
