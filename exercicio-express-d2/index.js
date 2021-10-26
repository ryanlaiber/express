const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/user');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/user', userRouter);

app.listen('3001', () => {
  console.log('ligando aplicação ao local host 3001');
});
