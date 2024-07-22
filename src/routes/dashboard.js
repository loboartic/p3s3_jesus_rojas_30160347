import express from 'express';
const routerDashboard = express.Router();
import dashboard from '../controllers/dashboard.controllers.js';

// Importamos la ruta
routerDashboard.get('/', dashboard);

export default routerDashboard;
