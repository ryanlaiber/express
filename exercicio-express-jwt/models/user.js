const md5 = require('md5');
const MongoClient = require('./connection');

const USER_COLLECTION = 'user';

const getNewUser = (name, password) => {
  const encript = md5(password);
  const newUser = {
    name,
    password: encript,
  };

  return newUser;
};

const create = async (name, password) => {
  const connection = await MongoClient().then((db) => db.collection(USER_COLLECTION));
  const { insertedId } = await connection.insertOne(getNewUser(name, password));

  return {
    _id: insertedId,
    name,
  };
};

const getAll = async () => {
  const connection = await MongoClient().then((db) => db.collection(USER_COLLECTION));
  const all = await connection.find().toArray();

  return all;
};

module.exports = {
  create,
  getAll,
};
