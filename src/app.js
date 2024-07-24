// Importamos express
import express from 'express';
import routerHome from './routes/home.js';
import routerDashboard from './routes/dashboard.js';
import routerCategories from './routes/categories.js';
import routerProducts from './routes/products.js';
import { crearDB, crearColumnas } from './database/database.js';

// Creamos una instancia de ese objeto
const app = express();

// Llamamos a la base de datos
const db = crearDB();
crearColumnas(db);

// Para convertir las peticiones en JSON
app.use(express.json());
// Para decodificar el body en un objeto lejible
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(express.static('./src/public'));

// ----- Rutas -----
app.use('/', routerHome);
app.use('/dashboard', routerDashboard);
app.use('/categories', routerCategories);
app.use('/products', routerProducts);

// Iniciamos la aplicacion en el pueto 300
app.listen(3000, function () {
    console.log('Funcionando en el puerto 3000');
});
