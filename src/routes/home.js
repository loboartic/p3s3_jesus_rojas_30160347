import express from 'express';
const routerHome = express.Router();
import home from '../controllers/home.controllers.js';

// Importamos la ruta
routerHome.get('/', home);

export default routerHome;
