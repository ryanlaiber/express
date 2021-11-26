require('dotenv').config();
const express = require('express');
const UserController = require('./controllers/user');

const app = express();

app.use(express.json());

app.post('/user', UserController.create);
app.get('/user', UserController.getAll);

app.listen(3000, () => {
  console.log('escutando porta 3000');
});
