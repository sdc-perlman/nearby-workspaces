const { WorkspaceLocation, LocationPointer } = require('./models');

LocationPointer.hasOne(WorkspaceLocation, {
  foreignKey: 'locationPointerUuid',
});

WorkspaceLocation.belongsTo(LocationPointer, {
  foreignKey: 'locationPointerUuid',
});