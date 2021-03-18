const sequelize = require('./');
require('./relationship');
const generatePgData = require('./generatePgData');
const fs = require('fs').promises;
const argv = require('yargs').argv;

const lines = argv.lines || 1000000;
const workspaceLocationsFile = './dataFiles/workspaceLocations.csv';
const locationPointersFile = './dataFiles/locationPointers.csv'
const batchSize = 100000;

sequelize.sync({ force: true })
  .then(() => {
    console.log('MODELS CONNECTED');
    (async() => {
      await fs.mkdir('dataFiles');
      let workspaceLocations = ''
      let locationPointers = '';
      let batch = 0
      for(let i = 1; i <= lines; i++) {
        const {
          workspaceLocationsData,
          locationPointersData,
          rawQuery1,
          rawQuery2
        } = generatePgData(i);
        workspaceLocations += workspaceLocationsData;
        locationPointers += locationPointersData
        batch++;
        if(batch === batchSize) {
          try {
            await fs.writeFile(workspaceLocationsFile, workspaceLocations);
            await fs.writeFile(locationPointersFile, locationPointers);
            await sequelize.query(rawQuery1);
            await sequelize.query(rawQuery2);
          } catch(err) {
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
