const axios = require('axios');
const workspaceRouter = require('express').Router();
const { Sequelize } = require('sequelize');
const reverse = require('reverse-geocode');
const sequelize = require('../postgres/index');

const { allWorkspaceInfo, photosData: photos } = require('../placeholderData');
const { WorkspaceLocation, LocationPointer } = require('../postgres/modelsMain');
require('../postgres/relationship');

const Op = Sequelize.Op;

workspaceRouter.get('/:workspaceId', async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { dataValues: origin, LocationPointer: { geog: { coordinates: [long, lat] } } } = await
    WorkspaceLocation.findOne({ where: { workspaceId }, include: [LocationPointer] });

    const [locationPointers] = await sequelize.query(`SELECT * FROM public."LocationPointers" ORDER BY geog <-> 'SRID=4326;POINT(${long} ${lat})' LIMIT 4 OFFSET 5000;`);
    const nearbyWorkspaces = await WorkspaceLocation.findAll({
      where: {
        workspaceId: {
          [Op.in]: [...locationPointers.map((x) => x.workspaceId)],
        },
      },
    });

    // const { data: photos } = await axios.get(`http://localhost:5001/api/photos/${workspaceId}?ids=${locationPointers.map((x) => x.workspaceId).join(',')}`);
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

workspaceRouter.post('/', async (req, res) => {
  try {
    const { uuid, workspaceId, geog: { coordinates: [long, lat] } } = await
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
    const origin = await LocationPointer.destroy({ where: { workspaceId } });
    console.log(origin);
    res.status(200).json({ origin });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500)
      .send({ success: false, status: err.status || 500, message: err.message });
  }
});

// artillery test

workspaceRouter.get('/artillery/:workspaceId', async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const { dataValues: origin } = await
    WorkspaceLocation.findOne({ where: { workspaceId }, include: [LocationPointer] });

    // eslint-disable-next-line max-len
    // const [locationPointers] = await sequelize.query(`SELECT * FROM public."LocationPointers" ORDER BY geog <-> 'SRID=4326;POINT(${long} ${lat})' LIMIT 4 OFFSET 5000;`);
    // const nearbyWorkspaces = await WorkspaceLocation.findAll({
    //   where: {
    //     workspaceId: {
    //       [Op.in]: [...locationPointers.map((x) => x.workspaceId)],
    //     },
    //   },
    // });

    // const { data: photos } = await axios.get(`http://localhost:5001/api/photos/${workspaceId}?ids=${locationPointers.map((x) => x.workspaceId).join(',')}`);
    res.status(200).json({
      origin,
    });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500)
      .send({ success: false, status: err.status || 500, message: err.message });
  }
});

workspaceRouter.post('/artillery/:workspaceId', async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const locationInput = {
      workspaceId,
      geog: {
        crs: { type: 'name', properties: { name: 'EPSG:4326' } },
        type: 'Point',
        coordinates: [
          parseFloat(req.body.long),
          parseFloat(req.body.lat)],
      },
    };
    const [{ uuid, geog: { coordinates: [long, lat] } }] = await
    LocationPointer.upsert({ ...locationInput }, { where: { workspaceId } });

    const revGeo = reverse.lookup(lat, long, 'us');
    const workspaceLocationGeoInfo = {
      workspaceId,
      city: revGeo.city,
      state: revGeo.state_abbr,
      zipCode: revGeo.zipcode,
      locationPointerUuid: uuid,
    };

    const origin = await WorkspaceLocation.upsert(
      { ...workspaceLocationGeoInfo },
      { where: { workspaceId } },
    );

    res.status(200).json({ origin, revGeo });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500)
      .send({ success: false, status: err.status || 500, message: err.message });
  }
});

module.exports = workspaceRouter;
