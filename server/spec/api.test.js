require('../postgres/relationship');
const supertest = require('supertest');
const db = require('../postgres');
const app = require('../server.js');

const request = supertest(app);
const server = app.listen(5001, () => console.log('Testing Server on PORT 5001'));

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  server.close();
  await db.close();
  // await connection.close();
});

describe('CRUD API Endpoints Tests', () => {
  // it('should Create a new record in the database where there is a POST request.', async (done) => {
  //   const sampleInput = {
  //     rawAddress: '226 Prospect St, South Haven, MI 49090, USA',
  //     workspaceId: 101,
  //   };

  //   const res = await request.post('/api/nearbyworkspaces/buildings/3')
  //     .send({ ...sampleInput })
  //     .set('Accept', 'application/json')
  //     .expect(200);

  //   expect(res.body.origin).toEqual(expect.objectContaining({ ...sampleInput }))
  //   done();
  // });

  it('should Read from database given a workspace id param.', async (done) => {
    const res = await request.get('/api/nearbyworkspaces/buildings/3');
    expect(res.status).toBe(200);
    done();
  });

  // it('should Update record given a workspace id param.', async (done) => {
  //   const sampleInput = {
  //     rawAddress: '10245 Briar Creek Lane, Carmel, IN 46033, USA',
  //     workspaceId: 101,
  //   };
  //   const workspaceId = 101;
  //   const res = await request.put(`/api/nearbyworkspaces/buildings/${workspaceId}`)
  //     .send({ ...sampleInput })
  //     .set('Accept', 'application/json')
  //     .expect(200);
  //   expect(res.body.origin).toEqual(expect.objectContaining({ ...sampleInput }))
  //   done();
  // });

  // it('should Delete record given a workspace id param.', async (done) => {
  //   const workspaceId = 101;
  //   const getRes = await request.get(`/api/nearbyworkspaces/buildings/${101}`);
  //   const delRes = await request.delete(`/api/nearbyworkspaces/buildings/${101}`);
  //   expect(getRes.status).toBe(200);
  //   expect(delRes.status).toBe(200);
  //   expect(getRes.body.origin).toEqual(expect.objectContaining({ ...delRes.body.origin }));
  //   done();
  // });
});
