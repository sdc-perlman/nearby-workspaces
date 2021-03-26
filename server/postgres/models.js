const sequelize = require('./');
const { DataTypes, Model } = require('sequelize');

//WILL EVENTUALLY BREAK THIS OUT AS MY MAIN MODEL MAKE UP

class LocationPointer extends Model {}

LocationPointer.init({
  uuid: {
    type: DataTypes.UUID,
    allowNull: false
  },
  workspaceId: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  longitude: DataTypes.DECIMAL,
  latitude: DataTypes.DECIMAL,
}, {
  sequelize,
  timestamps: false,
});

//remove sequelize auto generated primary key for a faster seed
LocationPointer.removeAttribute('id');

class WorkspaceLocation extends Model {}

WorkspaceLocation.init({
  uuid: {
    type: DataTypes.UUID,
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
  locationPointerUuid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: false,
});

WorkspaceLocation.removeAttribute('id');


module.exports = {
  WorkspaceLocation,
  LocationPointer,
};