const artilleryRouter = require('express').Router();
const { Sequelize } = require('sequelize');
const reverse = require('reverse-geocode');
const sequelize = require('../../server/postgres');

const { allWorkspaceInfo, photosData: photos } = require('../../server/placeholderData');
const { getCache, postCache, client } = require('./middleware');
const { WorkspaceLocation, LocationPointer } = require('../../server/postgres/modelsMain');
require('../../server/postgres/relationship');

const Op = Sequelize.Op;

artilleryRouter.get('/:workspaceId', getCache, async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { dataValues: origin, LocationPointer: { geog: { coordinates: [long, lat] } } } = await
    WorkspaceLocation.findOne({ where: { workspaceId }, include: [LocationPointer] });

    const [locationPointers] = await sequelize.query(`SELECT * FROM public."LocationPointers" ORDER BY geog <-> 'SRID=4326;POINT(${long} ${lat})' LIMIT 4;`);
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

    client.setex(`get-${workspaceId}`, 3600, cacheData);

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

artilleryRouter.post('/artillery/:workspaceId', postCache, async (req, res) => {
  const { workspaceId } = req.params;
  req.body.workspaceId = workspaceId;
  if (!req.body.geog) {
    req.body.geog = {
      crs: { type: 'name', properties: { name: 'EPSG:4326' } },
      type: 'Point',
      coordinates: [Number(req.body.long), Number(req.body.lat)],
    };
  }
  try {
    const [{ uuid, geog: { coordinates: [long, lat] } }] = await
    LocationPointer.upsert({ ...req.body });
    const revGeo = reverse.lookup(lat, long, 'us');
    const workspaceLocationGeoInfo = {
      workspaceId,
      city: revGeo.city,
      state: revGeo.state_abbr,
      zipCode: revGeo.zipcode,
      locationPointerUuid: uuid,
    };

    const origin = await WorkspaceLocation.upsert({ ...workspaceLocationGeoInfo });

    const cacheData = JSON.stringify({
      origin,
      revGeo,
    });

    client.setex(`post-${workspaceId}`, 3600, cacheData);

    res.status(200).json({ origin, revGeo });
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(err.status || 500)
      .send({ success: false, status: err.status || 500, message: err.message });
  }
});

module.exports = artilleryRouter;
