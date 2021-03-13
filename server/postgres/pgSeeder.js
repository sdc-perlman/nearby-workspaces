const faker = require('faker');
const sequelize = require('./');
const { WorkspaceLocation, LocationPointer } = require('./models');
require('./relationship');

// try {

//   // Then, we do some calls passing this transaction as an option:

//   const user = await User.create({
//     firstName: 'Bart',
//     lastName: 'Simpson'
//   }, { transaction: t });

//   await user.addSibling({
//     firstName: 'Lisa',
//     lastName: 'Simpson'
//   }, { transaction: t });

//   // If the execution reaches this line, no errors were thrown.
//   // We commit the transaction.
//   await t.commit();

// } catch (error) {

//   // If the execution reaches this line, an error was thrown.
//   // We rollback the transaction.
//   await t.rollback();

// }

const saveSeed = async (data, transaction) => {
  const {uuid} = await WorkspaceLocation.bulkCreate({ ...data }, { transaction });
  await LocationPointer.bulkCreate({
    geo: {
      type: 'Point',
      coordinates: [
        Math.abs(faker.address.longitude()),
        faker.address.latitude(),
      ],
    },
    workspaceId: data.workspaceId,
    workspaceLocation_id: uuid,
  }, { transaction });
}

sequelize.sync({ force: true })
  .then(() => {
    console.log('MODELS SYNCED');
    (async () => {
      const transaction = await sequelize.transaction({ autocommit: false });
      let seeder = 1;
      for(let i = 0; i < 1000000; i++) {
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
        await transaction.rollback();
        process.exit();
      });
      seeder++;
    }
    if(seeder > 1000000) {
      console.log('seeded');
      await transaction.commit();
      process.exit();
    }
    })();
  })
  .catch((err) => {
    console.log(err, 'MODELS NOT SYNCED');
    process.exit();
  });



// process.exit();