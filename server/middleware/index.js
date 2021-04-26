const redis = require('redis');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../', '.env') });

const client = redis.createClient({
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
});
const { photosData: photos } = require('../placeholderData');

const cache = (req, res, next) => {
  const { workspaceId } = req.params;
  client.get(workspaceId, (err, data) => {
    if (err) {
      res.status(err.status || 500)
        .send({ success: false, status: err.status || 500, message: err.message });
    } else if (data !== null) {
      const {
        origin,
        nearbyWorkspaces,
        photoIds,
      } = JSON.parse(data);
      res.status(200).json({
        origin,
        nearbyWorkspaces,
        photoIds,
        photos,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  client,
  cache,
};
