const path = require('path');
require('dotenv').config();
const { connect, connection } = require('mongoose');

connection.on('error', console.error.bind(console, 'mongoose connection error:'));

connection.once('open', () => {
  console.log('successfully connected to mongoose');
});

connect(process.env.MONGO_URI_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});