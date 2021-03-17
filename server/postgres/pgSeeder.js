const faker = require('faker');
const sequelize = require('./');
require('./relationship');
const uuid = require('uuid').v4;
const fs = require('fs').promises;
const argv = require('yargs').argv;
const lines = argv.lines || 100;


sequelize.sync({ force: true })
  .then(() => {
    console.log('MODELS CONNECTED');
    (async() => {
      let workspaceLocations = ''
      let locationPointers = '';
      let previousFileIndex = 1;
      let currentFileIndex = 1;
      fs.writeFile(`./dataFiles/workspaceLocations${currentFileIndex}.sql`, workspaceLocations);
      fs.writeFile(`./dataFiles/locationPointers${currentFileIndex}.sql`, locationPointers);
      for(let i = 1; i <= lines; i++) {
        if(currentFileIndex > previousFileIndex) {
          fs.writeFile(`./dataFiles/workspaceLocations${currentFileIndex}.sql`, workspaceLocations);
          fs.writeFile(`./dataFiles/locationPointers${currentFileIndex}.sql`, locationPointers);
          previousFileIndex = currentFileIndex;
        }
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
        try {
          await fs.appendFile(`./dataFiles/workspaceLocations${currentFileIndex}.sql`, workspaceLocations);
          await fs.appendFile(`./dataFiles/locationPointers${currentFileIndex}.sql`, locationPointers);
          workspaceLocations = '';
          locationPointers = '';

        } catch(err) {
          console.log('Error writing seed script file', err);
          process.exit();
        }
        //create a new file for every million
        if(i.toString().slice(-6) === '000000') {
          currentFileIndex++;
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
