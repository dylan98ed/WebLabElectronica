var mysql = require('mysql2')

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

module.exports = connection;


const express = require('express')
const cors = require('cors');

const app = express();
const PORT = 3000;

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


app.listen(PORT, () => console.log(`Servidor escuchando http://localhost:${PORT}`))