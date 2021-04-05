const redis = require('redis');

const client = redis.createClient(6379);

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
        allWorkspaceInfo,
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
