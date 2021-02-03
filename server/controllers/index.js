const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const WorkspaceLocation = require('../db/models/WorkspaceLocation');

// throw error if record doesnt exist
const checkRecord = (record) => {
  if (!record) {
    const err = new Error('No record associated to this id');
    err.status = 404;
    throw err;
  }
}

// return a single record based on req.param.workspaceId
// GET @ /nearbyworkspaces-api/address/:workspaceId
exports.getAddress = asyncHandler( async (req, res, next) => {
  const { workspaceId } = req.params;
  const workspaceLocation = await WorkspaceLocation.findOne({workspaceId});

  checkRecord(workspaceLocation);

  res.status(200).json(workspaceLocation);

});

// return a single record based on req.param.workspaceId
// GET @ /nearbyworkspaces-api/buildings/:workspaceId
exports.getNearbyBuildings = asyncHandler( async (req, res, next) => {
  const { workspaceId } = req.params;
  const origin = await WorkspaceLocation.findOne({ workspaceId });

  checkRecord(origin);

  const nearbyWorkspaces = await WorkspaceLocation.find({
    geometry: {
      $near: {
        $geometry: origin.geometry,
        $maxDistance: 5000
      }
    },
    workspaceId: { $ne: origin.workspaceId, $lte: 100, $gte: 1 }
  });

  res.status(200).json({ origin, nearbyWorkspaces });

});

// return an error for non existing routes
// ALL @ *
exports.notFound = asyncHandler( async (req, res, next) => {
  const err = new Error('Endpoint does not exist');
  err.status = 404;
  throw err;
})

// return an simple response when errors thrown in endpoints
exports.errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ success: false, status: err.status || 500, message: err.message});
};
