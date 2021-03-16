const faker = require('faker');
const sequelize = require('./');
const { WorkspaceLocation, LocationPointer } = require('./models');
require('./relationship');


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
        try {
          const transaction = await sequelize.transaction({autocommit: false});
          let seeder = 1;
          for(let i = 0; i < 2; i++) {
          const streetNumber = faker.random.number(1000);
          const streetName = faker.address.streetName();
          const city = faker.address.city();
          const state = faker.address.stateAbbr();
          const zipCode = faker.address.zipCode().slice(0, 5);
          const neighborhood = `${faker.address.direction()} ${city}`;
          const rawAddress = `${streetNumber} ${streetName}, ${city}, ${state} ${zipCode}, USA`
          const dataFormat = {
            workspaceSlug: faker.lorem.slug(),
            workspaceId: seeder,
            rawAddress,
            formattedAddress: rawAddress,
            streetNumber,
            streetName,
            neighborhood,
            city,
            state,
            country: 'United States',
            countryCode: 'US',
            zipCode,
          };
          await saveSeed(dataFormat, transaction).catch(async(err) => {
            console.log(err);
            process.exit();
          });
          seeder++;
          }
        } catch(err) {
          console.log(err);
        }

    })();
  })
  .catch((err) => {
    console.log(err, 'MODELS NOT SYNCED');
    process.exit();
  });



// process.exit();