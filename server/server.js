const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../', '.env')});
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();
const axios = require('axios');
require('./db');
const { getAddress, getNearbyBuildings, notFound, errorHandler} = require('./controllers');
const placeholderData = require('./placeholderData');

app.use(morgan('dev'));
app.use(cors());

app.use('/', express.static(path.join(__dirname, '../', 'client', 'dist')));

app.use('/buildings/:workspaceId', express.static(path.join(__dirname, '../', 'client', 'dist')));

app.get('/api/nearbyworkspaces/buildings/:workspaceId', getNearbyBuildings);

app.get('/api/nearbyworkspaces/address/:workspaceId', getAddress);

app.get('/workspace-api/workspace/:id', async (req, res) => {
  res.json(placeholderData.workplaceData);
})

app.get('/api/workspace-description/:id', async (req, res) => {
  res.json(placeholderData.workplaceDescriptionData);
});

app.get('/api/photos/:id', async (req, res) => {
  //keeping this code around since becky has this service
  // const { id } = req.params;
  // const API = `http://localhost:6001/api/photos/${id}`;
  // try {
  //   const{ data } = await axios.get(API);
  //     res.json(data);
  // } catch (error) {
  //   res.status(404).json();
  // }
  res.json(placeholderData.photosData);
});

app.get('/amenities-api/amenity/:id', async (req, res) => {
  res.json(placeholderData.amenitiesData);
});

app.use('*', notFound);

app.use(errorHandler);

exports.server = app.listen(process.env.PORT || 5001, () => console.log('app works'));
exports.app = app;
