const connection = require('./connection');

const validate = ({ firstName, lastName, email, password }) => {
  if (!firstName) return false;
  if(!lastName) return false;
  if(!email) return false;
  if(!(password.length >= 6)) return false;
  return true;
}

const create = async (user) => {
  if (!validate(user)) return false;

  await connection().then((db) => db.collection('users').insertOne(user))
    .then(result => console.log(result));
  return "criado com sucesso";
}

module.exports = {
  create,
};
