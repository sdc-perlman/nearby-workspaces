require('../');
const axios = require('axios');
const path = require('path')
const fs = require('fs');
const WorkspaceLocation = require('../models/WorkspaceLocation');
const descriptionService = `${process.env.DESCRIPTION_API || 'http://localhost:6060'}/api/workspace-descriptions`;

//read geojson files and parse into arrays
const data1 = JSON.parse(fs.readFileSync(path.resolve(__dirname, './geojsonData1.json')));

const data2 = JSON.parse(fs.readFileSync(path.resolve(__dirname, './geojsonData2.json')));

const data3 = JSON.parse(fs.readFileSync(path.resolve(__dirname, './geojsonData3.json')));

// concatenate data into one array
const addresses = [...data1, ...data2, ...data3];

// get workspace descriptions
const getDescriptions = async () => {
  const descriptions = await axios.get(descriptionService);
  return descriptions;
}

// map addresses into shape of WorkspaceLocation schema
const prepLocations = addresses.map((geojson) => {
  const { 
    streetName, streetNumber, city, formattedAddress, countryCode,
    extra: { neighborhood }, latitude, longitude, country, zipcode,
    administrativeLevels: { level1short }
  } = geojson;
  return {
    rawAddress: formattedAddress,
    formattedAddress,
    neighborhood,
    streetName, 
    streetNumber,
    city,
    state: level1short,
    country,
    countryCode,
    zipcode,
    geometry: {
      coordinates: [longitude, latitude]
    },
    coordinates: [latitude, longitude]
  };
});

// create records based on addresses
const createLocations = async () => {
  const { data } = await getDescriptions();

  const workspaceLocations = data.map((desc) => {
    let record = prepLocations[desc.id];
    const { id, url, _id } = desc;
    return {
      ...record,
      workspaceId: id,
      workspaceSlug: url,
      workspace: _id
    };
  });

  const records = await WorkspaceLocation.create(workspaceLocations);
  console.log(`${records.length} records created`);
  process.exit();
};

// clear collection
const deleteLocations = async () => {
  await WorkspaceLocation.deleteMany({});
  console.log(`Workspace locations deleted`);
};

// accept command line arguments and process request
const seed = async () => {
  try {
    await deleteLocations();
    await createLocations();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

seed();

