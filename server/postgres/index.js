const { Sequelize } = require('sequelize');

const user = 'munzmoses';
const host = 'localhost';
const database = 'workspacelocations';
const password = '';

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',
  logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log('SQL CONNECTED');
  })
  .catch((err) => {
    console.log(err, 'SQL FAILED TO CONNECT');
  });
