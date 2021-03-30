const sequelize = require('.');

const dropKeys = `
ALTER TABLE ONLY public."WorkspaceLocations"
    DROP CONSTRAINT LocationPointers_fkey;

ALTER TABLE ONLY public."LocationPointers"
    DROP CONSTRAINT LocationPointers_pkey;

ALTER TABLE ONLY public."WorkspaceLocations"
    DROP CONSTRAINT WorkspaceLocations_pkey;
`;

const dropIndex1 = 'DROP INDEX "locationPointerIndex"';
const dropIndex2 = 'DROP INDEX "workspaceLocationIndex"';
const dropIndex3 = 'DROP INDEX "geogIndex"';

(async () => {
  try {
    await sequelize.query(dropKeys);
    await sequelize.query(dropIndex1);
    await sequelize.query(dropIndex2);
    await sequelize.query(dropIndex3);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();
