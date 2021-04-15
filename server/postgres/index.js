const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../', '.env') });

const user = process.env.PG_USER;
const host = process.env.HOST;
const database = process.env.PG_DB;
console.log(database);
const password = process.env.PG_PASSWORD;

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('SEQUELIZE CONNECTED TO POSTGRES');
  })
  .catch((err) => {
    console.log(err, 'SEQUELIZE FAILED TO CONNECTED TO POSTGRES');
  });

module.exports = sequelize;
