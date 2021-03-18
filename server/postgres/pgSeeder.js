const faker = require('faker');
const sequelize = require('./');
require('./relationship');
const path = require('path');
const uuid = require('uuid').v4;
const fs = require('fs').promises;
const argv = require('yargs').argv;
const lines = argv.lines || 10;
const workspaceLocationsPath = './workspaceLocations.sql';
const locationPointersPath = './locationPointers.sql'
const batchSize = 10;

sequelize.sync({ force: true })
  .then(() => {
    console.log('MODELS CONNECTED');
    (async() => {
      let workspaceLocations = ''
      let locationPointers = '';
      let batch = 0
      fs.writeFile(workspaceLocationsPath, workspaceLocations);
      fs.writeFile(locationPointersPath, locationPointers);
      for(let i = 1; i <= lines; i++) {
        const streetNumber = faker.random.number(1000);
        const streetName = faker.address.streetName();
        const city = faker.address.city();
        const state = faker.address.stateAbbr();
        const zipCode = faker.address.zipCode().slice(0, 5);
        const neighborhood = `${faker.address.direction()} ${city}`;
        const rawAddress = `${streetNumber} ${streetName}, ${city}, ${state} ${zipCode}, USA`
        const workspaceLocationsUuid = uuid();
        workspaceLocations += `${workspaceLocationsUuid}|${faker.lorem.slug()}|${i}|${rawAddress}|${rawAddress}|${streetName}|${streetNumber}|${neighborhood}|${city}|${state}|United States|US|${zipCode}\n`
        locationPointers += `${uuid()}|${i}|${faker.address.longitude(-117, -82)}|${faker.address.latitude(33, 41)}|${workspaceLocationsUuid}\n`;
        batch++;
        if(batch === batchSize) {
          try {
            await fs.appendFile(workspaceLocationsPath, workspaceLocations);
            await fs.appendFile(locationPointersPath, locationPointers);
            await sequelize.query(`COPY public."WorkspaceLocations" ("uuid","workspaceSlug","workspaceId","rawAddress","formattedAddress","streetName","streetNumber","neighborhood","city","state","country","countryCode","zipCode") FROM '${path.join(__dirname, 'workspaceLocations.sql')}' WITH DELIMITER AS '|';`);
            await sequelize.query(`COPY public."LocationPointers" ("uuid","workspaceId","longitude","latitude","workspaceLocation_id") FROM '${path.join(__dirname, 'locationPointers.sql')}' WITH DELIMITER AS '|';`);
            await
          } catch(err) {
            console.log('Error writing seed script file', err);
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
