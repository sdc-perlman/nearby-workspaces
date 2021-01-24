const { useState, useEffect } = React;
import './index.css';
import { getWorkspaces } from './actions/'
import Title from './components/Title.jsx';
import WorkspaceContainer from './components/WorkspaceContainer.jsx';

const App = () => {
  const [locs, setLocs] = useState(null);

  // get workspaces and set to state
  useEffect( async () => {
    let mnt = true;
    const locations = await getWorkspaces();
    if (mnt) {
      if (locations === false) {
        console.log('error');
      } else {
        setLocs(locations);
      }      
    }
    return () => mnt = false;
  }, []);

  return (
    <div className="">
      <Title />
      <WorkspaceContainer locations={ locs }/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));