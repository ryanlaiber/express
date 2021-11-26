const UserModel = require('../models/user');

const create = async (req, res, next) => {
  const { name, password } = req.body;

  const result = await UserModel.create(name, password);

  return res.status(200).json(result);
};

const getAll = async (req, res, next) => {

  const result = await UserModel.getAll();

  return res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
};
