const { useEffect, useState } = React;
import LoadingWorkspace from './LoadingWorkspace.jsx';
import { getWorkspaceInfo } from '../../actions/';

export default ({ location: { workspaceId, neighborhood } } ) => {
  const [space, setSpace] = useState(null);

  useEffect(async () => {
    let mnt = true;
    if (mnt) {
      const info = await getWorkspaceInfo(workspaceId);
      setSpace(info);
    }
    return () => mnt = false;
  },[]);

  if (space === null) {
    return (
      <LoadingWorkspace />
    )
  }
  const { amenities: { amenities }, photo: { photo }, description } = space;

  if (!amenities || !photo || !description ) return <div></div>

  else {
    return (
      <div className="nb-container">
        <a href={`http://localhost:5001/buildings/${workspaceId}`} className="light-text">
          <div className="nb-grid">
            <div className="nb-photo-container" style={{background: `url(${photo})`}}>
            </div>
            <div className="nb-description-container">
              <div>
                <h3 className="nb-description-title ">{ description.name }</h3>
                <p className="light-text bold-text">{ neighborhood }</p>
              </div>
              <div className="light-text small-text bold-text">
                <ul className="nb-amenities-list">
                  <li>{ amenities[0] }{' '}</li>
                  { amenities.slice(1).map(am => (
                  <li key={`${description.name}-${am}`}>&#8226; { am } </li> )
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="nb-pricing-container dark-text">
            <div className="nb-pricing-label bold-text pad-10">
              <p>Available workspace</p>
            </div>
            <div className="nb-pricing-price pad-10">
              { description.price ? (
                  <p>from <span className="bolder-text">${ description.price }/mo</span></p>
                ) : <p>View Inventory</p>
              }
            </div>
          </div>
        </a>
      </div>
    );
  }
}

  