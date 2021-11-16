const connection = require('./connection');
const fetchCep = require('./fetchCep');

const getCep = async (cep) => {
  const [info] = await connection.execute(
    'SELECT * FROM ceps WHERE cep = ?', [cep]
  );
  if (info.length == 0) {
    newCep = await fetchCep(cep);
    return newCep;
  }

  return info;
}

module.exports = getCep;
