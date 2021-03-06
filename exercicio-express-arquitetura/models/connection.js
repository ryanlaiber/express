require('dotenv').config();
const mysql = require('mysql2/promise');

const CREDENTIALS = {
  host: 'localhost',
  user: process.env.USER_DB,
  password: process.env.PASSWORD,
  database: 'cep_lookup',
};

const connection = mysql.createPool(CREDENTIALS);

module.exports = connection;
