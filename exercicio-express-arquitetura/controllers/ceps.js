const getByCep = require('../services/ceps');

async function getCep(req, res, next) {
  const { cep } = req.params;
  
  const result = await getByCep(cep);

  if (result.error) {
    console.log(result);
    return res.status(404).json(result.error);
  }

  return res.status(200).json(result);
};

module.exports = getCep;
