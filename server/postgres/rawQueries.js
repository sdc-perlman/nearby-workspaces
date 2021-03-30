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

// const keyQuery2 = `
// ALTER TABLE ONLY public."LocationPointers"
//     ADD CONSTRAINT LocationPointers_fkey
//     FOREIGN KEY ("locationPointerUuid")
//     REFERENCES public."LocationPointers" (uuid)
//     ON DELETE CASCADE;
// `;

// const indexQuery = `
// CREATE INDEX "geogIndex"
//     ON public."LocationPointers"
//     USING GIST (geog);
// `;

(async () => {
  try {
    await sequelize.query(keyQuery);
    console.log('KEYS GENERATED');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();
