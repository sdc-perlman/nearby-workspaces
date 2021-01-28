const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../', '.env')});
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();
require('./db');
const { getAddress, getNearbyBuildings, notFound, errorHandler} = require('./controllers');

app.use(morgan('dev'));
app.use(cors());

app.use('/', express.static(path.join(__dirname, '../', 'client', 'dist')));

app.use('/buildings/:workspaceId', express.static(path.join(__dirname, '../', 'client', 'dist')));

app.get('/nearbyworkspaces-api/buildings/:workspaceId', getNearbyBuildings);

app.get('/nearbyworkspaces-api/address/:workspaceId', getAddress);

app.use('*', notFound);

app.use(errorHandler);

app.listen(process.env.PORT, () => console.log('app works'));

