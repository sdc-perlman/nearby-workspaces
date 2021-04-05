const redis = require('redis');
const { allWorkspaceInfo, photosData: photos } = require('../../../server/placeholderData');

const client = redis.createClient(6379);

const getCache = (req, res, next) => {
  const { workspaceId } = req.params;
  client.get(`get-${workspaceId}`, (err, data) => {
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
        allWorkspaceInfo,
        photos,
      });
    } else {
      next();
    }
  });
};

const postCache = (req, res, next) => {
  const { workspaceId } = req.params;
  client.get(`post-${workspaceId}`, (err, data) => {
    if (err) {
      res.status(err.status || 500)
        .send({ success: false, status: err.status || 500, message: err.message });
    } else if (data !== null) {
      const {
        origin,
        revGeo,
      } = JSON.parse(data);
      res.status(200).json({
        origin,
        revGeo,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  client,
  getCache,
  postCache,
};
