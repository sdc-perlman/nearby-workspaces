const workspaceRouter = require('express').Router();
const { Sequelize } = require('sequelize');
const reverse = require('reverse-geocode');
const sequelize = require('../postgres/index');

const { allWorkspaceInfo, photosData: photos } = require('../placeholderData');
const { cache, client } = require('../middleware');
const { WorkspaceLocation, LocationPointer } = require('../postgres/modelsMain');
require('../postgres/relationship');

const Op = Sequelize.Op;

workspaceRouter.get('/:workspaceId', cache, async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { dataValues: origin, LocationPointer: { longitude, latitude } } = await
    WorkspaceLocation.findOne({ where: { workspaceId }, include: [LocationPointer] });

    const [locationPointers] = await sequelize.query(`
      SELECT * FROM public."LocationPointers"
      WHERE earth_box(ll_to_earth(${latitude}, ${longitude}), 160934.4) @> ll_to_earth(latitude, longitude)
      LIMIT 4;`);

    const nearbyWorkspaces = await WorkspaceLocation.findAll({
      where: {
        workspaceId: {
          [Op.in]: [...locationPointers.map((x) => x.workspaceId)],
        },
      },
    });

    const photoIds = locationPointers.map((x) => x.workspaceId).join(',');
    const cacheData = JSON.stringify({
      origin,
      nearbyWorkspaces,
      photoIds,
    });

    client.setex(workspaceId, 3600, cacheData);

    res.status(200).json({
      origin,
      nearbyWorkspaces,
      allWorkspaceInfo,
      photos,
    });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500)
      .send({ success: false, status: err.status || 500, message: err.message });
  }
});

workspaceRouter.post('/:workspaceId', async (req, res) => {
  const { workspaceId } = req.params;
  req.body.workspaceId = workspaceId;
  try {
    const { uuid, longitude: long, latitude: lat } = await
    LocationPointer.create({ ...req.body });

    const revGeo = reverse.lookup(lat, long, 'us');
    const workspaceLocationGeoInfo = {
      workspaceId,
      city: revGeo.city,
      state: revGeo.state_abbr,
      zipCode: revGeo.zipcode,
      locationPointerUuid: uuid,
    };

    const origin = await WorkspaceLocation.create({ ...workspaceLocationGeoInfo });

    res.status(200).json({ origin, revGeo });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500)
      .send({ success: false, status: err.status || 500, message: err.message });
  }
});

workspaceRouter.put('/:workspaceId', async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { uuid } = await LocationPointer.findOne({ where: { workspaceId } });
    const origin = await WorkspaceLocation.update(
      { ...req.body, locationPointerUuid: uuid },
      { returning: true, where: { workspaceId } },
    );
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
    const pgDel = await LocationPointer.destroy({ where: { workspaceId } });
    const redisDel = client.del(workspaceId);
    res.status(200).json({ pgDel, redisDel });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500)
      .send({ success: false, status: err.status || 500, message: err.message });
  }
});

module.exports = workspaceRouter;
