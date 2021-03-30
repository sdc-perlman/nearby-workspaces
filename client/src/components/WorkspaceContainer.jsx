import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Workspace from './workspace/Workspace';
import Title from './Title';

axios.defaults.timeout = 3000;
const nearbyAPI = '/api/nearbyworkspaces';

export default () => {
  const [locs, setLocs] = useState(null);
  const [allInfo, setAllInfo] = useState([]);
  const [pic, setPic] = useState([]);

  useEffect(async () => {
    console.log('howmany?')
    const splitUrl = window.location.pathname.split('/').filter((el) => el);
    const rawId = splitUrl[splitUrl.length - 1];

    try {
      if (Number.isNaN(rawId)) {
        throw new Error('no id');
      }
      const { data: { nearbyWorkspaces, allWorkspaceInfo, photos } } = await axios.get(`${nearbyAPI}/buildings/${rawId}`);
      setLocs(nearbyWorkspaces);
      setAllInfo(allWorkspaceInfo);
      setPic(photos);
    } catch (err) {
      console.log(err);
      setLocs(false);
    }
  }, []);

  if (locs === null || locs === false || locs.length === 0) {
    console.log('dawg?');
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
            allInfo={allInfo}
            pic={pic}
          />
        ))}
    </>
  );
};
