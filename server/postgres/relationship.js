const { WorkspaceLocation, LocationPointer } = require('./modelsMain');
const sequelize = require('.');

LocationPointer.hasOne(WorkspaceLocation, {
  foreignKey: 'locationPointerUuid',
});

WorkspaceLocation.belongsTo(LocationPointer, {
  foreignKey: 'locationPointerUuid',
});

sequelize.sync({ force: false })
  .then(() => {
    console.log('MODELS CONNECTED');
  })
  .catch((err) => {
    console.log(err, 'MODELS FAILED TO CONNECT');
  });
