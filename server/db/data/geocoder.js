const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '../', '../', '.env')});
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',
  apiKey: process.env.GOOGLE_API_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;