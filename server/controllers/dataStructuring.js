module.exports = (origin, locationPointers, nearbyWorkspaces) => {
  const { LocationPointer: { dataValues: originPointer } } = origin;
  const workspaces = nearbyWorkspaces.map((x) => x.dataValues);
  console.log(workspaces);
};
