const sequelize = require('./');
const { WorkspaceLocation, LocationPointer } = require('./models');
require('./relationship');

sequelize.sync({ force: true })
  .then(() => console.log('Models Synced'))
  .catch((err) => console.log('Models Not Synced', err));