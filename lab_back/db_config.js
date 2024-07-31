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

