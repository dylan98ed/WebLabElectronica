/*---------------------------- Inicializo las variables de entorno ------------------------------*/
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });

/*--------------------------------- Inicializo el servidor HTTP ---------------------------------*/
const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
  }));
/*-----------------------------------------------------------------------------------------------*/
const connection = require('./models/db');

app.get('/api/instrumentos', (req, res) => {

    const query = "SELECT * FROM instrumentos"

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta: ', err);
            res.status(500).send('Error ejecutando la consulta');
            return;
        }
        res.json(results);
    });

});

app.get('/api/proyectores', (req, res) => {

    const query = "SELECT * FROM proyectores"

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta: ', err);
            res.status(500).send('Error ejecutando la consulta');
            return;
        }
        res.json(results);
    });

});

app.get('/api/notebooks', (req, res) => {

    const query = "SELECT * FROM notebooks"

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta: ', err);
            res.status(500).send('Error ejecutando la consulta');
            return;
        }
        res.json(results);
    });

});

app.get('/api/libros', (req, res) => {

    const query = "SELECT * FROM libros"

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta: ', err);
            res.status(500).send('Error ejecutando la consulta');
            return;
        }
        res.json(results);
    });

});

/*----------------------------------------Login y Register---------------------------------------*/

const bcrypt = require('bcryptjs');
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.status(401).json({ message: 'No autorizado' });
};

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, 8, (err, hash) => {
        if (err) {
            return res.status(500).send('Error al hashear la contraseña');
        }

        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        connection.query(sql, [username, hash], (err, result) => {
            if (err) {
                return res.status(500).send('Error al registrar el usuario');
            }
            res.status(200).send('Usuario registrado correctamente');
        });
    });
});

app.post('/check-auth', isAuthenticated, (req, res) => {
    res.status(200).json({ message: `Usuario autenticado: ${req.session.user.username}` });
});




/*-------------------------- Inicio la conexion con la base de datos ----------------------------*/


const routes = require('./api/endPoints');

app.use('/',routes);

app.listen(process.env.PORT, () => console.log(`Servidor escuchando http://localhost:${process.env.PORT}`))