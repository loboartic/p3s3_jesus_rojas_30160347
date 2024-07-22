import { crearDB, conectarDB } from '../database/database.js';

// ----- CRUD Categorias -----
export const categorieList = (req, res) => {
    let data = [];

    // Verificar los datos de las categorias
    const db = crearDB();

    db.all('SELECT * FROM "categories"', (err, rows) => {
        if (err) {
            throw err;
        }

        // Si no hay filas se retorna undifinded
        if (!rows) {
            res.render('categories.pug', {});
        }
        // Asignamos la data y la retornamos
        data = rows;

        res.render('categories.pug', { data });
    });

    // Si no exiten retornar un array vacio, de lo contrario un arreglo con los valores
};
export const categorieCreate = (req, res) => {
    const { name } = req.body;

    // Verificar que la data no este vácia
    if (name.trim() == '') {
        res.redirect('/categories');
    }

    const db = crearDB();

    // Crear la data
    db.run('INSERT INTO categories (name) VALUES (?)', [name]);

    // Enviar una array de objetos con las categorias creadas
    res.redirect('/categories');
};
export const categorieUpdate = (req, res) => {
    console.log('LLego algo');
};
export const categorieDelete = (req, res) => {
    try {
        const { id } = req.body;

        const db = crearDB();
        db.run('DELETE FROM categories WHERE id = ?', [id]);

        res.json({ isDelete: true });
    } catch (error) {
        res.json({ isDelete: false });
    }
};
