const cep = require('./routes/cep');
const express = require('express');
const app = express();

app.use(express.json());

app.use('/cep', cep);

app.listen(3000, () => {
  console.log('ouvindo porta 3000');
});
