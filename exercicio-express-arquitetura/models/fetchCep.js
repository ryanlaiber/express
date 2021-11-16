const insertCep = require('./cep-insert');
const axios = require('axios');

const Error = { "error": { "code": "notFound", "message": "CEP não encontrado" } };

const fetchCep = async (cep) => {
  const { data } = await axios(`https://viacep.com.br/ws/${cep}/json/`);
  console.log(data);
  if (data.erro) return Error;
  const formatCep = data.cep.split('-').join('');
  const newCep = {
    cep: formatCep,
    logradouro: data.logradouro,
    bairro: data.bairro,
    localidade: data.localidade,
    uf: data.uf,
  }

  insertCep(newCep);
  return [newCep];
}

module.exports = fetchCep;
