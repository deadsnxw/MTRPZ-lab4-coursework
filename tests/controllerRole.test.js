const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const sinon = require('sinon');
const { expect } = require('chai');
const db = require('../database');
const { getAllRoles, getRoleById } = require('../controllerRole');

// Ініціалізація Express додатку та роутерів
const app = express();
app.use(bodyParser.json());

const router = express.Router();
router.route('/roles').get(getAllRoles);
router.route('/roles/:id').get(getRoleById);
app.use('/', router);

describe('Role Routes', () => {
  let queryStub;

  beforeEach(() => {
    queryStub = sinon.stub(db, 'query');
  });

  afterEach(() => {
    queryStub.restore();
  });

  describe('getAllRoles', () => {
    it('GET /roles - should return all roles', async () => {
      const mockRoles = [
        { id: 1, name: 'User', description: 'Registered user, can get info about mentions' },
        { id: 2, name: 'Editor', description: 'Can do the same as the user, can edit data' },
        { id: 3, name: 'Admin', description: 'Can do the same as other, can give roles and can block users.' }
      ];
      
      queryStub.resolves([mockRoles]);

      const res = await request(app).get('/roles');

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(mockRoles);
    });
  });

  describe('getRoleById', () => {
    it('GET /roles/:id - should return the role with the specified ID', async () => {
      const mockRole = { id: 1, name: 'User', description: 'Registered user, can get info about mentions' };
      
      queryStub.resolves([[mockRole]]);

      const res = await request(app).get('/roles/1');

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal([mockRole]);
    });
  });
});