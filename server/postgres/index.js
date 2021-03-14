const { Sequelize } = require('sequelize');

const user = 'munzmoses';
const host = 'localhost';
const database = 'workspacelocations';
const password = '';

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => {
    console.log('POSTGRES CONNECTED');
  })
  .catch((err) => {
    console.log(err, 'POSTGRES FAILED TO CONNECT');
  });

module.exports = sequelize;
