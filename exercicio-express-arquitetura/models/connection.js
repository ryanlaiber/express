const mysql = require('mysql2/promise');

const CREDENTIALS = {
  host: 'localhost',
  user: 'RYAN_TL',
  password: 'Senha!321',
  database: 'cep_lookup',
};

const connection = mysql.createPool(CREDENTIALS);

module.exports = connection;
