const sequelize = require('.');

const keyQuery = `
ALTER TABLE ONLY public."LocationPointers"
    ADD CONSTRAINT LocationPointers_pkey PRIMARY KEY (uuid);

ALTER TABLE ONLY public."WorkspaceLocations"
    ADD CONSTRAINT WorkspaceLocations_pkey PRIMARY KEY (uuid);

ALTER TABLE ONLY public."WorkspaceLocations"
    ADD CONSTRAINT LocationPointers_fkey
    FOREIGN KEY ("locationPointerUuid")
    REFERENCES public."LocationPointers" (uuid)
    ON DELETE CASCADE;
`;

const indexQuery = `
CREATE INDEX "spatialIndex"
    ON public."LocationPointers"
    USING GIST (ll_to_earth(latitude, longitude));
`;

(async () => {
  try {
    await sequelize.query(keyQuery);
    // await sequelize.query(indexQuery);
    console.log('KEYS GENERATED');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();
