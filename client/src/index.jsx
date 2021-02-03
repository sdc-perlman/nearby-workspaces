import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { getWorkspaces } from './actions/'
import Title from './components/Title.jsx';
import WorkspaceContainer from './components/WorkspaceContainer.jsx';

const NearbyWorkspaces = () => {
  const [locs, setLocs] = useState(null);

  // get workspaces and set to state
  useEffect( async () => {
    let mnt = true;
    const locations = await getWorkspaces(window.location.pathname);
    if (mnt) {
      if (locations === false) {
        setLocs(false);
      } else {
        setLocs(locations);
      }      
    }
    return () => mnt = false;
  }, []);



  if (locs === false || locs === null) {
    return <></>
  }

  if (locs.length === 0) {
    return <></>
  }

  return (
    <>
      <Title />
      <WorkspaceContainer locations={ locs }/>
    </>
  );
};

ReactDOM.render(<NearbyWorkspaces />, document.getElementById('nearby'));