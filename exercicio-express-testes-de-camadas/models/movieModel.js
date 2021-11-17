const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getAll = async () => {
  const moviesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('movies'));

  const movies = await moviesCollection.find().toArray();

  return movies.map(({ _id, ...movieData }) => ({
    id: _id,
    ...movieData,
  }));
};

const create = async ({ title, directedBy, releaseYear }) => {
  const moviesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('movies'));
  
  const { insertedId: id } = await moviesCollection
    .insertOne({ title, directedBy, releaseYear });
  
  return {
    id,
    title,
    directedBy,
    releaseYear,
  };
};

const getById = async (id) => {
  const moviesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('movies'));
  
  const objId = new ObjectId(id);
  const movieData = await moviesCollection.findOne({ _id: objId });

  if (movieData) return movieData;

  return false;
}

module.exports = {
  getAll,
  create,
  getById,
};
