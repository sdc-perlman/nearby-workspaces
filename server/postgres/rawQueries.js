const sequelize = require('./');

const keyQuery = `
ALTER TABLE ONLY public."LocationPointers"
    ADD CONSTRAINT LocationPointers_pkey PRIMARY KEY (uuid);

ALTER TABLE ONLY public."WorkspaceLocations"
    ADD CONSTRAINT WorkspaceLocations_pkey PRIMARY KEY (uuid);

ALTER TABLE ONLY public."WorkspaceLocations"
    ADD CONSTRAINT LocationPointers_fkey
    FOREIGN KEY ("locationPointer_id")
    REFERENCES public."LocationPointers" (uuid)
    ON DELETE CASCADE;
`;

const indexQuery = `
CREATE INDEX CONCURRENTLY workspaceLocationIndex
    ON public."WorkspaceLocations"
    USING HASH (workspaceId);

CREATE INDEX CONCURRENTLY locationPointerIndex
    ON public."LocationPointers"
    USING HASH (workspaceId);
`;




(async() => {
  try {
    await sequelize.query(keyQuery);
    await sequelize.query(indexQuery);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
})();