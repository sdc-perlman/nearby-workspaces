const faker = require('faker');
const sequelize = require('./');
const { WorkspaceLocation, LocationPointer } = require('./models');
require('./relationship');

const saveSeed = async (data) => {
  const {uuid} = await WorkspaceLocation.create({ ...data });
  await LocationPointer.create({
    geo: {
      type: 'Point',
      coordinates: [
        Math.abs(faker.address.longitude()),
        faker.address.latitude(),
      ],
    },
    workspaceId: data.workspaceId,
    workspaceLocation_id: uuid,
  });
}

sequelize.sync({ force: true })
  .then(() => {
    console.log('MODELS SYNCED');
    (async () => {
      let seeder = 1;
      for(let i = 0; i < 2; i++) {
      const dataFormat = {
        workspaceSlug: faker.commerce.productAdjective(),
        workspaceId: seeder,
        rawAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode().slice(0, 5)}, USA`,
      };
      await saveSeed(dataFormat).catch((err) => {
        console.log(err)
        process.exit();
      });
      seeder++;
    }
    if(seeder === 3) {
      console.log('seeded');
      process.exit();
    }
    })();
  })
  .catch((err) => {
    console.log(err, 'MODELS NOT SYNCED');
    process.exit();
  });



// process.exit();