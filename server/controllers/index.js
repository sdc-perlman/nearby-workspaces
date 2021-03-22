const workspaceRouter = require('express').Router();

const WorkspaceLocation = require('../db/models/WorkspaceLocation');

workspaceRouter.get('/:workspaceId', async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const origin = await WorkspaceLocation.findOne({ workspaceId });
    const nearbyWorkspaces = await WorkspaceLocation.find({
      geometry: {
        $near: {
          $geometry: origin.geometry,
          $maxDistance: 5000,
        },
      },
      workspaceId: { $ne: origin.workspaceId, $lte: 100, $gte: 1 },
    });
    res.status(200).json({ origin, nearbyWorkspaces });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500)
      .send({ success: false, status: err.status || 500, message: err.message });
  }
});

workspaceRouter.post('/:workspaceId', async (req, res) => {
  try {
    const origin = await WorkspaceLocation.create({ ...req.body });
    res.status(200).json({ origin });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500)
      .send({ success: false, status: err.status || 500, message: err.message });
  }
});

workspaceRouter.put('/:workspaceId', async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const origin = await WorkspaceLocation
      .findOneAndUpdate({ workspaceId }, { ...req.body }, { new: true });
    res.status(200).json({ origin });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500)
      .send({ success: false, status: err.status || 500, message: err.message });
  }
});

workspaceRouter.delete('/:workspaceId', async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const origin = await WorkspaceLocation.findOneAndRemove({ workspaceId });
    res.status(200).json({ origin });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500)
      .send({ success: false, status: err.status || 500, message: err.message });
  }
});

module.exports = workspaceRouter;
