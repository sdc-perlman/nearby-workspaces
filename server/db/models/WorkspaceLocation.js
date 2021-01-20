const mongoose = require('mongoose');

const pointSchema = mongoose.Schema({
  type: {type: String, default: 'Point'},
  coordinates: {type: [Number]}
});

const workspaceLocationSchema = mongoose.Schema({
  workspaceSlug: String,
  workspaceId: {
    type: Number,
    required: true
  },
  rawAddress: {
    type: String,
    required: true,
    default: 'Not listed'
  },
  geometry: pointSchema,
  coordinates: [Number],
  formattedAddress: {
    type: String,
    default: 'Not listed'
  },
  streetName: {
    type: String,
    default: 'Not listed'
  },
  streetNumber: {
    type: String,
    default: 'Not listed'
  },
  neighborhood: {
    type: String, 
    default: 'Not listed'
  },
  city: {
    type: String, 
    default: 'Not listed'
  },
  state: {
    type: String, 
    default: 'Not listed'
  },
  country: {
    type: String, 
    default: 'Not listed'
  },
  countryCode: {
    type: String, 
    default: 'Not listed'
  },
  zipcode: {
    type: String, 
    default: 'Not listed'
  }
});

workspaceLocationSchema.index({geometry: '2dsphere'});

module.exports = mongoose.model('WorkspaceLocation', workspaceLocationSchema);