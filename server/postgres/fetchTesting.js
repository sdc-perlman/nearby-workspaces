const { LocationPointer, WorkspaceLocation } = require('./models');
require('./relationship');

const pointAll = async () => {
  const [{dataValues}] = await LocationPointer.findAll();
  const [{dataValues: dataValues2}] = await WorkspaceLocation.findAll();
  console.log('data here', dataValues, dataValues2);
  // const data1 = await LocationPointer.findAll();
  // const data2 = await WorkspaceLocation.findAll();
  // console.log('data here', data1, data2);
}

pointAll().then(() => process.exit()).catch((err) => {
  console.log(err);
  process.exit();
});