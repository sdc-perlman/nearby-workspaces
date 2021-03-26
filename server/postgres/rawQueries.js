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

const indexQuery1 = `
CREATE INDEX CONCURRENTLY workspaceLocationIndex
    ON public."WorkspaceLocations"
    USING HASH ("workspaceId");
`;

const indexQuery2 = `
CREATE INDEX CONCURRENTLY locationPointerIndex
    ON public."LocationPointers"
    USING HASH ("workspaceId");
`;

(async () => {
  try {
    await sequelize.query(keyQuery);
    await sequelize.query(indexQuery1);
    await sequelize.query(indexQuery2);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();
