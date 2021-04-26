const workspaceRouter = require('express').Router();
const { Sequelize } = require('sequelize');
const reverse = require('reverse-geocode');
const sequelize = require('../postgres/index');

const { photosData: photos } = require('../placeholderData');
// const { cache, client } = require('../middleware');
const { WorkspaceLocation, LocationPointer } = require('../postgres/modelsMain');
require('../postgres/relationship');

const Op = Sequelize.Op;

// cache middleware taken out
workspaceRouter.get('/:workspaceId', async (req, res) => {
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

    // const photoIds = locationPointers.map((x) => x.workspaceId).join(',');
    // const cacheData = JSON.stringify({
    //   nearbyWorkspaces,
    //   photoIds,
    // });

    // client.setex(workspaceId, 14400, cacheData);

    res.status(200).json({
      origin,
      nearbyWorkspaces,
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
  req.body.longitude = Number(req.body.longitude);
  req.body.latitude = Number(req.body.latitude);

  try {
    const [{ uuid, longitude: long, latitude: lat }] = await
    LocationPointer.upsert({ ...req.body });

    // more accurate geo locating for fun
    // proves to be a bottleneck for stress test so commenting out for now
    // const revGeo = reverse.lookup(lat, long, 'us');

    const workspaceLocationGeoInfo = {
      workspaceId,
      // city: revGeo.city,
      // state: revGeo.state_abbr,
      // zipCode: revGeo.zipcode,
      locationPointerUuid: uuid,
    };

    const origin = await WorkspaceLocation.upsert({ ...workspaceLocationGeoInfo });

    // will need to uncomment the reverse geo object and send it back for api test to pass
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
