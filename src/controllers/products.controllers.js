import { crearDB, conectarDB } from '../database/database.js';

// ----- CRUD Productos -----

export const productsList = (req, res) => {
    let data = [];

    // Verificar los datos de las categorias
    const db = crearDB();

    db.all('SELECT * FROM "products"', (err, rows) => {
        if (err) {
            throw err;
        }

        // Si no hay filas se retorna undifinded
        if (!rows) {
            res.render('products.pug', {});
        }
        // Asignamos la data y la retornamos
        data = rows;

        res.render('products.pug', { data });
    });
};
export const productsCreate = (req, res) => {
    try {
        // Obtener valores de la petición
        const { name, code, categorie, stock, price } = req.body;

        // Verificar que todos los valores funcionen correctamente
        const db = crearDB();

        // Crear la data
        db.run(
            'INSERT INTO products (name, code, categorie_id, stock, price) VALUES (?, ?, ?, ?, ?)',
            [name, code, 1, stock, price],
        );

        // Redireccionamos
        res.redirect('/products');
    } catch (error) {
        res.redirect('/products');
    }
};
export const productsUpdate = (req, res) => {};
export const productsDelete = (req, res) => {};
