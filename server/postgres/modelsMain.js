const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('.');

// MAIN MODEL MAKE UP AFTER SEEDER IS COMPLETE

const LocationPointer = sequelize.define('LocationPointer', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  workspaceId: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  longitude: DataTypes.DOUBLE,
  latitude: DataTypes.DOUBLE,
}, {
  timestamps: false,
  indexes: [
    {
      name: 'locationPointerIndex',
      fields: ['workspaceId'],
      using: 'HASH',
    },
    {
      name: 'longitudeIndex',
      fields: ['longitude'],
      using: 'HASH',
    },
    {
      name: 'latitudeIndex',
      fields: ['latitude'],
      using: 'HASH',
    },
  ],
});

const WorkspaceLocation = sequelize.define('WorkspaceLocation', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
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
  amenities: {
    type: DataTypes.STRING,
    defaultValue: 'Not listed',
  },
  rate: {
    type: DataTypes.STRING,
    defaultValue: 'Not listed',
  },
  locationPointerUuid: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    references: {
      model: 'LocationPointers',
      key: 'uuid',
    },
    allowNull: false,
  },
}, {
  timestamps: false,
  indexes: [
    {
      name: 'workspaceLocationIndex',
      fields: ['workspaceId'],
      using: 'HASH',
    },
    {
      name: 'locationPointerFK_index',
      fields: ['locationPointerUuid'],
      using: 'HASH',
    },
  ],
});

module.exports = {
  WorkspaceLocation,
  LocationPointer,
};
