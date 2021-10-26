const express = require('express');
const rescue = require('express-rescue');
const app = express();
app.use(express.json());

const pong = require('./recursos/ping/getPong');
const { readSimpsons, whriteSimpsons } = require('./fsFunctions');

app.get('/ping', pong);

app.post('/hello', (req, res) => {
  const name = req.body.name;
  res.status(200).json({ message: `Hello, ${name}` });
});

app.post('/greetings', (req, res) => {
  const {name, age} = req.body;
  if (parseInt(age) > 17) {
    return res.status(200).json({ message: `Hello, ${name}!` });
  };
  return res.status(401).json({ message: "Unauthorized" });
});

app.put('/users/:name/:age', (req, res) => {
  const { name, age } = req.params;
  return res.status(200).json({ message: `Seu nome é ${name} e você tem ${age} anos de idade` });
});

app.get('/simpsons', rescue(async (req, res) => {
  try {
    const objData = await readSimpsons();
    return res.status(200).json({ results: objData });
  } catch(err) {
    return res.status(500).send(err);
  };
}));

app.get('/simpsons/:id', rescue(async (req,res) => {
  try {
    const { id } = req.params;
    const personagem = await readSimpsons().then(r => r.find(e => e.id === id));
    if (!personagem) {
      return res.status(404).json({ message: 'simpson not found' });
    };
    return res.status(200).json({ results: personagem });
  } catch(err) {
    return res.status(500).end();
  };
}));

app.post('/simpsons', rescue(async (req, res) => {
  try {
    const personagem = req.body;
    const listaPersonagem = await readSimpsons();
    const idCheck = listaPersonagem.find(e => parseInt(e.id) === parseInt(personagem.id));
    if (!idCheck) {
     await whriteSimpsons([...listaPersonagem, personagem]);
     return res.status(204).json(await readSimpsons());
    }
    return res.status(409).json({ message: 'id already exists' });
  } catch(err) {
    return res.status(500).send({ message: 'internal error' });
  };
}));

app.listen(3001, () =>{
  console.log('aplicação iniciada na porta 3001');
});
