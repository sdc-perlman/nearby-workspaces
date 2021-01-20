require('../');
const fs = require('fs');
const WorkspaceLocation = require('../models/WorkspaceLocation');

//read geojson files and parse into arrays
const data1 = JSON.parse(fs.readFileSync('./geojsonData1.json'));
const data2 = JSON.parse(fs.readFileSync('./geojsonData2.json'));
const data3 = JSON.parse(fs.readFileSync('./geojsonData3.json'));

// concatenate data into one array
const addresses = [...data1, ...data2, ...data3];

// map addresses into shape of WorkspaceLocation schema
const prepLocations = addresses.map((geojson, i) => {
  const { 
    streetName, streetNumber, city, formattedAddress, countryCode,
    extra: { neighborhood }, latitude, longitude, country, zipcode,
    administrativeLevels: { level1short }
  } = geojson;
  return {
    workspaceSlug: `workspace-${i}`,
    workspaceId: i,
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
  const locations = await WorkspaceLocation.create(prepLocations);
  console.log(`${locations.length} records generated`);
  process.exit();
};

// clear collection
const deleteLocations = async () => {
  await WorkspaceLocation.deleteMany({});
  console.log(`Workspace locations deleted`);
  process.exit();
};

// accept command line arguments and process request
const seed = async () => {
  try {
    const option = process.argv[2];
    switch(option) {
      case '-g':
        await createLocations();
      case '-d': 
        await deleteLocations();
      default:
        console.log(
          `\tUnknown command. \n\trun 'node seeder.js -g' to generate records\n\tor 'node seeder.js -d' to clear existing WorkspaceLocations collection`
        );
    }
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }

}

seed();
