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
CREATE INDEX geogIndex
    ON public."LocationPointers"
    USING GIST (geog);
`;

(async () => {
  try {
    await sequelize.query(keyQuery);
    await sequelize.query(indexQuery);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();
