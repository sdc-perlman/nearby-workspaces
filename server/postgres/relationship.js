const { WorkspaceLocation, LocationPointer } = require('./models');

WorkspaceLocation.hasOne(LocationPointer, {
  foreignKey: 'workspaceLocation_id',
  constraints: false,
});

LocationPointer.belongsTo(WorkspaceLocation, {
  foreignKey: 'workspaceLocation_id',
  constraints: false,
});