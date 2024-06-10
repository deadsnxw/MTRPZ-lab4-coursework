const { expect } = require('chai');
const sinon = require('sinon');
const db = require('../database');
const { createUser, deleteUser, updateUser } = require('../controllerUser');
const httpMocks = require('node-mocks-http');

describe('User Controller', () => {
  let queryStub;

  beforeEach(() => {
    queryStub = sinon.stub(db, 'query');
  });

  afterEach(() => {
    queryStub.restore();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/users',
        body: {
          nickname: 'testuser',
          email: 'testuser@example.com',
          password: 'password123',
          Role_id: 1
        }
      });
      const res = httpMocks.createResponse();
      
      const mockResult = { insertId: 1 };
      queryStub.resolves([mockResult]);

      await createUser(req, res);
      
      expect(res.statusCode).to.equal(200);
      expect(res._getJSONData()).to.deep.equal({ id: 1, nickname: 'testuser', email: 'testuser@example.com', password: 'password123', Role_id: 1 });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by id', async () => {
      const req = httpMocks.createRequest({
        method: 'DELETE',
        url: '/users/1',
        params: {
          id: 1
        }
      });
      const res = httpMocks.createResponse();
      
      queryStub.resolves();

      await deleteUser(req, res);

      expect(res.statusCode).to.equal(200);
      expect(res._getJSONData()).to.deep.equal({ id: 1, message: 'Користувач видалений успішно.' });
    });
  });

  describe('updateUser', () => {
    it('should update a user by id', async () => {
      const req = httpMocks.createRequest({
        method: 'PATCH',
        url: '/users/1',
        params: {
          id: 1
        },
        body: {
          nickname: 'updateduser'
        }
      });
      const res = httpMocks.createResponse();
      
      queryStub.resolves();

      await updateUser(req, res);

      expect(res.statusCode).to.equal(200);
      expect(res._getJSONData()).to.deep.equal({ id: 1, nickname: 'updateduser' });
    });
  });
});