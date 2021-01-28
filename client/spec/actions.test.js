require('@babel/preset-env');
require('@babel/polyfill');
const axios = require('axios');
const { nearbyResults, photo, amenities, description } = require('./data.js');
const { getWorkspaces, getWorkspaceInfo, getPhoto, getDescription, getAmenities } = require('../src/actions');

jest.mock('axios');
describe('unit test getWorkspaces', () => {

  it('fetches and returns an array of records', async (done) => {
    axios.get.mockImplementationOnce(() => Promise.resolve(nearbyResults));
    let pathname = '/buildings/1';
    const locations = await getWorkspaces(pathname);
    expect(Array.isArray(locations)).toBe(true);
    expect(locations.length).toBe(2);
    expect(locations[0].workspaceId).toBeDefined();
    done();
  });

});

describe('unit test getWorkspaceInfo', () => {

  it('returns an object for the given Id with 3 properties', async (done) => {
    const info = await getWorkspaceInfo(1);
    expect(info.description).toBeDefined();
    expect(info.photo).toBeDefined();
    expect(info.amenities).toBeDefined();
    done();
  });

});
