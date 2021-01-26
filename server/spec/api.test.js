const request = require('request');

const getBuildings = 'http://localhost:5001/nearbyworkspaces-api/buildings'
describe('api endpoints', () => {
  it('returns a workspaces location record by workspaceId property', (done) => {
    const options = {
      method: 'GET',
      uri: `http://localhost:5001/nearbyworkspaces-api/address/1`
    };
    request(options, (err, res, body) => {
      if (err) throw err;
      const address = JSON.parse(res.body);
      expect(address.workspaceId).toBe(1);
      done();
    })
  });

  it('returns an array of workspaces', (done) => {
    const options = {
      method: 'GET',
      uri: 'http://localhost:5001/nearbyworkspaces-api/buildings/1'
    };
    request(options, (err, res) => {
      if (err) throw err;
      const locations = JSON.parse(res.body);
      expect(locations.nearbyWorkspaces.length).toBe(2);
      done();
    });
  });

  it('handles errors', (done) => {
    const options = {
      method: 'GET',
      uri: 'http://localhost:5001/api/not-an-api'
    };
    request(options, (err, res) => {
      if (err) throw err;
      const error = JSON.parse(res.body);
      expect(error.message).toBe('Endpoint does not exist');
      expect(error.status).toBe(404);
      done();
    });
  });
});