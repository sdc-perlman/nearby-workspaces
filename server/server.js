const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../', '.env')});
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();
const axios = require('axios');
require('./db');
const { getAddress, getNearbyBuildings, notFound, errorHandler} = require('./controllers');

app.use(morgan('dev'));
app.use(cors());

app.use('/', express.static(path.join(__dirname, '../', 'client', 'dist')));

app.use('/buildings/:workspaceId', express.static(path.join(__dirname, '../', 'client', 'dist')));

app.get('/api/nearbyworkspaces/buildings/:workspaceId', getNearbyBuildings);

app.get('/api/nearbyworkspaces/address/:workspaceId', getAddress);

app.get('/workspace-api/workspace/:id', async (req, res) => {
  const { id } = req.params;
  const API = `${process.env.WORKSPACE_API || `http://localhost:4000`}/workspace-api/workspace/${id}`;
  console.log(API)
  try {
    const { data } = await axios.get(API);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json(err);
  }

})

app.get('/api/workspace-description/:id', async (req, res) => {
  const { id } = req.params;
  const API = `${process.env.DESCRIPTION_API || `http://localhost:6060`}/api/workspace-description/${id}`;
  try {
    const{ data } = await axios.get(API);
    res.json(data);
  } catch (error) {
    res.status(404).json();
  }
});

app.get('/api/photos/:id', async (req, res) => {
  const { id } = req.params;
  const API = `http://localhost:6001/api/photos/${id}`;
  try {
    const{ data } = await axios.get(API);
    // console.log('PHOTOS', data);
    res.json(data);
  } catch (error) {
    res.status(404).json();
  }
});

app.get('/amenities-api/amenity/:id', async (req, res) => {
  const { id } = req.params;
  const API = `${process.env.PHOTOS_API || `http://localhost:4002`}/amenities-api/amenity/${id}`;
  try {
    const{ data } = await axios.get(API);
    // console.log('Amenities Data', data);
    res.json(data);
  } catch (error) {
    res.status(404).json();
  }
});

app.use('*', notFound);

app.use(errorHandler);

exports.server = app.listen(process.env.PORT || 5001, () => console.log('app works'));
exports.app = app;
