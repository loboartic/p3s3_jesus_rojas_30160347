import sqlite from 'sqlite3';
// Ruta del archivo de la base de datos
const dbPath = './database.db';

// Creacipon de la base de datos
export const crearDB = () => {
    // Conectamos a la base de datos
    const db = new sqlite.Database(dbPath);

    // Retornamos la conexión
    return db;
};


export const conectarDB = () => {
    return crearDB()
}

// Creamos la columnas
export const crearColumnas = (db) => {
    try {
        // Verificamos que si no se pasa la conexión por parámetros
        if (!db) {
            return 'No se pudo conectar';
        }

        // Verificar si la tabla categories existe, si no existe crearla
        db.get(
            `SELECT name FROM sqlite_master WHERE type='table' AND name='categories'`,
            (err, row) => {
                if (err) {
                    console.error(err);
                } else if (!row) {
                    // La tabla no existe, crearla
                    db.run(
                        'CREATE TABLE categories (id INTEGER PRIMARY KEY, name TEXT)'
                    );
                }
            }
        );

        // Verificar si la tabla usuarios existe, si no existe crearla
        db.get(
            `SELECT name FROM sqlite_master WHERE type='table' AND name='productos'`,
            (err, row) => {
                if (err) {
                    console.error(err);
                } else if (!row) {
                    // La tabla no existe, crearla
                    db.run(`
            CREATE TABLE productos (
            id INTEGER PRIMARY KEY,
            codigo TEXT,
            productos TEXT,
            categoria_id INTEGER,
            existencia_actual INTEGER,
            precio REAL,
            FOREIGN KEY (categoria_id) REFERENCES categories(id)
          );
          `);
                }
            }
        );

        // Retornamos la conexión
        return db;
    } catch (error) {
        // Si existe un error lo indicamos
        return error.message;
    }
};