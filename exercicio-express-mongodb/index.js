const express = require('express');
const { create } = require('./model/User');

const app = express();

app.use(express.json());

app.post('/user', async (req, res, next) => {
  try {
    const { body } = req;
    const result = await create(body);
    console.log(result);
    if (result) {
      res.status(201).json({ message: "sucesso" });
      return next();
    }
    throw new Error("dados invalidos");
  } catch(err) {
    return res.status(400).send(err.message);
  }
})

app.listen(3000, () => {
  console.log('Ouvindo porta 3000');
});
