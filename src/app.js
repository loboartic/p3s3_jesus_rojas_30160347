// Importamos express
import express from 'express';
//const router = express.Router()

// Creamos una instancia de ese objeto
const app = express();

app.set('view engine', 'pug');
app.set('views', './src/views')
app.use(express.static('./src/public'));

// Declaramos una ruta get
app.get('/', (req, res) => {
    // Redireccionamo al panel administrativo
    res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
    res.render('dashbord.pug', {});
});

// Iniciamos la aplicacion en el pueto 300
app.listen(3000, function () {
    console.log('Funcionando en el puerto 3000');
});
