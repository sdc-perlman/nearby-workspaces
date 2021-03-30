const argv = require('yargs').argv;
const { WorkspaceLocation, LocationPointer } = require('./modelsMain');
const sequelize = require('.');

const init = argv.init;

LocationPointer.hasOne(WorkspaceLocation, {
  foreignKey: 'locationPointerUuid',
});

WorkspaceLocation.belongsTo(LocationPointer, {
  foreignKey: 'locationPointerUuid',
});

sequelize.sync({ force: false })
  .then(() => {
    if (init) {
      console.log('Database Indexed');
      process.exit();
    }
    console.log('MODELS CONNECTED');
  })
  .catch((err) => {
    console.log(err, 'MODELS FAILED TO CONNECT');
  });
