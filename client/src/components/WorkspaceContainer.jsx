import React, { useState, useEffect } from 'react';
import Workspace from './workspace/Workspace';
import Title from './Title';
import { getWorkspaces } from '../actions';

export default () => {
  const [locs, setLocs] = useState(null);
  const [allIds, setAllIds] = useState([]);
  const [allInfo, setAllInfo] = useState([]);
  const [pic, setPic] = useState([]);

  useEffect(() => {
    getWorkspaces()
      .then(({ nearbyWorkspaces, allWorkspaceInfo, photos }) => {
        setLocs(nearbyWorkspaces);
        setAllInfo(allWorkspaceInfo);
        setPic(photos);
      })
      .catch(() => setLocs(false));
  }, []);

  if (locs === null || locs === false || locs.length === 0) {
    return <></>;
  }

  return (
    <>
      <Title />
      {locs
        .map((location) => (
          <Workspace
            key={location.workspaceId}
            location={location}
            allIds={allIds}
            allInfo={allInfo}
            details={null}
            pic={pic}
          />
        ))}
    </>
  );
};
