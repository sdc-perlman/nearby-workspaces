const supertest = require('supertest');
const { connect, connection } = require('mongoose');
require('dotenv').config();
const app = require('../server.js');
const WorkspaceLocation = require('../db/models/WorkspaceLocation');

const request = supertest(app);

afterAll(async () => {
  await connection.close();
});

describe('CRUD API Endpoints Tests', () => {
  it('should Create a new record in the database where there is a POST request.', async (done) => {
    const workspaceId = 3;
    const res = await request.get(`/api/nearbyworkspaces/buildings/${workspaceId}`);
    console.log(res.body);
    expect(res.status).toBe(200);
    done();
  })
  it('should Read from database given the workspace id param.', async (done) => {
    const workspaceId = 3;
    const res = await request.get(`/api/nearbyworkspaces/buildings/${workspaceId}`);
    console.log(res.body);
    expect(res.status).toBe(200);
    done();
  })
})

/*
{
  origin: {
    rawAddress: '3501 S La Cienega Blvd, Los Angeles, CA 90016, USA',
    coordinates: [ 34.0239993, -118.3727473 ],
    formattedAddress: '3501 S La Cienega Blvd, Los Angeles, CA 90016, USA',
    streetName: 'South La Cienega Boulevard',
    streetNumber: '3501',
    neighborhood: 'South Los Angeles',
    city: 'Los Angeles',
    state: 'CA',
    country: 'United States',
    countryCode: 'US',
    zipcode: '90016',
    _id: 6046e06de95fc2766e7bcc72,
    geometry: {
      type: 'Point',
      coordinates: [Array],
      _id: 6046e06de95fc2766e7bcc73
    },
    workspaceId: 6,
    workspaceSlug: 'pork-belly',
    workspace: 60413d3e9faa4f2b45e812bb,
    __v: 0
  },
  nearbyWorkspaces: [
    {
      rawAddress: '2838 Crenshaw Blvd, Los Angeles, CA 90016, USA',
      coordinates: [Array],
      formattedAddress: '2838 Crenshaw Blvd, Los Angeles, CA 90016, USA',
      streetName: 'Crenshaw Boulevard',
      streetNumber: '2838',
      neighborhood: 'South Los Angeles',
      city: 'Los Angeles',
      state: 'CA',
      country: 'United States',
      countryCode: 'US',
      zipcode: '90016',
      _id: 6046e06de95fc2766e7bcc74,
      geometry: [Object],
      workspaceId: 5,
      workspaceSlug: 'lo-fi-seitan',
      workspace: 60413d3e9faa4f2b45e812ba,
      __v: 0
    },
    {
      rawAddress: '1231 South La Brea Ave, Los Angeles, CA 90019, USA',
      coordinates: [Array],
      formattedAddress: '1231 South La Brea Ave, Los Angeles, CA 90019, USA',
      streetName: 'South La Brea Avenue',
      streetNumber: '1231',
      neighborhood: 'Mid City',
      city: 'Los Angeles',
      state: 'CA',
      country: 'United States',
      countryCode: 'US',
      zipcode: '90019',
      _id: 6046e06de95fc2766e7bcc76,
      geometry: [Object],
      workspaceId: 7,
      workspaceSlug: 'master-cleanse',
      workspace: 60413d3e9faa4f2b45e812bc,
      __v: 0
    },
    {
      rawAddress: '6345 Wilshire Blvd, Los Angeles, CA 90048, USA',
      coordinates: [Array],
      formattedAddress: '6345 Wilshire Blvd, Los Angeles, CA 90048, USA',
      streetName: 'Wilshire Boulevard',
      streetNumber: '6345',
      neighborhood: 'Central LA',
      city: 'Los Angeles',
      state: 'CA',
      country: 'United States',
      countryCode: 'US',
      zipcode: '90048',
      _id: 6046e06de95fc2766e7bcc7a,
      geometry: [Object],
      workspaceId: 8,
      workspaceSlug: 'deep',
      workspace: 60413d3e9faa4f2b45e812bd,
      __v: 0
    }
  ]
}
*/
