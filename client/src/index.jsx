import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WorkspaceContainer from './components/WorkspaceContainer';

const NearbyWorkspaces = () => (
  <>
    <WorkspaceContainer />
  </>
);

ReactDOM.render(<NearbyWorkspaces />, document.getElementById('nearby'));
