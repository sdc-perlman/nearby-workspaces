const { Sequelize } = require('sequelize');

const user = process.env.PG_USER || 'munzmoses';
const host = process.env.HOST || 'localhost';
const database = process.env.PG_DB || 'workspacelocations';
const password = process.env.PG_PASSWORD || '';

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
