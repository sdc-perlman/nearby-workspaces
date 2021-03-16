const { LocationPointer, WorkspaceLocation } = require('./models');
const faker = require('faker');
require('./relationship');

const pointAll = async () => {
  // const [{dataValues}] = await LocationPointer.findAll();
  // const [{dataValues: dataValues2}] = await WorkspaceLocation.findAll();
  // console.log('data here', dataValues, dataValues2);
  const lat = Math.abs(faker.address.latitude(34, 41));
  const long = faker.address.longitude(-119, -82);
  console.log(lat, long);
}

pointAll().then(() => process.exit()).catch((err) => {
  console.log(err);
  process.exit();
});