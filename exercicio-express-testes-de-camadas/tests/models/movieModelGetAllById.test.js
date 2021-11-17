const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const MoviesModel = require('../../models/movieModel');
const { expect } = require('chai');

describe('Busa filme pelo id', () => {
  const DBServer = new MongoMemoryServer();
  let connectionMock;

  const payloadMovie = {
    title: 'Example Movie',
    directedBy: 'Jane Dow',
    releaseYear: 1999,
  }

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

  describe('quando o filme com o id inserido não existe', () => {
    it('retorna um bolean', async () => {
      const response = await MoviesModel.getById('61957e8b8047c6ef0dfa45ce');

      expect(response).to.be.a('boolean');
    });
  });

  describe('quando o filme com o id inserido existe', async () => {
    
    it('Deve ser retornado um objeto', async () => {
      const { id } = await MoviesModel.create(payloadMovie);
      console.log(id);
      const response = await MoviesModel.getById(id);
      expect(response).to.be.a('object');
    })

    it('O objeto deve conter os detalhes do filme', async () => {
      const { id } = await MoviesModel.create(payloadMovie);
      const response = await MoviesModel.getById(id);
      expect(response).to.have.property('title');
      expect(response).to.have.property('directedBy');
      expect(response).to.have.property('releaseYear');
    });
  });
});
