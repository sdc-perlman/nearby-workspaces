const workspaceRouter = require('express').Router();
const { Sequelize } = require('sequelize');
const sequelize = require('../postgres/index');

const WorkspaceLocation = require('../db/models/WorkspaceLocation');
const dataStructuring = require('./dataStructuring');
// const { WorkspaceLocation, LocationPointer } = require('../postgres/modelsMain');
require('../postgres/relationship');

const Op = Sequelize.Op;

workspaceRouter.get('/:workspaceId', async (req, res) => {
  try {
    const { workspaceId } = req.params;
    // const { dataValues: origin, LocationPointer: { geog: { coordinates: [long, lat] } } } = await
    // WorkspaceLocation.findOne({ where: { workspaceId }, include: [LocationPointer] });
    // const [locationPointers] = await sequelize.query(`SELECT * FROM public."LocationPointers" ORDER BY geog <-> 'SRID=4326;POINT(${long} ${lat})' LIMIT 4 OFFSET 5000;`);
    // const nearbyWorkspaces = await WorkspaceLocation.findAll({
    //   where: {
    //     workspaceId: {
    //       [Op.in]: [...locationPointers.map((x) => x.workspaceId)],
    //     },
    //   },
    // });
    // const finalData = dataStructuring(origin, locationPointers, nearbyWorkspaces);
    const origin = await WorkspaceLocation.findOne({ workspaceId });

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
    // console.log(finalData);
    // res.status(200).json({ origin, nearbyWorkspaces });
    res.status(200).send();
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
