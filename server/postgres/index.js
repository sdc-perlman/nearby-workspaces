const { Sequelize } = require('sequelize');

const user = 'munzmoses';
const host = 'localhost';
const database = 'workspacelocations';
const password = '';

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
