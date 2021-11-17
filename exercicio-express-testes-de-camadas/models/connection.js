const { MongoClient } = require('mongodb');

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = process.env.MONGO_DB_URL;

let db = null;

const getConnection = () => {
  return db
  ? Promise.resolve(db)
  : MongoClient.connect(MONGO_DB_URL, OPTIONS).then((conn) => {
    db = conn.db('model_example');
    return db;
  })
};

module.exports = { getConnection };
