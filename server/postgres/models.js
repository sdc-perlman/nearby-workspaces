const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('./');

const WorkspaceLocation = sequelize.define('WorkspaceLocation', {
  uuid: {
    type: DataTypes.UUID,
    // defaultValue: Sequelize.UUIDV4,
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
  formattedAddress: {
    type: DataTypes.STRING,
    defaultValue: 'Not listed',
  },
  streetName: {
    type: DataTypes.STRING,
    defaultValue: 'Not listed',
  },
  streetNumber: {
    type: DataTypes.STRING,
    defaultValue: 'Not listed',
  },
  neighborhood: {
    type: DataTypes.STRING,
    defaultValue: 'Not listed',
  },
  city: {
    type: DataTypes.STRING,
    defaultValue: 'Not listed',
  },
  state: {
    type: DataTypes.STRING,
    defaultValue: 'Not listed',
  },
  country: {
    type: DataTypes.STRING,
    defaultValue: 'Not listed',
  },
  countryCode: {
    type: DataTypes.STRING,
    defaultValue: 'Not listed',
  },
  zipCode: {
    type: DataTypes.STRING,
    defaultValue: 'Not listed',
  },
}, {
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
    // defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  workspaceId: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  longitude: DataTypes.DECIMAL,
  latitude: DataTypes.DECIMAL,
  // eslint-disable-next-line camelcase
  workspaceLocation_id: {
    type: DataTypes.UUID,
    references: {
      model: 'WorkspaceLocations',
      key: 'uuid',
    },
    allowNull: false,
  },
}, {
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