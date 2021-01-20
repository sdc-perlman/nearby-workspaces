const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../', '../', '.env')});
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});