import Workspace from './workspace/workspace.jsx';

export default ({ locations }) => {

  if (locations === null) {
    return <div></div>
  }
  return (
    <div>
      { locations.filter(loc => loc.workspaceId < 100).map(location => <Workspace location={ location } />)}
    </div>
  );
};