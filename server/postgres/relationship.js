const { WorkspaceLocation, LocationPointer } = require('./models');

WorkspaceLocation.hasOne(LocationPointer, { foreignKey: 'workspaceLocation_id' });
LocationPointer.belongsTo(WorkspaceLocation, { foreignKey: 'workspaceLocation_id' });