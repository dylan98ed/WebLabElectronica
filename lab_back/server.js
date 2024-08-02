
const express = require('express')
const cors = require('cors');
const mysql = require('mysql2')
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Aaa1010!',
  database: 'laboratorio'
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos: ', err.stack);
    return;
  }
  console.log('Conectado a la base de datos como id ' + connection.threadId);
});


app.use(cors());
app.use(express.json());

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

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sql = 'SELECT * FROM users WHERE username = ?';
  connection.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error en la consulta a la base de datos' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error al comparar las contraseñas' });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    });
  });
});


app.listen(PORT, () => console.log(`Servidor escuchando http://localhost:${PORT}`))



