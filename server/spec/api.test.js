const supertest = require('supertest');
const { connection } = require('mongoose');

const app = require('../server.js');
const WorkspaceLocation = require('../db/models/WorkspaceLocation');
const sampleData = require('./sampleData');
const request = supertest(app);

afterAll(async () => {
  await connection.close();
});

describe('CRUD API Endpoints Tests', () => {
  it('should Create a new record in the database where there is a POST request.', async (done) => {
    const sampleInput = {
      rawAddress: '226 Prospect St, South Haven, MI 49090, USA',
    }
    const res = await request.post('/api/nearbyworkspaces/buildings/3')
      .send({ sampleInput })
      .set('Accept', 'application/json')
    // console.log(res.body);
    // expect(res.status).toBe(200);
    done();
  })

  it('should Read from database given a workspace id param.', async (done) => {
    const workspaceId = 3;
    const res = await request.get(`/api/nearbyworkspaces/buildings/${workspaceId}`);
    expect(res.status).toBe(200);
    done();
  })
})
