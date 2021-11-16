const getCep = require('../models/cep-lookup');

const getByCep = async (cep) => {
  return await getCep(cep);
};

module.exports = getByCep;