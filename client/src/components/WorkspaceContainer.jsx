import React, { useState } from 'react';
import Workspace from './workspace/workspace.jsx';
import Title from './Title.jsx';
import { getWorkspaces } from '../actions';

export default ({ locations = null, details = null}) => {
  const [locs, setLocs] = useState(locations);
  if(locs === null) {
    getWorkspaces()
      .then(data => setLocs(data))
      .catch(() => setLocs(false));
  }

  if (locs === null || locs === false || locs.length === 0) {
    return <></>;
  }

  return (
    <>
      <Title />
      { locs
        .slice(0,6)
        .filter(loc => loc.workspaceId < 100)
        .map(location => <Workspace key={location.workspaceId} location={ location } details={ details || null }/>)}
    </>
  );
};