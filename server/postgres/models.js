const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('./');

const WorkspaceLocation = sequelize.define('WorkspaceLocation', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  workspaceSlug: {
    type: DataTypes.STRING,
  },
  workspaceId: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  rawAddress: {
    type: DataTypes.STRING,
    defaultValue: 'Not listed',
  },
}, {
  sequelize,
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['workspaceId'],
    }
  ],
});


const LocationPointer = sequelize.define('LocationPointer', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  workspaceId: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  geo: DataTypes.GEOMETRY('POINT'),
  workspaceLocation_id: {
    type: DataTypes.UUID,
    references: {
      model: 'WorkspaceLocations',
      key: 'uuid',
    },
    allowNull: false,
  }
}, {
  sequelize,
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['workspaceId'],
    }
  ],
});


module.exports = {
  WorkspaceLocation,
  LocationPointer,
};