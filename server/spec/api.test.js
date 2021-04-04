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
});

describe('CRUD API Endpoints Tests', () => {
  it('should Create a new record in the LocationPointers table based on coordinates which will update the WorkspaceLocations table with the correct location information.', async (done) => {
    const sampleLocationInput = {
      geog: {
        crs: { type: 'name', properties: { name: 'EPSG:4326' } },
        type: 'Point',
        coordinates: [-92.701, 35.5889],
      },
    };

    const reverseGeoInfo = {
      zipcode: '72141',
      state_abbr: 'AR',
      latitude: '35.519210',
      longitude: '-92.66488',
      city: 'Scotland',
      state: 'Arkansas',
      distance: 8.409921435637512,
    };

    const res = await request.post('/api/nearbyworkspaces/buildings/10000001')
      .send({ ...sampleLocationInput })
      .set('Accept', 'application/json')
      .expect(200);

    expect(res.body.revGeo).toEqual(expect.objectContaining({ ...reverseGeoInfo }));

    done();
  });

  it('should Read from database given a workspace id param.', async (done) => {
    const res = await request.get('/api/nearbyworkspaces/buildings/10000001');
    expect(res.status).toBe(200);
    done();
  });

  it('should Update record given a workspace id param.', async (done) => {
    const sampleWorkspaceLocationInput = {
      city: 'Fishers',
      state: 'IN',
      zipCode: '46037',
    };

    const workspaceId = 10000001;
    const res = await request.put(`/api/nearbyworkspaces/buildings/${workspaceId}`)
      .send({ ...sampleWorkspaceLocationInput })
      .set('Accept', 'application/json')
      .expect(200);

    expect(res.body.origin[1][0])
      .toEqual(expect.objectContaining({ ...sampleWorkspaceLocationInput }));

    done();
  });

  it('should Delete record given a workspace id param.', async (done) => {
    const workspaceId = 10000001;
    const delRes = await request.delete(`/api/nearbyworkspaces/buildings/${workspaceId}`);
    expect(delRes.status).toBe(200);
    expect(delRes.body.pgDel).toEqual(1);
    expect(delRes.body.redisDel).toEqual(true);
    done();
  });

  it('Deleted record should not be present.', async (done) => {
    const workspaceId = 10000001;
    const getRes = await request.get(`/api/nearbyworkspaces/buildings/${workspaceId}`);
    console.log(getRes.body);
    expect(getRes.status).toBe(500);

    done();
  });
});
