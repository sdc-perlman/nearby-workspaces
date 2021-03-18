const sequelize = require('./');
require('./relationship');
const generatePgData = require('./generatePgData');
const fs = require('fs').promises;
const argv = require('yargs').argv;

const lines = argv.lines || 1000000;
const workspaceLocationsPath = './workspaceLocations.sql';
const locationPointersPath = './locationPointers.sql'
const batchSize = 100000;

sequelize.sync({ force: true })
  .then(() => {
    console.log('MODELS CONNECTED');
    (async() => {
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
            await fs.writeFile(workspaceLocationsPath, workspaceLocations);
            await fs.writeFile(locationPointersPath, locationPointers);
            await sequelize.query(rawQuery1);
            await sequelize.query(rawQuery2);
            await fs.unlink(workspaceLocationsPath);
            await fs.unlink(locationPointersPath);
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
