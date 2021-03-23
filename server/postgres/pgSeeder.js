const fs = require('fs').promises;
const path = require('path');
const argv = require('yargs').argv;
const sequelize = require('.');
require('./models');
const generatePgData = require('./generatePgData');

const lines = argv.lines || 100000;
const workspaceLocationsFile = './dataFiles/workspaceLocations.csv';
const locationPointersFile = './dataFiles/locationPointers.csv';
const batchSize = 100000;

sequelize.sync({ force: true })
  .then(() => {
    console.log('MODELS CONNECTED');
    (async () => {
      await fs.mkdir('dataFiles')
        .catch((err) => {
          console.log('Please remove dataFiles directory before continuing. Use: \n"node removeDataFiles.js"');
          process.exit();
        });
      let workspaceLocations = '';
      let locationPointers = '';
      let batch = 0;
      for (let i = 1; i <= lines; i++) {
        const { workspaceLocationsData, locationPointersData } = generatePgData(i);
        workspaceLocations += workspaceLocationsData;
        locationPointers += locationPointersData;
        batch++;
        if (batch === batchSize) {
          try {
            await fs.writeFile(workspaceLocationsFile, workspaceLocations);
            await fs.writeFile(locationPointersFile, locationPointers);
            const rawQuery1 = `COPY public."LocationPointers" ("uuid","workspaceId","geog") FROM '${path.join(__dirname, './dataFiles/locationPointers.csv')}' WITH DELIMITER AS '|';`;
            const rawQuery2 = `COPY public."WorkspaceLocations" ("uuid","workspaceSlug","workspaceId","rawAddress","formattedAddress","streetName","streetNumber","neighborhood","city","state","country","countryCode","zipCode","locationPointerUuid") FROM '${path.join(__dirname, './dataFiles/workspaceLocations.csv')}' WITH DELIMITER AS '|';`;
            await sequelize.query(rawQuery1);
            await sequelize.query(rawQuery2);
          } catch (err) {
            console.log('Error', err);
            process.exit();
          }
          workspaceLocations = '';
          locationPointers = '';
          batch = 0;
        }
      }
      console.log('Seeding Complete');
      process.exit();
    })();
  })
  .catch((err) => {
    console.log(err, 'MODELS NOT SYNCED');
    process.exit();
  });
