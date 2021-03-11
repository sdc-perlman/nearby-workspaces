const { DataTypes, Sequelize } = require('sequelize');
const faker = require('faker');
const sequelize = require('./');

const point = { type: 'Point', coordinates: [faker.address.longitude(), faker.address.latitude()]};

const WorkspaceLocation = sequelize.define('WorkspaceLocation', {
  workspace: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  workspaceSlug: {
    type: DataTypes.STRING,
  },
  workspaceId: {
    type: DataTypes.INTEGER,
  },
  rawAddress: {
    type: DataTypes.STRING,
    defaultValue: 'Not listed',
  },
  geometry: point,
},
{ freezeTableName: true });

sequelize.sync({ force: true })
  .then(() => {
    console.log('MODELS SYNCED');
  })
  .catch((err) => {
    console.log(err, 'MODELS NOT SYNCED');
  });

module.exports = WorkspaceLocation;