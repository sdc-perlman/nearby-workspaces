const { LocationPointer, WorkspaceLocation } = require('./models');
const faker = require('faker');
require('./relationship');

const pointAll = async () => {
  const [{dataValues}] = await LocationPointer.findAll();
  const [{dataValues: dataValues2}] = await WorkspaceLocation.findAll();
  console.log('data here', dataValues, dataValues2);
  // console.log(faker.address.streetName());
}

pointAll().then(() => process.exit()).catch((err) => {
  console.log(err);
  process.exit();
});