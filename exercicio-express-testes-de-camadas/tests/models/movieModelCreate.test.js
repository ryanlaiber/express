const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const MoviesModel = require('../../models/movieModel');

describe('Insere um novo filme no DB', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;

  const payloadMovie = {
    title: "amigo da mamãe",
    directedBy: "mamãe",
    releaseYear: 2021,
  };

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then((conn) => conn.db('model_example'));

    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe('Quando é inserido com sucesso', () => {
    it('Retorna um objeto', async () => {
      const response = await MoviesModel.create(payloadMovie);

      expect(response).to.be.a('object');
    });

    it('tal objeto deve possuir o "id" do filme inserido', async () => {
      const response = await MoviesModel.create(payloadMovie);

      expect(response).to.have.a.property('id');
    });

    it('deve existir um filme com o título cadastrado', async () => {
      await MoviesModel.create(payloadMovie);
      const movieCreated = await connectionMock.collection('movies').findOne({ title: payloadMovie.title });

      expect(movieCreated).to.be.not.null;
    });
  });
});
