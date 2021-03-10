const workspaceRouter = require('express').Router();
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
workspaceRouter.get('/:workspaceId', async (req, res) => {
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
})

workspaceRouter.post('/:workspaceId', async (req, res) => {
  const origin = await WorkspaceLocation.create( { ...req.body })
  res.status(200).json({ origin });
})

workspaceRouter.put('/:workspaceId', async (req, res) => {
  const { workspaceId } = req.params;
  const origin = await WorkspaceLocation.findOneAndUpdate( { workspaceId }, { ...req.body }, { new: true });
  res.status(200).json({ origin });
});

workspaceRouter.delete('/:workspaceId', async (req, res) => {
  const { workspaceId } = req.params;
  const origin = await WorkspaceLocation.findOneAndRemove( { workspaceId });
  console.log('DELETE BOY', origin);
  res.status(200);
});


// return an error for non existing routes
// ALL @ *
const notFound = asyncHandler( async (req, res, next) => {
  const err = new Error('Endpoint does not exist');
  err.status = 404;
  throw err;
})

// return an simple response when errors thrown in endpoints
const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ success: false, status: err.status || 500, message: err.message});
};

module.exports = {
  workspaceRouter,
  notFound,
  errorHandler,
};