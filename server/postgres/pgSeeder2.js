const faker = require('faker');
const sequelize = require('./');
const { WorkspaceLocation, LocationPointer } = require('./models');
require('./relationship');
const uuid = require('uuid').v4;
const fs = require('fs').promises;


const saveSeed = async (data, transaction) => {
  const { uuid } = await WorkspaceLocation.create({ ...data }, { transaction });
  await LocationPointer.create({
    longitude: Math.abs(faker.address.longitude()),
    latitude: faker.address.latitude(),
    workspaceId: data.workspaceId,
    workspaceLocation_id: uuid,
  }, { transaction });
  if (data.workspaceId === 2) {
    await transaction.commit();
    console.log('seeded');
    process.exit();
  }
}

sequelize.sync({ force: true })
  .then(() => {
    console.log('MODELS CONNECTED');
    (async() => {
      let workspaceLocations = ''
      let locationPointers = '';
      fs.writeFile('./workspaceLocations.sql', workspaceLocations);
      fs.writeFile('./locationPointers.sql', locationPointers);
      for(let i = 1; i <= 10; i++) {
        const workspaceSlug = faker.lorem.slug();
        const streetNumber = faker.random.number(1000);
        const streetName = faker.address.streetName();
        const city = faker.address.city();
        const state = faker.address.stateAbbr();
        const zipCode = faker.address.zipCode().slice(0, 5);
        const neighborhood = `${faker.address.direction()} ${city}`;
        const rawAddress = `${streetNumber} ${streetName}, ${city}, ${state} ${zipCode}, USA`
        const workspaceLocationsUuid = uuid();
        workspaceLocations += `${workspaceLocationsUuid}|${workspaceSlug}|${i}|${rawAddress}|${rawAddress}|${streetName}|${streetNumber}|${neighborhood}|${city}|${state}|United States|US|${zipCode}\n`
        locationPointers += `${uuid()}|${i}|${Math.abs(faker.address.longitude())}|${faker.address.latitude()}|${workspaceLocationsUuid}\n`;
        try {
          await fs.appendFile('./workspaceLocations.sql', workspaceLocations);
          await fs.appendFile('./locationPointers.sql', locationPointers);
          workspaceLocations = '';
          locationPointers = '';

        } catch(err) {
          console.log('Error writing seed script file', err);
          process.exit();
        }
      }
      process.exit();


    })();
  })
  .catch((err) => {
    console.log(err, 'MODELS NOT SYNCED');
    process.exit();
  });



// process.exit();