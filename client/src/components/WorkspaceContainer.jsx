import React, { useState } from 'react';
import Workspace from './workspace/Workspace';
import Title from './Title';
import { getWorkspaces } from '../actions';

export default ({ locations = null, details = null }) => {
  const [locs, setLocs] = useState(locations);
  if (locs === null) {
    getWorkspaces()
      .then((data) => {
        console.log('DATA', data);
        setLocs(data);
      })
      .catch(() => setLocs(false));
  }

  if (locs === null || locs === false || locs.length === 0) {
    return <></>;
  }
  // console.log('DEETS', details);
  return (
    <>
      <Title />
      {locs
        .slice(0, 6)
        .filter((loc) => loc.workspaceId < 100)
        .map((location) => (
          <Workspace
            key={location.workspaceId}
            location={location}
            details={details}
          />
        ))}
    </>
  );
};
